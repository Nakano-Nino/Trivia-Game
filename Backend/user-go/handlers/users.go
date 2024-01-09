package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
	usersdto "github.com/Nakano-Nino/Trivia-Game/dto/users"
	"github.com/Nakano-Nino/Trivia-Game/models"
	jwtToken "github.com/Nakano-Nino/Trivia-Game/pkg/jwt"
	"github.com/Nakano-Nino/Trivia-Game/repositories"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v5"
)

const aud = "499994503524-88e2rd415lra144ho7hb6ibsao3rpqro.apps.googleusercontent.com"

type handler struct {
	UserRepository repositories.UserRepository
}

func Handleuser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	email := r.FormValue("email")

	user, err := h.UserRepository.GetUser(email)
	if err != nil {
		w.WriteHeader(http.StatusOK)
		response := dto.ErrorResult{Code: http.StatusNotFound, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["name"] = user.Name
	claims["email"] = user.Email
	claims["avatar"] = user.Avatar

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	fmt.Println(token)

	Resp := usersdto.Resp{
		Name:   user.Name,
		Avatar: user.Avatar,
		Role:   user.Role,
		Token:  token,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: Resp}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(usersdto.CreateUserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := models.User{
		Name:   request.Name,
		Email:  request.Email,
		Avatar: request.Avatar,
		Role:   "user",
	}

	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	claims := jwt.MapClaims{}
	claims["id"] = data.ID
	claims["name"] = data.Name
	claims["email"] = data.Email
	claims["avatar"] = data.Avatar

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	Resp := usersdto.Resp{
		Name:   data.Name,
		Avatar: data.Avatar,
		Role:   data.Role,
		Token:  token,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: Resp}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var name = r.FormValue("name")
	var avatar = r.FormValue("avatar")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	email := userInfo["email"].(string)

	user, err := h.UserRepository.GetUser(email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if name != "" {
		user.Name = name
	}

	user.Avatar = avatar

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo["name"] = data.Name
	userInfo["avatar"] = data.Avatar

	token, errGenerateToken := jwtToken.GenerateToken(&userInfo)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	Resp := usersdto.Resp{
		Name:   data.Name,
		Avatar: data.Avatar,
		Role:   data.Role,
		Token:  token,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: Resp}
	json.NewEncoder(w).Encode(response)
	return
}

func ConvertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:     u.ID,
		Name:   u.Name,
		Email:  u.Email,
		Avatar: u.Avatar,
		Role:   u.Role,
	}
}

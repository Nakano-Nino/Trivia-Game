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
	claims["avatar"] = user.Avatar

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

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

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: ConvertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(usersdto.UpdateUserRequest)
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

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	email := userInfo["email"].(string) 

	user, err := h.UserRepository.GetUser(email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	avatar := "https://res.cloudinary.com/dsbrglrly/image/upload/f_auto,q_auto/v1/User%20Avatar/"+request.Avatar

	if request.Name != "" {
		user.Name = request.Name
	}

	user.Avatar = avatar

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: ConvertResponse(data)}
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

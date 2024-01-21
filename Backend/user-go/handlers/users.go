package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	midtransdto "github.com/Nakano-Nino/Trivia-Game/dto/midtrans"
	dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
	usersdto "github.com/Nakano-Nino/Trivia-Game/dto/users"
	"github.com/Nakano-Nino/Trivia-Game/models"
	jwtToken "github.com/Nakano-Nino/Trivia-Game/pkg/jwt"
	"github.com/Nakano-Nino/Trivia-Game/repositories/users"
	fp "github.com/amonsat/fullname_parser"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v5"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type handler struct {
	UserRepository users.UserRepository
}

func Handleuser(UserRepository users.UserRepository) *handler {
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

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: ConvertResponse(user)}
	json.NewEncoder(w).Encode(response)
}

func (h *handler) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(usersdto.GetUserRequest)
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

	user, err := h.UserRepository.Login(request.Email)
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
	claims["diamond"] = user.Diamond

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

func (h *handler) SignUp(w http.ResponseWriter, r *http.Request) {
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
		Diamond: 0,
		Role:   "user",
	}

	data, err := h.UserRepository.SignUp(user)
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
	claims["diamond"] = data.Diamond

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

	// request := new(usersdto.UpdateUserRequest)
	// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// validation := validator.New()
	// err := validation.Struct(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

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

	if avatar != "" {
		user.Avatar = avatar
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo["name"] = data.Name
	userInfo["avatar"] = data.Avatar
	userInfo["diamond"] = data.Diamond

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
}

func (h *handler) BuyDiamond(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var s snap.Client
	s.New(midtrans.ServerKey, midtrans.Sandbox)

	input := new(midtransdto.MidtransRequest)

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(input)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := userInfo["id"].(string)
	uName := userInfo["name"].(string)	
	email := userInfo["email"].(string)	

	parsedName := fp.ParseFullname(uName)
	firstName := parsedName.First
	lastName := parsedName.Last

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  userId + "-" + time.Now().Format("060102150405"),
			GrossAmt: input.Amount,
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: firstName,
			LName: lastName,
			Email: email,
		},
		EnabledPayments: snap.AllSnapPaymentType,
	}

	resp, _ := s.CreateTransaction(req)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	midtransResponse := midtransdto.MidtransResponse{
		Token: resp.Token,
		Url:   resp.RedirectURL,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: midtransResponse}
	json.NewEncoder(w).Encode(response)
}

func ConvertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:     u.ID,
		Name:   u.Name,
		Email:  u.Email,
		Avatar: u.Avatar,
		PurchasedAvatars: u.PurchasedAvatars,
		Diamond: u.Diamond,
		Role:   u.Role,
	}
}

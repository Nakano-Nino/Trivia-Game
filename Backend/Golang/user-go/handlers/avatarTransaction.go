package handlers

import (
	"encoding/json"
	"net/http"

	dto "golang-trivia/user-go/dto/result"
	"golang-trivia/user-go/models"
	"golang-trivia/user-go/repositories/avatar"
	"golang-trivia/user-go/repositories/users"
	"github.com/golang-jwt/jwt/v5"
	// "github.com/google/uuid"
)

type avatarHandler struct {
	AvatarRepository avatar.AvatarTransactionRepository
}

type userHandler struct {
	UserRepository users.UserRepository
}

func HandlerAvatar(AvatarRepository avatar.AvatarTransactionRepository) *avatarHandler {
	return &avatarHandler{AvatarRepository}
}

func HandlerUser(UserRepository users.UserRepository) *userHandler {
	return &userHandler{UserRepository}
}

func (h *avatarHandler) FindAvatars(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	avatars, err := h.AvatarRepository.FindAvatars()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: avatars}
	json.NewEncoder(w).Encode(response)
}

func (h *avatarHandler) BuyAvatar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	name := r.FormValue("name")

	// uuid, err := uuid.Parse(id)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	avatar, err := h.AvatarRepository.GetAvatar(name)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	email := userInfo["email"].(string)
	
	user, err := h.AvatarRepository.GetUser(email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for _, v := range user.PurchasedAvatars {
		if v.ID == avatar.ID {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Already purchased"}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	if user.Diamond < avatar.Price {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Not enough diamond"}
		json.NewEncoder(w).Encode(response)
		return
	}

	user.Diamond -= avatar.Price

	user.PurchasedAvatars = append(user.PurchasedAvatars, models.Avatar{
		ID: avatar.ID,
		Name: avatar.Name,
		SecureUrl: avatar.SecureUrl,
	})

	data, err :=h.AvatarRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
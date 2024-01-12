package handlers

import (
	"encoding/json"
	"net/http"

	dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
	"github.com/Nakano-Nino/Trivia-Game/models"
	"github.com/Nakano-Nino/Trivia-Game/repositories/avatar"
	"github.com/Nakano-Nino/Trivia-Game/repositories/users"
	"github.com/golang-jwt/jwt/v5"
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

func (h *avatarHandler) BuyAvatar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	avatarName := r.FormValue("avatarName")

	avatar, err := h.AvatarRepository.GetAvatar(avatarName)
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

	for _, purchasedAvatar := range user.PurchasedAvatars {
		if purchasedAvatar.ID == avatar.ID {
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
package usersdto

import (
	"github.com/Nakano-Nino/Trivia-Game/models"
	"github.com/google/uuid"
)

type UserResponse struct {
	ID               uuid.UUID       `json:"id"`
	Name             string          `json:"name" form:"name" validate:"required"`
	Email            string          `json:"email" form:"email" validate:"required"`
	Avatar           string          `json:"avatar" form:"avatar"`
	PurchasedAvatars []models.Avatar `json:"purchasedavatars"`
	Diamond          int             `json:"diamond" form:"diamond"`
	Role             string          `json:"role" form:"role"`
}

type Resp struct {
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
	Role   string `json:"role"`
	Token  string `json:"token"`
}

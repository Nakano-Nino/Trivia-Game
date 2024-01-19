package routes

import (
	"github.com/Nakano-Nino/Trivia-Game/handlers"
	"github.com/Nakano-Nino/Trivia-Game/pkg/postgres"
	"github.com/Nakano-Nino/Trivia-Game/repositories/avatar"
	"github.com/Nakano-Nino/Trivia-Game/pkg/middleware"

	"github.com/gorilla/mux"
)

func AvatarRoutes(r *mux.Router) {
	avatarRepository := avatar.RepositoryAvatarTransaction(postgres.DB)
	h := handlers.HandlerAvatar(avatarRepository)

	r.HandleFunc("/get-avatars", h.FindAvatars).Methods("GET")
	r.HandleFunc("/buy-avatar", middleware.Auth(h.BuyAvatar)).Methods("POST")
}
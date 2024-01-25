package routes

import (
	"golang-trivia/user-go/handlers"
	"golang-trivia/user-go/pkg/postgres"
	"golang-trivia/user-go/repositories/avatar"
	"golang-trivia/user-go/pkg/middleware"

	"github.com/gorilla/mux"
)

func AvatarRoutes(r *mux.Router) {
	avatarRepository := avatar.RepositoryAvatarTransaction(postgres.DB)
	h := handlers.HandlerAvatar(avatarRepository)

	r.HandleFunc("/get-avatars", h.FindAvatars).Methods("GET")
	r.HandleFunc("/buy-avatar", middleware.Auth(h.BuyAvatar)).Methods("POST")
}
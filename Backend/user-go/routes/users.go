package routes

import (
	"github.com/Nakano-Nino/Trivia-Game/handlers"
	"github.com/Nakano-Nino/Trivia-Game/pkg/postgres"
	"github.com/Nakano-Nino/Trivia-Game/repositories/users"
	"github.com/Nakano-Nino/Trivia-Game/pkg/middleware"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := users.RepositoryUsers(postgres.DB)
	h := handlers.Handleuser(userRepository)

	r.HandleFunc("/get-user", h.GetUser).Methods("GET")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/signup", h.SignUp).Methods("POST")
	r.HandleFunc("/update-user", middleware.Auth(middleware.UploadFile(h.UpdateUser))).Methods("PATCH")
	r.HandleFunc("/buy-diamond", middleware.Auth(h.BuyDiamond)).Methods("POST")
}
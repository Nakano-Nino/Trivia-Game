package routes

import (
	"golang-trivia/user-go/handlers"
	"golang-trivia/user-go/pkg/postgres"
	"golang-trivia/user-go/repositories/users"
	"golang-trivia/user-go/pkg/middleware"

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
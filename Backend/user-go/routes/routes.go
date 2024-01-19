package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	AvatarRoutes(r)
	TransactionRoutes(r)
	QuestionRoutes(r)
}
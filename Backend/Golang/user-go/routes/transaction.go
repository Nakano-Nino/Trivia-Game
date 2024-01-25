package routes

import (
	"golang-trivia/user-go/handlers"
	"golang-trivia/user-go/pkg/postgres"
	"golang-trivia/user-go/repositories/transaction"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := transaction.RepositoryTransaction(postgres.DB)
	h := handlers.HandleTransaction(transactionRepository)

	r.HandleFunc("/get-diamonds", h.FindDiamonds).Methods("GET")
	r.HandleFunc("/create-transaction", h.Notification).Methods("POST")
}
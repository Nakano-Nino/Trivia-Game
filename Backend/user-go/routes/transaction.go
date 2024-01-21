package routes

import (
	"github.com/Nakano-Nino/Trivia-Game/handlers"
	"github.com/Nakano-Nino/Trivia-Game/pkg/postgres"
	"github.com/Nakano-Nino/Trivia-Game/repositories/transaction"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := transaction.RepositoryTransaction(postgres.DB)
	h := handlers.HandleTransaction(transactionRepository)

	r.HandleFunc("/get-diamonds", h.FindDiamonds).Methods("GET")
	r.HandleFunc("/create-transaction", h.Notification).Methods("POST")
}
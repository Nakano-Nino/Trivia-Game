package routes

import (
    "github.com/Nakano-Nino/Trivia-Game/handlers"
    "github.com/Nakano-Nino/Trivia-Game/pkg/postgres"
	"github.com/Nakano-Nino/Trivia-Game/repositories/question"

    "github.com/gorilla/mux"
)

func QuestionRoutes(r *mux.Router) {
    questionRepository := question.RepositoryQuestion(postgres.DB)
    h := handlers.HandleQuestion(questionRepository)

    r.HandleFunc("/get-questions", h.FindQuestions).Methods("GET")
}
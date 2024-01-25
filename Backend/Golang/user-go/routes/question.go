package routes

import (
    "golang-trivia/user-go/handlers"
    "golang-trivia/user-go/pkg/postgres"
	"golang-trivia/user-go/repositories/question"

    "github.com/gorilla/mux"
)

func QuestionRoutes(r *mux.Router) {
    questionRepository := question.RepositoryQuestion(postgres.DB)
    h := handlers.HandleQuestion(questionRepository)

    r.HandleFunc("/get-questions", h.FindQuestions).Methods("GET")
}
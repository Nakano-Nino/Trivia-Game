package handlers

import (
    "encoding/json"
    "net/http"

    dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
    "github.com/Nakano-Nino/Trivia-Game/repositories/question"
)

type questionHandler struct {
    QuestionRepository question.QuestionRepository
}

func HandleQuestion(QuestionRepository question.QuestionRepository) *questionHandler {
    return &questionHandler{QuestionRepository}
}

func (h *questionHandler) FindQuestions(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    questions, err := h.QuestionRepository.FindQuestions()

    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
        json.NewEncoder(w).Encode(response)
        return
    }

    w.WriteHeader(http.StatusOK)
    response := dto.SuccessResult{Code: http.StatusOK, Data: questions}
    json.NewEncoder(w).Encode(response)
}


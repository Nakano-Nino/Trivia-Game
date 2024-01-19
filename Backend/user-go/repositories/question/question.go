package question

import (
    "github.com/Nakano-Nino/Trivia-Game/models"
    
    "gorm.io/gorm"
)

type QuestionRepository interface {
    FindQuestions() ([]models.Question, error)
}

type repository struct {
    db *gorm.DB
}

func RepositoryQuestion(db *gorm.DB) *repository {
    return &repository{db}
}

func (r *repository) FindQuestions() ([]models.Question, error) {
    var questions []models.Question
    err := r.db.Find(&questions).Error
    
    return questions, err
}

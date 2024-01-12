package repositories

import (
	"log"
	"github.com/Nakano-Nino/Trivia-Game/models"
	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
}

type transactionRepository struct {
	db *gorm.DB
}

func RepositoryTransaction(db *gorm.DB) *transactionRepository {
	return &transactionRepository{db}
}

func (r *transactionRepository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {

	err := r.db.Create(&transaction).Error
	if err != nil {
		log.Fatal("failed to create transaction: ", err)
	}
	return transaction, err
}


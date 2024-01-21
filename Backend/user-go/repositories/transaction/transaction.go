package transaction

import (
	"log"

	"github.com/Nakano-Nino/Trivia-Game/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TransactionRepository interface {
	GetTransaction(OrderID string) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetUser(ID uuid.UUID) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	FindDiamonds() ([]models.Diamond, error)
	GetDiamonds(price int) (models.Diamond, error)
}

type transactionRepository struct {
	db *gorm.DB
}

func RepositoryTransaction(db *gorm.DB) *transactionRepository {
	return &transactionRepository{db}
}

func (r *transactionRepository) GetTransaction(OrderID string) (models.Transaction, error) {
	var orderId models.Transaction
	err := r.db.First(&orderId, "id = ?", OrderID).Error

	return orderId, err
}

func (r *transactionRepository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error
	if err != nil {
		log.Fatal("failed to create transaction: ", err)
	}
	return transaction, err
}

func (r *transactionRepository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Debug().Save(&transaction).Error
	if err != nil {
		log.Fatal("failed to create transaction: ", err)
	}
	return transaction, err
}

func (r *transactionRepository) GetUser(ID uuid.UUID) (models.User, error) {
	var user models.User
	err := r.db.Preload("PurchasedAvatars").First(&user, "id = ?", ID).Error

	return user, err
}

func (r *transactionRepository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Debug().Save(&user).Error
	
	return user, err
}

func (r *transactionRepository) FindDiamonds() ([]models.Diamond, error) {
	var diamonds []models.Diamond
	err := r.db.Find(&diamonds).Error

	return diamonds, err
}

func (r *transactionRepository) GetDiamonds(price int) (models.Diamond, error) {
	var diamonds models.Diamond
	err := r.db.First(&diamonds, "price = ?", price).Error

	return diamonds, err
}
package avatar

import (
	"golang-trivia/user-go/repositories/users"
	"golang-trivia/user-go/models"
	// "github.com/google/uuid"
	"gorm.io/gorm"
)

type AvatarTransactionRepository interface {
	FindAvatars() ([]models.Avatar, error)
	GetAvatar(name string) (models.Avatar, error)
	GetUser(Email string) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

type avatarTransactionRepository struct {
	db *gorm.DB
}

type usersRepository struct {
	userRepository *users.UserRepository
}

func RepositoryAvatarTransaction(db *gorm.DB) *avatarTransactionRepository {
	return &avatarTransactionRepository{db}
}

func RepositoryUser(userRepository *users.UserRepository) *usersRepository {
	return &usersRepository{userRepository}
}

func (r *avatarTransactionRepository) GetAvatar(name string) (models.Avatar, error) {
	var avatar models.Avatar
	err := r.db.Preload("PurchasedBy").First(&avatar, "name = ?", name).Error

	return avatar, err
}

func (r *avatarTransactionRepository) FindAvatars() ([]models.Avatar, error) {
	var avatars []models.Avatar
	err := r.db.Preload("PurchasedBy").Find(&avatars).Error

	return avatars, err
}

func (r *avatarTransactionRepository) GetUser(Email string) (models.User, error) {
	var user models.User
	err := r.db.Preload("PurchasedAvatars").First(&user, "email = ?", Email).Error

	return user, err
}

func (r *avatarTransactionRepository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Debug().Save(&user).Error

	return user, err
}


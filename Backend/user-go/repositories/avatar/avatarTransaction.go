package avatar

import (
	"github.com/Nakano-Nino/Trivia-Game/repositories/users"
	"github.com/Nakano-Nino/Trivia-Game/models"
	"gorm.io/gorm"
)

type AvatarTransactionRepository interface {
	GetAvatar(Name string) (models.Avatar, error)
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

func (r *avatarTransactionRepository) GetAvatar(Name string) (models.Avatar, error) {
	var avatar models.Avatar
	err := r.db.First(&avatar, "name = ?", Name).Error

	return avatar, err
}

func (r *avatarTransactionRepository) GetUser(Email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email = ?", Email).Error

	return user, err
}

func (r *avatarTransactionRepository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Debug().Save(&user).Error

	return user, err
}


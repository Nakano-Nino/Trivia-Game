package users

import (
	"log"

	"golang-trivia/user-go/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetUser(Email string) (models.User, error)
	Login(Email string) (models.User, error)
	SignUp(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

type repository struct {
	db *gorm.DB
}

func RepositoryUsers(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetUser(Email string) (models.User, error) {
	var user models.User
	err := r.db.Preload("PurchasedAvatars").First(&user, "email = ?", Email).Error

	return user, err
}

func (r *repository) Login(Email string) (models.User, error) {
	var user models.User
	err := r.db.Preload("PurchasedAvatars").First(&user, "email = ?", Email).Error

	return user, err
}

func (r *repository) SignUp(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error
	if err != nil {
		log.Fatal("failed to create user: ", err)
	}
	return user, err
}

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Debug().Save(&user).Error

	return user, err
}

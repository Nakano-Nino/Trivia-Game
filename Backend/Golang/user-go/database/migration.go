package database

import (
	"golang-trivia/user-go/models"
	"golang-trivia/user-go/pkg/postgres"
	"fmt"
)

func RunMigration() {
	err := postgres.DB.AutoMigrate(&models.User{}, &models.Avatar{}, &models.Transaction{}, &models.Question{}, &models.Diamond{})

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
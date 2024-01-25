package config

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {
	var err error

	var DB_HOST = "john.db.elephantsql.com"
	var DB_USER = "devahghe"
	var DB_PASSWORD = "rW0QbYZx9Zz_-diyba5DE3z_NUhL6dND"
	var DB_NAME = "devahghe"
	var DB_PORT = "5432"

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Connection Opened to Database")
}
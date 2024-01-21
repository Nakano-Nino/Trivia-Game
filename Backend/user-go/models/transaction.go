package models

import (
	"time"
)

type Transaction struct {
	ID        string `json:"id" gorm:"type: varchar(255)"`
	Amount    int `json:"amount" gorm:"type: int"`
	Status    string `json:"status" gorm:"type: varchar(255)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

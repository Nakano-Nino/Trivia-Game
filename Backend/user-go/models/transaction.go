package models

import (
	"time"
	"github.com/google/uuid"
)

type Transaction struct {
	ID          uuid.UUID `gorm:"type:uuid;default:gen_random_uuid()"`
	UserId		int `json:"user_id" gorm:"type: int"`
	Amount      int       `json:"amount" gorm:"type: int"`
	Status      string    `json:"status" gorm:"type: varchar(255)"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
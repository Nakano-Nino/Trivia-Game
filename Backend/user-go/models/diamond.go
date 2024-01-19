package models

import (
	"time"

	"github.com/google/uuid"
)

type Diamond struct {
	ID        uuid.UUID `json:"id" gorm:"type: varchar(255)"`
	Image     string    `json:"image" gorm:"type: varchar(255)"`
	Amount    int       `json:"amount" gorm:"type: int"`
	Price     int       `json:"price" gorm:"type: int"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

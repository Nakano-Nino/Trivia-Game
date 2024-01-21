package models

import (
	"github.com/google/uuid"
	"time"
)

type Question struct {
	ID             uuid.UUID `json:"id" gorm:"type: varchar(255)"`
	Image_question string    `json:"image_question" gorm:"type: varchar(255)"`
	A              string    `json:"A" gorm:"type: varchar(255)"`
	B              string    `json:"B" gorm:"type: varchar(255)"`
	C              string    `json:"C" gorm:"type: varchar(255)"`
	D              string    `json:"D" gorm:"type: varchar(255)"`
	Answer         string    `json:"answer" gorm:"type: varchar(255)"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

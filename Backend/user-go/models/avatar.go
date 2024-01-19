package models

import (
	"github.com/google/uuid"
	"time"
)

type Avatar struct {
	ID          uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid()"`
	Name        string    `json:"name" gorm:"type: varchar(255)"`
	SecureUrl   string    `json:"secureurl" gorm:"type: varchar(255)"`
	Price       int       `json:"price" gorm:"type: int"`
	PurchasedBy []User    `json:"purchasedby" gorm:"many2many:user_avatars"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type AvatarResponse struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	SecureUrl   string    `json:"secureurl"`
}

func (AvatarResponse) TableName() string {
	return "PurchasedAvatars"
}

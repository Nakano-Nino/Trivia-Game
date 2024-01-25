package models

import (
	"github.com/google/uuid"
	"time"
)

type User struct {
	ID               uuid.UUID `gorm:"type:uuid;default:gen_random_uuid()"`
	Name             string    `json:"name" gorm:"type: varchar(255)"`
	Email            string    `json:"email" gorm:"type: varchar(255)"`
	Avatar           string    `json:"avatar" gorm:"type: varchar(255)"`
	PurchasedAvatars []Avatar  `json:"purchasedavatars" gorm:"many2many:user_avatars"`
	Diamond          int       `json:"diamond" gorm:"type: int"`
	Role             string    `json:"role" gorm:"type: varchar(20)"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

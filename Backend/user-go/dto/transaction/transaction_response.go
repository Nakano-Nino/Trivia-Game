package transactiondto

import (
	"time"
	"github.com/google/uuid"
)

type TransactionResponse struct {
	ID        uuid.UUID `json:"id"`
	Amount    int       `json:"amount"`
	Status    string    `json:"status"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
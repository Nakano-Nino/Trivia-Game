package transactiondto

type TransactionRequest struct {
	TransactionId     string    `json:"order_id" form:"order_id"`
	Amount            string       `json:"gross_amount" form:"gross_amount"`
	TransactionStatus string    `json:"transaction_status" form:"transaction_status"`
	FraudStatus       string    `json:"fraud_status" form:"fraud_status"`
}

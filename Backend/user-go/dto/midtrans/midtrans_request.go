package midtransdto

type MidtransRequest struct {
	Amount   int64    `json:"amount" form:"amount" validate:"required"`
	ItemId   string `json:"item_id" form:"item_id" validate:"required"`
}
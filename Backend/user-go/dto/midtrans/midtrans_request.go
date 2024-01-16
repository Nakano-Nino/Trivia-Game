package midtransdto

type MidtransRequest struct {
	UserId   string `json:"user_id" form:"user_id" validate:"required"`
	Name	  string `json:"name" form:"name" validate:"required"`
	Email	  string `json:"email" form:"email" validate:"required"`
	Amount   int    `json:"amount" form:"amount" validate:"required"`
	ItemId   string `json:"item_id" form:"item_id" validate:"required"`
	ItemName string `json:"item_name" form:"item_name" validate:"required"`
}
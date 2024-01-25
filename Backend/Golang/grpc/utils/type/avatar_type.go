package utils

type AvatarType struct {
	Code int32           `json:"code"`
	Data []AvatarRequest `json:"data"`
}

type GetOneAvatarType struct {
	Code int32         `json:"code"`
	Data AvatarRequest `json:"data"`
}

type AvatarRequest struct {
	Id          string        `json:"id"`
	Name        string        `json:"name"`
	SecureUrl   string        `json:"secureUrl"`
	Price       int64         `json:"price"`
	PurchasedBy []UserRequest `json:"purchasedBy"`
}

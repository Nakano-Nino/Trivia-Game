package utils

type UserType struct {
	Code int32         `json:"code"`
	Data []UserRequest `json:"data"`
}

type GetOneUserType struct {
	Code int32       `json:"code"`
	Data UserRequest `json:"data"`
}

type UserRequest struct {
	Id               string             `json:"id"`
	Name             string             `json:"name"`
	Email            string             `json:"email"`
	Avatar           string             `json:"avatar"`
	PurchasedAvatars []PurchasedAvatars `json:"purchasedAvatars"`
	Diamond          int64              `json:"diamond"`
	Role             string             `json:"role"`
}

type PurchasedAvatars struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	SecureUrl   string `json:"secureurl"`
}

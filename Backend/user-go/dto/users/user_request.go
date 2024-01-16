package usersdto

type CreateUserRequest struct {
	// IdToken string `json:"idToken" form:"idToken" validate:"required" param:"idToken"`
	Name   string `json:"name" form:"name" validate:"required"`
	Email  string `json:"email" form:"email" validate:"required"`
	Avatar string `json:"picture" form:"avatar"`
	Role   string `json:"role" form:"role"`
}

type UpdateUserRequest struct {
	Name    string `json:"name" form:"name"`
	Avatar  string `json:"avatar" form:"avatar"`
	Diamond int    `json:"diamond" form:"diamond"`
}

type GetUserRequest struct {
	Email string `json:"email" form:"email" validate:"required"`
}

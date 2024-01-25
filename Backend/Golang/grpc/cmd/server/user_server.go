package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	userPb "golang-trivia/grpc/pb"
	"golang-trivia/grpc/utils"
	userType "golang-trivia/grpc/utils/type"
	"golang-trivia/user-go/repositories/users"
)

type UserServer struct {
	userPb.UnimplementedUserServer
	UserRepository users.UserRepository
}

func UserHandler(UserRepository users.UserRepository) userPb.UserServer {
    return &UserServer{UserRepository: UserRepository}
}

func (us *UserServer) GetOneUser(ctx context.Context, in *userPb.Email) (*userPb.ResponseOneUser, error) {
	userEmail := in.Email

	userEndpoint := fmt.Sprintf("/get-user?email=%s", userEmail)

	url := utils.UrlApiKey("API_URL", userEndpoint)

	res, err := http.Get(url)
	if err != nil {
		log.Fatal("api user error", err.Error())
		os.Exit(1)
	}

	resData, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatal("Error : ", err.Error())
		os.Exit(1)
	}

	var RequestUserEmail userType.GetOneUserType

	if err := json.Unmarshal(resData, &RequestUserEmail); err != nil {
		log.Fatalf("Cannot unmarshal data: %v", err.Error())
	}

	var purchasedAvatars []*userPb.ResAvatar
	for _, pa := range RequestUserEmail.Data.PurchasedAvatars {
		purchasedAvatars = append(purchasedAvatars, &userPb.ResAvatar{
			Id:        pa.Id,
			Name:      pa.Name,
			SecureUrl: pa.SecureUrl,
		})
	}

	result := &userPb.ResponseOneUser{
		Code: RequestUserEmail.Code,
		Data: &userPb.RequestUser{
			Id:              RequestUserEmail.Data.Id,
			Name:            RequestUserEmail.Data.Name,
			Email:           RequestUserEmail.Data.Email,
			Avatar:          RequestUserEmail.Data.Avatar,
			PurchasedAvatar: purchasedAvatars,
			Diamond:         RequestUserEmail.Data.Diamond,
			Role:            RequestUserEmail.Data.Role,
		},
	}

	return result, nil
}

func (h *UserServer) UpdateUser(ctx context.Context, in *userPb.Email) (*userPb.ResponseOneUser, error) {
    userEmail := in.Email

    user, err := h.UserRepository.GetUser(userEmail)
    if err != nil {
        log.Printf("Error retrieving user : %v", err.Error())
        return nil, err
    }

    user.Diamond = user.Diamond + 10

    data, err := h.UserRepository.UpdateUser(user)
    if err != nil {
        log.Fatalf("Error : %v", err.Error())
        return nil, err
    }

    var purchasedAvatars []*userPb.ResAvatar
    for _, pa := range data.PurchasedAvatars {
        purchasedAvatars = append(purchasedAvatars, &userPb.ResAvatar{
            Id:        pa.ID.String(),
            Name:      pa.Name,
            SecureUrl: pa.SecureUrl,
        })
    }

   result := &userPb.ResponseOneUser{
       Code: 200,
       Data: &userPb.RequestUser{
           Id:              data.ID.String(),
           Name:            data.Name,
           Email:           data.Email,
           Avatar:          data.Avatar,
           PurchasedAvatar: purchasedAvatars,
           Diamond:         int64(data.Diamond),
           Role:            data.Role,
       },
   }

    return result, nil
}

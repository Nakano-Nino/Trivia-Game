package server

import (
    "encoding/json"
    "net/http"
    "context"
    "time"
    "log"
    "io"
    "os"

     redis "golang-trivia/grpc/cmd/config"
     avatarPb "golang-trivia/grpc/pb"
     "golang-trivia/grpc/utils"
)

type AvatarServer struct {
    avatarPb.UnimplementedAvatarServer
}

func (as *AvatarServer) GetAvatars(ctx context.Context, in *avatarPb.EmptyAvatar) (*avatarPb.ResponseAvatars, error) {
    RedisClient := redis.RedisClient

    avatarsJson, err := RedisClient.Get(ctx, "laravel_database_avatars").Result()
    if err != nil {
        avatarsJson = utils.UrlApiKey("API_URL", "/avatars")
        res, err := http.Get(avatarsJson)
        if err != nil {
            log.Fatal("api avatar error",err.Error())
            os.Exit(1)
        }

        resData, err := io.ReadAll(res.Body)
        if err != nil {
            log.Fatal("Error : ",err.Error())
            os.Exit(1)
        }

        err = RedisClient.Set(ctx, "laravel_database_avatars", string(resData), 1 * time.Hour).Err()
        if err != nil {
            log.Fatal("redis error",err.Error())
            os.Exit(1)
        }


        var avatars []*avatarPb.RequestAvatar
        if err := json.Unmarshal(resData, &avatars); err != nil {
            log.Fatal(err)
            os.Exit(1)
        }

        result := &avatarPb.ResponseAvatars{
            Code: 200,
            Data: avatars,
        }

        return result, nil
    }

    var avatars []*avatarPb.RequestAvatar
    if err := json.Unmarshal([]byte(avatarsJson), &avatars); err != nil {
        log.Fatal(err)
        os.Exit(1)
    }

    result := &avatarPb.ResponseAvatars{
        Code: 200,
        Data: avatars,
    }

    return result, err
}
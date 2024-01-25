package server

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"

    // questiontype "grpc-gateway/utils/type"
	redis "golang-trivia/grpc/cmd/config"
	questionPb "golang-trivia/grpc/pb"
	"golang-trivia/grpc/utils"
)

type QuestionServer struct {
    questionPb.UnimplementedQuestionServer
}

func (qs *QuestionServer) GetQuestions(ctx context.Context, in *questionPb.Empty) (*questionPb.Responses, error) {
    RedisClient := redis.RedisClient

    questionsJson, err := RedisClient.Get(ctx, "laravel_database_questions").Result()
    if err != nil {
        questionsJson = utils.UrlApiKey("API_URL", "/questions")
        res, err := http.Get(questionsJson)
        if err != nil {
            log.Fatal("api question error ",err.Error())
            os.Exit(1)
        }

        resData, err := io.ReadAll(res.Body)
        if err != nil {
            log.Fatal("Error : ",err.Error())
            os.Exit(1)
        }

        err = RedisClient.Set(ctx, "laravel_database_questions", string(resData), 1 * time.Hour).Err()
        if err != nil {
            log.Fatal("redis error ",err.Error())
            os.Exit(1)
        }

        var questions []*questionPb.Request
        if err := json.Unmarshal(resData, &questions); err != nil {
            log.Fatal(err)
            os.Exit(1)
        }

        result := &questionPb.Responses{
            Code: 200,
            Data: questions,
        }

        return result, nil
    }

    var questions []*questionPb.Request
    if err := json.Unmarshal([]byte(questionsJson), &questions); err != nil {
        log.Fatal(err)
        os.Exit(1)
    }

    result := &questionPb.Responses{
        Code: 200,
        Data: questions,
    }

    return result, nil
}
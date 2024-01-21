package server

import (
    "context"
    "encoding/json"
    "fmt"
    "io"
    "os"
    "net/http"
    "log"

    questionType "grpc-gateway/utils/type"
    questionPb "grpc-gateway/pb"
    "grpc-gateway/utils"
)

type QuestionServer struct {
    questionPb.UnimplementedQuestionServer
}

func (qs *QuestionServer) GetQuestions(ctx context.Context, in *questionPb.Empty) (*questionPb.Responses, error) {
    questionapi := utils.UrlApiKey("API_URL", "/get-questions")
    res, err := http.Get(questionapi)
    if err != nil {
        log.Fatal("api question error",err.Error())
        os.Exit(1)
    }

    resData, err := io.ReadAll(res.Body)
    if err != nil {
        log.Fatal("Error : ",err.Error())
        os.Exit(1)
    }

    var data questionType.QuestionType

    if err := json.Unmarshal(resData, &data); err != nil {
        log.Fatal(err)
    }

    var dataQuestion []*questionPb.Request

    for _, r := range data.Data {
        dataQuestion = append(dataQuestion, &questionPb.Request{
            Id: r.Id,
            ImageQuestion: r.ImageQuestion,
            A: r.A,
            B: r.B,
            C: r.C,
            D: r.D,
            Answer: r.Answer,
        })
    }
}
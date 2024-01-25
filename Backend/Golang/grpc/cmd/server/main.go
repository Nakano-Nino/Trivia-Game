package server

import (
	"context"
	"log"
	"net"
	"net/http"

	pb "golang-trivia/grpc/pb"
	"golang-trivia/grpc/cmd/config"
	"github.com/gorilla/handlers"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
    "golang-trivia/user-go/repositories/users"
)

func Server() {

    config.DatabaseInit()
    config.RedisInit()

    lis, err := net.Listen("tcp", ":50052")
    if err != nil {
        log.Fatal(err)
    }

    userRepository := users.RepositoryUsers(config.DB)
	h := UserHandler(userRepository)

    s := grpc.NewServer()

    questionServer := &QuestionServer{}
    // userServer := &UserServer{}
    AvatarServer := &AvatarServer{}

    pb.RegisterQuestionServer(s, questionServer)
    pb.RegisterUserServer(s, h)
    pb.RegisterAvatarServer(s, AvatarServer)

    log.Printf("Server listening at %v", lis.Addr())

    if err = s.Serve(lis); err != nil {
        log.Fatalf("Failed to serve: %v", err.Error())
    }
}

type ServerRunGateway struct {
    pb.UnimplementedQuestionServer
}

func GatewayServer() {
    endpoint := "localhost:50052"
    mux := runtime.NewServeMux()
    opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
    ctx := context.Background()
    conn, err := grpc.Dial(endpoint, opts...)
    if err != nil {
        log.Fatal(err.Error())
    }
    err = pb.RegisterQuestionHandler(ctx, mux, conn)
    if err != nil {
        log.Fatal(err)
    }

    if err = pb.RegisterUserHandler(ctx, mux, conn); err != nil {
        log.Fatal(err)
    }

    if err = pb.RegisterAvatarHandler(ctx, mux, conn); err != nil {
        log.Fatal(err)
    }

    var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "ngrok-skip-browser-warning"})
    var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
    var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})
    
    log.Fatal(http.ListenAndServe(":50051", handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(mux)))
}

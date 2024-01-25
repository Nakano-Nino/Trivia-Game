package main

import (
    "fmt"
    servcer "golang-trivia/grpc/cmd/server"
)

func main() {
    go servcer.GatewayServer()
    servcer.Server()
    fmt.Println("test golang")
}
package utils

import (
    "fmt"
    "log"
    "os"

    "github.com/joho/godotenv"
)

func GoDotEnv(key string) string {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatalf("Error loading .env file")
    }

    return os.Getenv(key)
}

func UrlApiKey(key string, valueApi string) string {
    urlValue := GoDotEnv(key)

    resultUrl := urlValue + valueApi

    fmt.Println(resultUrl)

    return resultUrl
}
package config

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func RedisInit() {
	var err error
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	pong, err := RedisClient.Ping(context.Background()).Result()
	fmt.Println(pong, err)
}

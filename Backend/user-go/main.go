package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Nakano-Nino/Trivia-Game/database"
	"github.com/Nakano-Nino/Trivia-Game/pkg/postgres"
	"github.com/Nakano-Nino/Trivia-Game/routes"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/midtrans/midtrans-go"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	postgres.DatabaseInit()

	midtransConf()

	database.RunMigration()

	r := mux.NewRouter()

	routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())

	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Accept", "ngrok-skip-browser-warning"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = os.Getenv("PORT")
	fmt.Println("server running localhost:" + port)

	http.ListenAndServe(":"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
}

func midtransConf() {
	midtrans.ServerKey = os.Getenv("MIDTRANS_SERVER_KEY")
	midtrans.Environment = midtrans.Sandbox
}
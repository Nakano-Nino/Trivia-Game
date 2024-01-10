package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
)

func UploadFile(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file, _, err := r.FormFile("picture")

		if err != nil && r.Method == "PATCH" {
			ctx := context.WithValue(r.Context(), "dataFile", "false")
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}

		if err != nil {
			fmt.Println(err)
			json.NewEncoder(w).Encode("Error retrieving file")
			return
		}
		defer file.Close()

		buff := make([]byte, 512)
		_, err = file.Read(buff)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		filetype := http.DetectContentType(buff)
		if filetype != "image/jpeg" && filetype != "image/png" {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "The provided file format is not allowed. Please upload a JPEG or PNG image"}
			json.NewEncoder(w).Encode(response)
			return
		}

		parts := strings.Split(filetype, "/")
		fileExt := ""

		if len(parts) == 2 {
			fileExt = parts[1]
		} else {
			fmt.Println("Invalid MIME type format")
		}

		_, err = file.Seek(0, io.SeekStart)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		const MAX_UPLOAD_SIZE = 10 << 20

		r.ParseMultipartForm(MAX_UPLOAD_SIZE)
		if r.ContentLength > MAX_UPLOAD_SIZE {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Max size in 10mb"}
			json.NewEncoder(w).Encode(response)
			return
		}

		tempfile, err := os.CreateTemp("uploads", "image-*."+fileExt)
		if err != nil {
			fmt.Println(err)
			fmt.Println("path upload error")
			json.NewEncoder(w).Encode(err)
			return
		}
		defer tempfile.Close()

		fileBytes, err := io.ReadAll(file)
		if err != nil {
			fmt.Println(err)
		}

		tempfile.Write(fileBytes)

		data := tempfile.Name()

		ctx := context.WithValue(r.Context(), "dataFile", data)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
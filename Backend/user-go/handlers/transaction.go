package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	dto "github.com/Nakano-Nino/Trivia-Game/dto/result"
	"github.com/Nakano-Nino/Trivia-Game/models"
	"github.com/Nakano-Nino/Trivia-Game/repositories/transaction"
	"github.com/google/uuid"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
)

var c coreapi.Client

type transactionHandler struct {
	TransactionRepository transaction.TransactionRepository
}

func HandleTransaction(TransactionRepository transaction.TransactionRepository) *transactionHandler {
	return &transactionHandler{
		TransactionRepository,
	}
}

func (h *transactionHandler) Notification(w http.ResponseWriter, r *http.Request) {

	c.New(midtrans.ServerKey, midtrans.Sandbox)

	// 1. Initialize empty map
	var notificationPayload map[string]interface{}

	// 2. Parse JSON request body and use it to set json to payload
	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// 3. Get order-id from payload
	orderId, exists := notificationPayload["order_id"].(string)
	if !exists {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "order id not found"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// 4. Check transaction to Midtrans with param orderId
	transactionStatusResp, e := c.CheckTransaction(orderId)
	if e != nil {
		http.Error(w, e.GetMessage(), http.StatusInternalServerError)
		return
	} else {
		if transactionStatusResp != nil {
			// 5. Do set transaction status based on response from check transaction status
			if transactionStatusResp.TransactionStatus == "capture" {
				if transactionStatusResp.FraudStatus == "challenge" {
					// TODO set transaction status on your database to 'challenge'
					detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
					if err != nil {
						w.WriteHeader(http.StatusBadRequest)
						response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
						json.NewEncoder(w).Encode(response)
						return
					}

					if transactionStatusResp.TransactionStatus != "" {
						detail.Status = "challenge"
						h.TransactionRepository.UpdateTransaction(detail)
					}
				} else if transactionStatusResp.FraudStatus == "accept" {
					// TODO set transaction status on your database to 'success'
					detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
					if err != nil {
						w.WriteHeader(http.StatusBadRequest)
						response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
						json.NewEncoder(w).Encode(response)
						return
					}

					if transactionStatusResp.TransactionStatus != "" {
						detail.Status = "success"
						h.TransactionRepository.UpdateTransaction(detail)
					}

				}
			} else if transactionStatusResp.TransactionStatus == "settlement" {
				// TODO set transaction status on your databaase to 'success'
				detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					json.NewEncoder(w).Encode(response)
					return
				}

				if transactionStatusResp.TransactionStatus != "" {
					detail.Status = "success"
					h.TransactionRepository.UpdateTransaction(detail)
				}
			} else if transactionStatusResp.TransactionStatus == "deny" {
				// TODO you can ignore 'deny', because most of the time it allows payment retries
				// and later can become success
			} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
				// TODO set transaction status on your databaase to 'failure'
				detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					json.NewEncoder(w).Encode(response)
					return
				}

				if transactionStatusResp.TransactionStatus != "" {
					detail.Status = "failure"
					h.TransactionRepository.UpdateTransaction(detail)
				}
			} else if transactionStatusResp.TransactionStatus == "pending" {
				// TODO set transaction status on your databaase to 'pending'
				amount, err := strconv.ParseFloat(transactionStatusResp.GrossAmount, 64)
				if err != nil {
					w.WriteHeader(http.StatusBadRequest)
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					json.NewEncoder(w).Encode(response)
					return
				}

				transaction := models.Transaction{
					ID:     transactionStatusResp.OrderID,
					Amount: int(amount),
					Status: "pending",
				}

				data, err := h.TransactionRepository.CreateTransaction(transaction)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
					json.NewEncoder(w).Encode(response)
					return
				}

				w.WriteHeader(http.StatusOK)
				response := dto.SuccessResult{Code: http.StatusOK, Data: data}
				json.NewEncoder(w).Encode(response)
			}
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("ok"))
	}

	transactions, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if transactions.Status == "success" {
		amount, err := strconv.ParseFloat(transactionStatusResp.GrossAmount, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		strId := removeLastPart(transactionStatusResp.OrderID, "-")
		userId, err := uuid.Parse(strId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		user, err := h.TransactionRepository.GetUser(userId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		diamonds, err := h.TransactionRepository.GetDiamonds(int(amount))
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
			json.NewEncoder(w).Encode(response)
			return
		}

		user.Diamond += diamonds.Amount

		h.TransactionRepository.UpdateUser(user)
	}
}

func (h *transactionHandler) FindDiamonds(w http.ResponseWriter, r *http.Request) {
	diamonds, err := h.TransactionRepository.FindDiamonds()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: diamonds}
	json.NewEncoder(w).Encode(response)
}

func removeLastPart(inputString, delimiter string) string {
	// Find the last occurrence of the delimiter in the inputString
	lastIndex := strings.LastIndex(inputString, delimiter)

	// If the delimiter is found, extract the substring excluding the last part
	if lastIndex != -1 {
		resultString := inputString[:lastIndex]
		return resultString
	}

	// If the delimiter is not found, return the original inputString
	return inputString
}

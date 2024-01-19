package utils

type QuestionType struct {
    Code int32 `json:"code"`
    Data []QuestionRequest `json:"data"`
}

type GetOneQuestionType struct {
    Code int32 `json:"code"`
    Data QuestionRequest `json:"data"`
}

type QuestionRequest struct {
    Id int32 `json:"id"`
    ImageQuestion string `json:"image_question"`
    A string `json:"A"`
    B string `json:"B"`
    C string `json:"C"`
    D string `json:"D"`
    Answer string `json:"answer"`
}
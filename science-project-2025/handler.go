package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type ResponseBody struct {
	Result int `json:"result"`
}

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	// Unmarshal the JSON body into a Go struct
	var operations []int
	body := request.Body
	if request.IsBase64Encoded {
		decodedBody, err := base64.StdEncoding.DecodeString(body)
		if err != nil {
			return events.APIGatewayV2HTTPResponse{
				StatusCode: 400,
				Body:       fmt.Sprintf("Error decoding base64 body: %v", err),
			}, nil
		}
		body = string(decodedBody)
	}

	err := json.Unmarshal([]byte(body), &operations)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Body:       fmt.Sprintf("Error unmarshalling request body: %v", err),
		}, nil
	}

	result := 0
	for _, op := range operations {
		result += op
	}

	// Marshal the body struct into a JSON string
	jsonBody, err := json.Marshal(ResponseBody{Result: result})
	if err != nil {
		return events.APIGatewayV2HTTPResponse{StatusCode: 500}, err
	}

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body:            string(jsonBody),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(Handler)
}

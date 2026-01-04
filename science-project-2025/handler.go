package main

import (
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// ResponseBody is the response body for the Lambda function
type ResponseBody struct {
	Result int `json:"result"`
}

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	// Our list of operations
	var operations []int

	// Unmarshal the JSON body into our list of operations
	err := json.Unmarshal([]byte(request.Body), &operations)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Body:       fmt.Sprintf("Error unmarshalling request body: %v", err),
		}, nil
	}

	// Calculate the result
	result := 0
	for _, op := range operations {
		result += op
	}

	// Marshal the ResponseBody into a JSON string for the response
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

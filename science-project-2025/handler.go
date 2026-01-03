package main

import (
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type ResponseBody struct {
	Result int `json:"result"`
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Unmarshal the JSON body into a Go struct
	var operations []int
	err := json.Unmarshal([]byte(request.Body), &operations)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       fmt.Sprintf("Error unmarshalling request body: %v", err),
		}, nil
	}

	result := 0

	// TODO: calculate the result

	// Marshal the body struct into a JSON string
	jsonBody, err := json.Marshal(ResponseBody{Result: result})
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(jsonBody), // Body must be a string
	}, nil
}

func main() {
	lambda.Start(Handler)
}

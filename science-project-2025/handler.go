package main

import (
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Operation represents a single step in the calculation
type Operation struct {
	Type  string      `json:"type"`
	Value interface{} `json:"value"`
}

// ResponseBody is the response body for the Lambda function
type ResponseBody struct {
	Result interface{} `json:"result"`
}

func Handler(request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	// Our list of operations
	var operations []Operation

	// Unmarshal the JSON body into our list of operations
	err := json.Unmarshal([]byte(request.Body), &operations)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Body:       fmt.Sprintf("Error unmarshalling request body: %v", err),
		}, nil
	}

	// Calculate the result
	if len(operations) == 0 {
		jsonBody, _ := json.Marshal(ResponseBody{Result: 0})
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 200,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       string(jsonBody),
		}, nil
	}

	result := operations[0].Value.(float64)
	for i := 1; i < len(operations); i += 2 {
		op := operations[i].Value.(string)
		nextVal := operations[i+1].Value.(float64)

		switch op {
		case "+":
			result += nextVal
		case "-":
			result -= nextVal
		case "*":
			result *= nextVal
		case "/":
			if nextVal != 0 {
				result /= nextVal
			} else {
				jsonBody, _ := json.Marshal(ResponseBody{Result: "Error: Div by 0"})
				return events.APIGatewayV2HTTPResponse{
					StatusCode: 200,
					Headers:    map[string]string{"Content-Type": "application/json"},
					Body:       string(jsonBody),
				}, nil
			}
		}
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

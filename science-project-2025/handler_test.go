package main

import (
	"encoding/json"
	"testing"

	"github.com/aws/aws-lambda-go/events"
)

func TestHandler(t *testing.T) {
	tests := []struct {
		name       string
		body       string
		wantResult int
		wantStatus int
	}{
		{
			name:       "Addition",
			body:       "[10, 5, -3]",
			wantResult: 12,
			wantStatus: 200,
		},
		{
			name:       "Empty list",
			body:       "[]",
			wantResult: 0,
			wantStatus: 200,
		},
		{
			name:       "Invalid JSON",
			body:       "invalid",
			wantStatus: 400,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			request := events.APIGatewayV2HTTPRequest{
				Body: tt.body,
			}
			response, err := Handler(request)
			if err != nil {
				t.Fatalf("Handler returned error: %v", err)
			}

			if response.StatusCode != tt.wantStatus {
				t.Errorf("expected status %d, got %d", tt.wantStatus, response.StatusCode)
			}

			if tt.wantStatus == 200 {
				var body ResponseBody
				err = json.Unmarshal([]byte(response.Body), &body)
				if err != nil {
					t.Fatalf("could not unmarshal response body: %v", err)
				}
				if body.Result != tt.wantResult {
					t.Errorf("expected result %d, got %d", tt.wantResult, body.Result)
				}
			}
		})
	}
}

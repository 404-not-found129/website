import json


def hello(event, context):
  # The request body is in the 'body' field of the event object.
  # It is typically a JSON-encoded string and needs to be parsed.
  if 'body' in event and event['body'] is not None:
    try:
      operations = json.loads(event['body'])
      print(f"Received operations: {operations}")
    except json.JSONDecodeError:
      # Handle cases where the body is not valid JSON
      return {
        'statusCode': 400,
        'body': json.dumps({'error': 'Invalid JSON in request body'})
      }
  else:
    # Handle cases where the body is not valid JSON
    return {
      'statusCode': 400,
      'body': json.dumps({'error': 'Missing request body'})
    }

  # Check if the parsed data is indeed a list
  if not isinstance(operations, list):
    return {
      'statusCode': 400,
      'body': json.dumps({"message": "Request body must be a JSON array"})
    }

  result = 0

  # TODO: calculate the result

  return {
    "statusCode": 200,
    "body": json.dumps({
      "result": result,
    }),
    "headers": {
      "Content-Type": "application/json"
    },
  }

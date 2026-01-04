import json

def calc(event, context):
  # The request body is in the 'body' field of the event object.
  body = event.get('body', '')
  if body is not None and event.get('isBase64Encoded', False):
    import base64
    body = base64.b64decode(body).decode('utf-8')

  # Unmarshal the JSON body into our list of operations
  if body:
    try:
      operations = json.loads(body)
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

  # Calculate the result
  result = 0
  for op in operations:
    result += op

  return {
    "statusCode": 200,
    "body": json.dumps({
      "result": result,
    }),
    "headers": {
      "Content-Type": "application/json"
    },
  }

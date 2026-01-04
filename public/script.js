// get a reference to the elements on the page
const languageSelect = document.getElementById('language-select');
const input = document.getElementById('num-input');
const addButton = document.getElementById('add-button');
const subtractButton = document.getElementById('subtract-button');
const operations = document.getElementById('operations');
const clearButton = document.getElementById('clear-button');
const calculateButton = document.getElementById('calculate-button');
const resultText = document.getElementById('result');

// list of numbers to add and subtract
let numberList = [];

console.dir({input, addButton, subtractButton, operations, clearButton, calculateButton, resultText});

// ensure the input value is between 1 and 67
input.addEventListener('input', function () {
  console.log('Input value changed:', input.value);
  if (input.value < 1) {
    input.value = 1;
  } else if (input.value > 67) {
    input.value = 67;
  }
});

// add the input value to the list of operations
addButton.addEventListener('click', function () {
  console.log('Add button clicked');
  appendOperation(+input.value);
});

// subtract the input value from the list of operations
subtractButton.addEventListener('click', function () {
  console.log('Subtract button clicked');
  appendOperation(-input.value);
});

// clear the list of operations and result
clearButton.addEventListener('click', function () {
  console.log('Clear button clicked');

  operations.innerHTML = '';
  numberList = [];
  resultText.innerText = '';

  console.log(numberList);
});

// calculate the result based on the list of operations
calculateButton.addEventListener('click', async function () {
  console.log('Calculate button clicked');

  const language = languageSelect.value;
  const result = await calculate(language);
  resultText.innerText = result.toString();

  console.log({
    language,
    result,
    numberList
  });
});

// add or subtract the input value from the list of operations
function appendOperation(amount) {
  const operation = document.createElement('span');
  if (amount >= 0) {
    operation.innerText = ` +${amount}`;
    operation.style.color = 'green';
  } else {
    operation.innerText = ` ${amount}`;
    operation.style.color = 'red';
  }
  operations.appendChild(operation);
  numberList.push(amount);

  console.log(numberList);
}

async function calculate(language) {
  // if the language is javascript, just sum the numbers and return the result
  if (language === 'javascript') {
    let result = 0;
    for (let i = 0; i < numberList.length; i++) {
      result += numberList[i];
    }
    return result;
  }

  // if the language is not javascript, call the API to calculate the result
  const url = `https://8q1kodsag9.execute-api.us-east-1.amazonaws.com/calc/${language}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(numberList)
    });

    if (!response.ok) {
      console.error('Server returned an error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error body:', errorText);
      return 'Error: ' + response.status;
    }

    const data = await response.json();
    console.log('Response from server:', data);
    return data.result !== undefined ? data.result : 'Error: No result';
  } catch (error) {
    console.error('Fetch error:', error);
    return 'Error: ' + error.message;
  }
}


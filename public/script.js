// get a reference to the elements on the page
const languageSelect = document.getElementById('language-select');
const operationsDisplay = document.getElementById('operations');
const resultDisplay = document.getElementById('result');
const clearButton = document.getElementById('clear-button');
const calculateButton = document.getElementById('calculate-button');
const addButton = document.getElementById('add-button');
const subtractButton = document.getElementById('subtract-button');
const multiplyButton = document.getElementById('multiply-button');
const divideButton = document.getElementById('divide-button');
const numberButtons = document.querySelectorAll('.btn.number');

// state
let currentInput = '0';
let operations = []; // List of {type: 'number'|'operator', value: number|string}
let isEnteringResult = false;

// update the display
function updateDisplay() {
  resultDisplay.innerText = currentInput;
  const displayOps = operations.map(op => {
    if (op.type === 'operator') {
      if (op.value === '*') return '×';
      if (op.value === '/') return '÷';
    }
    return op.value;
  });
  operationsDisplay.innerText = displayOps.join(' ');
}

// handle number clicks
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isEnteringResult) {
      currentInput = button.innerText;
      isEnteringResult = false;
    } else if (currentInput === '0') {
      currentInput = button.innerText;
    } else {
      currentInput += button.innerText;
    }
    updateDisplay();
  });
});

function pushOperator(op) {
  isEnteringResult = false;
  const val = parseFloat(currentInput);
  if (!isNaN(val)) {
    // If we have a pending input, push it and the operator
    operations.push({type: 'number', value: val});
    operations.push({type: 'operator', value: op});
    currentInput = '0';
    updateDisplay();
  } else if (operations.length > 0 && operations[operations.length - 1].type === 'operator') {
    // If user clicked two operators in a row, replace the last one
    operations[operations.length - 1].value = op;
    updateDisplay();
  }
}

// handle operators
addButton.addEventListener('click', () => pushOperator('+'));
subtractButton.addEventListener('click', () => pushOperator('-'));
multiplyButton.addEventListener('click', () => pushOperator('*'));
divideButton.addEventListener('click', () => pushOperator('/'));

// clear everything
clearButton.addEventListener('click', () => {
  currentInput = '0';
  operations = [];
  isEnteringResult = false;
  resultDisplay.innerText = '0';
  operationsDisplay.innerText = '';
});

// calculate
calculateButton.addEventListener('click', async () => {
  const val = parseFloat(currentInput);
  if (!isNaN(val)) {
    operations.push({type: 'number', value: val});
    currentInput = '0';
  }

  if (operations.length === 0) return;

  const language = languageSelect.value;
  resultDisplay.innerText = '...';
  
  const result = await calculate(language);
  resultDisplay.innerText = result.toString();
  
  currentInput = result.toString();
  isEnteringResult = true;
  operations = [];
});

async function calculate(language) {
  if (language === 'javascript') {
    if (operations.length === 0) return 0;
    let res = operations[0].value;
    for (let i = 1; i < operations.length; i += 2) {
      const op = operations[i].value;
      const nextVal = operations[i+1].value;
      if (op === '+') res += nextVal;
      if (op === '-') res -= nextVal;
      if (op === '*') res *= nextVal;
      if (op === '/') res /= nextVal;
    }
    return res;
  }

  const url = `https://8q1kodsag9.execute-api.us-east-1.amazonaws.com/calc/${language}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(operations)
    });

    if (!response.ok) {
      console.error('Server returned an error:', response.status, response.statusText);
      return 'Error';
    }

    const data = await response.json();
    return data.result !== undefined ? data.result : 'Error';
  } catch (error) {
    console.error('Fetch error:', error);
    return 'Error';
  }
}


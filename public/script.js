const languageSelect=document.getElementById('language-select');
const input = document.getElementById('num-input');
const addButton = document.getElementById('add-button');
const subtractButton = document.getElementById('subtract-button');
const operations = document.getElementById('operations');
const clearButton = document.getElementById('clear-button');
const calculateButton = document.getElementById('calculate-button');
const resultText = document.getElementById('result');

let numberList = [];

console.dir({input, addButton, subtractButton, operations});

input.addEventListener('input', function () {
  console.log('Input value changed:', input.value);
  if (input.value < 1) {
    input.value = 1;
  } else if (input.value > 67) {
    input.value = 67;
  }
});

addButton.addEventListener('click', function () {
  console.log('Add button clicked');
  appendOperation(+input.value);
});

subtractButton.addEventListener('click', function () {
  console.log('Subtract button clicked');
  appendOperation(-input.value);
});

calculateButton.addEventListener('click', function () {
  console.log('Calculate button clicked');
  const result = numberList.reduce((acc, curr) => acc + curr);
  resultText.innerText = result;
  const language = languageSelect.value;
  console.log({
    language,
    result,
    numberList
  });
});

clearButton.addEventListener('click', function () {
  console.log('Clear button clicked');
  operations.innerHTML = '';
  numberList = [];
  resultText.innerText = '';
  console.log(numberList);
});

function appendOperation(amount) {
  const row = document.createElement('span');
  if (amount >= 0) {
    row.innerText = ` +${amount}`;
    row.style.color = 'green';
  } else {
    row.innerText = ` ${amount}`;
    row.style.color = 'red';
  }
  operations.appendChild(row);
  numberList.push(amount);
  console.log(numberList);
}


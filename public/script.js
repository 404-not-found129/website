const input=document.getElementById('num-input');
const addButton=document.getElementById('add-button');
const subtractButton=document.getElementById('subtract-button');


console.dir({input});

input.addEventListener('input', function() {
  console.log('Input value changed:', input.value);
  if (input.value <1 ) {
    input.value=1;
  }else if (input.value > 67) {
    input.value=67;
  }
});

addButton.addEventListener('click', function() {
  console.log('Add button clicked');
  if (input.value < 67 ) {
    input.value++;
  }
});

subtractButton.addEventListener('click', function() {
  console.log('Subtract button clicked');
  if (input.value > 1 ) {
    input.value--;
  }
});

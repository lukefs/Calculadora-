let currentInput = '';
let history = [];

// Detect key inputs for the calculator
document.addEventListener('keydown', handleKeyboardInput);

function appendValue(value) {
  currentInput += value;
  document.getElementById('result').value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  document.getElementById('result').value = '';
}

function clearLast() {
  currentInput = currentInput.slice(0, -1);
  document.getElementById('result').value = currentInput;
}

function calculate() {
  try {
    const result = eval(currentInput.replace('%', '/100'));
    const operation = `${currentInput} = ${result}`;
    history.push(operation);
    updateHistory();
    currentInput = result.toString();
    document.getElementById('result').value = currentInput;
  } catch {
    alert('Erro na operação!');
    clearDisplay();
  }
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function saveHistory() {
  const blob = new Blob([history.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'historico_calculadora.txt';
  link.click();
}

function toggleHistory() {
  const menu = document.getElementById('history-menu');
  menu.classList.toggle('active');
}

function handleKeyboardInput(event) {
  const key = event.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '%'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    clearLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
}
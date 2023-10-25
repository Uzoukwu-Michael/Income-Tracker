let transactions = [];

const storedTransactions = localStorage.getItem('transactions')
if(storedTransactions){
  transactions = JSON.parse(storedTransactions);
  renderTransactions()
  calculateTotal();
}

function addTransaction() {
  const descriptionInput = document.getElementById('descriptionInput');
  const amountInput = document.getElementById('amountInput');
  const typeInput = document.getElementById('typeInput');

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;
  if (description !== '' && !isNaN(amount)) {
    const transaction = {
      description,
      amount,
      type
    };

    transactions.push(transaction);
    descriptionInput.value = '';
    amountInput.value = '';
    renderTransactions();
    calculateTotal();
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
}

function renderTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${transaction.description}</span>
      <span class="${transaction.type}">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}</span>
      <button onclick="deleteTransaction(${index})" class="delete">Delete</button>
      `;
      transactionList.appendChild(listItem);
    });
  }

  function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactions();
    calculateTotal();
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function calculateTotal() {
    let total = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        total += transaction.amount;
      } else {
        total -= transaction.amount;
      }
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  
  }

// JavaScript code for the app
const itemsContainer = document.querySelector('#items-container');
const addItemButton = document.querySelector('#add-item');
const itemNameInput = document.querySelector('#item-name');
const maxAmount = document.querySelector('#item-max-amount');

const items = [];

class Item {
  constructor(name, amount, maxAmount, itemElement) {
    this.name = name;
    this.amount = amount;
    this.maxAmount = maxAmount;
    this.itemStats = null;
    this.itemElement = itemElement;
    this.progressBar = null;
  }

  render() {
    let itemElement = "";
    itemElement = document.createElement("div");
    itemElement.classList.add('item-wrapper');
    itemElement.style.opacity = 0;
    itemElement.innerHTML = `
        <h1>${this.name}</h1>
        <h2 class="amount">${this.amount}</h2>
        <div class="progress-bar" style="display: none;">
          <div class="progress-bar-fill" style="width: ${this.amount / this.maxAmount * 100}%"></div>
        </div>
        <div class="max-amount-input">
          <label for="${this.name}-max-amount">Max Amount:&nbsp;</label>
          <input type="number" id="${this.name}-max-amount" value="${this.maxAmount}">
          <button id="add-max">SET</button>
        </div>
        <div class="amount-input">
          <label for="${this.name}-amount">Amount:&nbsp;</label>
          <input type="number" id="${this.name}-amount" value="${this.amount}">
          <button id="add-amount">ADD</button>
        </div>
    `;
    itemsContainer.appendChild(itemElement);
    const addAmountButton = itemElement.querySelector('#add-amount');
    addAmountButton.addEventListener('click', () => this.addAmount());
    const addMaxButton = itemElement.querySelector('#add-max');
    addMaxButton.addEventListener('click', () => this.addMaxAmount());
    this.itemStats = itemElement.querySelector('.amount');
    this.itemElement = itemElement;
    this.progressBar = itemElement.querySelector('.progress-bar');
    
    gsap.to(itemElement, {
      duration: 1,
      opacity: 1,
      ease: "power1.in",
      delay: 0.5 // add a delay of 0.5 seconds before the animation starts
    });
  }

  addAmount() {
    const itemAmountInput = ~~this.itemElement.querySelector(`#${this.name}-amount`).value;
    const oldAmount = this.amount;
    if (this.maxAmount === 0) {
      console.log("set max before adding amount");
    } else {
      this.amount = Math.min(oldAmount + itemAmountInput, this.maxAmount);
      this.itemStats.innerText = this.amount;
      this.progressBar.style.display = 'block';
      const progressBarFill = this.itemElement.querySelector('.progress-bar-fill');
      progressBarFill.style.width = `${this.amount / this.maxAmount * 100}%`;
    }
  }

  addMaxAmount() {
    const itemMaxAmountInput = ~~this.itemElement.querySelector(`#${this.name}-max-amount`).value;
    this.maxAmount = itemMaxAmountInput;
  }
}

function addItem() {
  const itemName = itemNameInput.value;
  const item = new Item(itemName, 0, 0);
  items.push(item);
  item.render();
}

const tl = gsap.timeline();
const container = document.querySelector('.container');
const wrapper = document.querySelector('.item-wrapper');
// Fade in the container
tl.to(container, {duration: 1.0, ease: "power1.in", opacity: 1});
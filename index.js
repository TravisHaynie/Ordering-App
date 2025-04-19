import { menuArray } from "./data.js";
const mainContainer = document.getElementById('main');
const orderContainer = document.getElementById('order-section');
const formContainer = document.getElementById('form');
const thankYouMessage = document.getElementById('thank-you');
let orderItem = [];


function generatedHtml() {
    let menuHtml = ''
    menuArray.forEach((menuItm) => {
        console.log(menuItm.ingredients)
        menuHtml +=
            `
            <div class='main-container border-btm'>
                <div>
                    <p class='menu-emoji'>${menuItm.emoji}</p> 
                    <div class='menu-ingredients-container'> 
                        <p class='menu-name'>${menuItm.name}</p>
                        <p class='menu-ingredients'>${menuItm.ingredients}</p>
                        <p class='menu-price'>$${menuItm.price}</p>
                    </div>
                </div>
                <div class='plus-btn-container'>
                    <button class='plus-btn' data-id='${menuItm.id}'>+</button>
                </div>
            </div>`
           
    })
       mainContainer.innerHTML = menuHtml
}

generatedHtml()

document.addEventListener('click', function(e) {
   
    if(e.target.dataset.id) {
        const clickedId = Number(e.target.dataset.id)
        addToOrder(clickedId)
    }

    if(e.target.dataset.remove) {
        const removeId = Number(e.target.dataset.remove)
        removeFromOrder(removeId)
    }

    if(e.target.dataset.complete) {
        e.preventDefault()
        renderForm(e.target.dataset.complete)
    }

    if(e.target.dataset.pay) {
        e.preventDefault()
        renderThankYouMessage(e.target.dataset.complete)
    }
})

function addToOrder(id) {
    const item = menuArray.find(item => item.id === id);
    if(item) {
        orderItem.push(item)
        renderOrder()
    }
    
}

function renderOrder() {
    let total = 0
   
        const orderDataHtml = orderItem.map(item => {
            total += item.price
        
               return  `
                    <ul class='ul-list'>
                       
                            <li class='left-item'>
                                ${item.name}
                                <button class='remove-btn' data-remove=${item.id}>remove</button>
                            </li>
                        <li class='item-price' >
                            $${item.price}
                        </li>
                    </ul>
                `
        }).join(' ')

       
    console.log(orderDataHtml)
        orderContainer.innerHTML = 
            `
            <h2 class='header-2'>Your Order</h2>
            ${orderDataHtml}
            <div class='total-price-flex'>
                <p class='total'>Total price:</p>
                <p>$${total}</p>
            </div>
            <button class='complete-order-btn' data-complete='complete-order-btn'>Complete Order</button>
            
            `
}

function removeFromOrder(id) {
    let removed = false
      orderItem = orderItem.filter(item => {
        if(item.id === id && !removed) {
            removed = true
            return false
        } else {
            return true
        }
    });
   
    renderOrder()
}

function renderForm() {
    formContainer.style.display='block'
    formContainer.innerHTML = 
        `
            <h2 class='card-details'>Enter Card Details</h2>
            <label for='name'></label>
            <input class="name" id='name'type='text' placeholder='Enter name' required></input>
            <label for='card-number'></label>
            <input class="card-number" id='card-number' type='text' placeholder='Enter Card number' required></input>
            <label for='password'></label>
            <input class='cvv' id='password' type='password' placeholder='Enter CVV' required></input>
            <button class='pay-btn' data-pay='pay-btn' >Pay</button>
        `
}

function renderThankYouMessage() {
    orderContainer.style.display='none'
    formContainer.style.display='none'

    thankYouMessage.innerHTML = 
        `
        <p class='thank-you'>Thanks,James!Your order is on the way!</p>
        `
}


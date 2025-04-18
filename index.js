import { menuArray } from "./data.js";
const mainContainer = document.getElementById('main');
const orderContainer = document.getElementById('order-section');
const orderItem = [];


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
                <div class="plus-btn-container">
                    <button class="plus-btn" data-id='${menuItm.id}'>+</button>
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
                    <ul class="ul-list">
                       
                            <li class="left-item">
                                ${item.name}
                                <button class="remove">remove</button>
                            </li>
                        <li class="item-price" >
                            $${item.price}
                        </li>
                    </ul>
                `
        }).join(' ')

       
    console.log(orderDataHtml)
        orderContainer.innerHTML = 
            `
            <h2 class="header-2">Your Order</h2>
            ${orderDataHtml}
            <div class="total-price-flex">
                <p class="total">Total price:</p>
                <p>$${total}</p>
            </div>
            <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
            
            `
}

import { menuArray } from "./data.js";
const mainContainer = document.getElementById('main');

function generatedHtml(arr) {
    menuArray.forEach((menuItm) => {
        console.log(menuItm.ingredients)
        mainContainer.innerHTML += 
            `
            <div class='main-container border-btm'>
                <div>
                <p class='menu-emoji'>${menuItm.emoji}</p> 
                <div class='menu-ingredients-container'> 
                    <p class='menu-name '>${menuItm.name}</p>
                    <p class='menu-ingredients '>${menuItm.ingredients}</p>
                    <p class='menu-price '>${menuItm.price}</p>
                </div>
                </div>
            <div class="plus-btn-container">
              <button class="plus-btn">+</button>
            </div>
            
        
            `
    })
}

generatedHtml(menuArray)
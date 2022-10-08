import menuArray from '/data.js';
import Product from '/Product.js';
import Cart from '/Cart.js';
import Form from '/Form.js';

const newProductsArray = getNewProductsArray();
let userCart = new Cart;
let userForm = new Form;

const formElt = document.getElementById('form');
const cartElt = document.getElementById('cart');


document.addEventListener('click', (e) => {
        if(e.target.dataset.button === 'add') {
            userCart.addProduct(newProductsArray[e.target.dataset.product]);
        } else if (e.target.dataset.button === 'remove') {
            userCart.removeProduct(newProductsArray[e.target.dataset.product]);
        } else if (e.target.id === 'order') {
            renderModalForm();
            cartElt.textContent = '';
        }
})

document.addEventListener('submit', (e) => {
    e.preventDefault();
    const paymentFormData = new FormData(document.getElementById('payment-form'));
    const val = userForm.vaildateFormData(paymentFormData);
    
    for(const pole of document.querySelectorAll(`#form .error`)) {
        pole.textContent ='';
    }

    if(val) {val.map(pole => {
        document.querySelector(`.${pole[0]}.error`).textContent = pole[1];
    })
    } else {
        form.style.display = 'none';
        
        const thanksElt = document.getElementById('thanks');
        thanksElt.textContent = userForm.getThanksText();
        thanksElt.style.display = 'block';
        
        setTimeout(() => thanksElt.style.display = 'none', 5000);
        
        userCart = new Cart;
        userForm = new Form;
    }    
})

function getNewProductsArray() {
    return menuArray.map(prod => new Product(prod)); 
}

function renderCart() {
    cartElt.innerHTML = userCart.getCartHtml();
}

function renderModalForm() {
    formElt.innerHTML = userForm.getFormHtml();
    formElt.style.display = 'flex';
}

function render() {
    let productsList = '';
    newProductsArray.forEach(product => productsList += product.getProductHtml());
    document.getElementById('menu').innerHTML = productsList;
}

render();


export default renderCart;
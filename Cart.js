import renderCart from '/index.js'

class Cart {
    constructor() {
        this.products = [],
        this.totalPrice = 0
    }
    
    
    addProduct(product) {
        const productIndex = this.products.findIndex(prod => prod.id === product.id);
        if (productIndex !== -1) {
            product.quantity++;            
        } else {
            product.quantity = 1;
            this.products.push(product);
        }
        this.totalPrice += product.price;
        renderCart();
    }
    
    removeProduct(product) {
        if (product.quantity === 1) {
            const productIndex = this.products.findIndex(prod => prod === product);
            this.products.splice(productIndex, 1);
        }
        this.totalPrice -= product.price;
        product.quantity--;
        renderCart();
    }
    
    getCartHtml() {
        if (this.products.length === 0) {
            return '';
        }
        let cartHtml = `<h2 class="cart-title">Your order</h2>
                        <table class="cart">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Product quantity</th>
                                    <th>Product value</th>
                                    <th>Total product value</th>
                                </tr>
                            </thead>
                            <tbody>`;
        this.products.forEach(product => {
            if (product.quantity > 0) {
                cartHtml += `
                    <tr class="cart-item">
                        <td class="product-name">${product.name}</td>
                        <td class="product-quantity">
                            <span>${product.quantity}</span>
                            <button class="button-remove" data-product="${product.id}" data-button="remove">
                                -
                            </button>
                            <button class="button-add" data-product="${product.id}" data-button="add">
                                +
                            </button>
                        </td>
                        <td class="product-price">
                            \$${product.price}
                        </td>
                        <td class="product-price total">
                            \$${product.price * product.quantity}
                        </td>
                    </tr>
            `;}
        })
        cartHtml += `</tbody>
                     <tfoot>
                        <tr class="cart-total">
                            <td colspan="4">Total price:
                                <span class="total">\$${this.totalPrice}</span> 
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <button id="order" class="green">Complete order</button>
            `;
        return cartHtml;
    }
    
}

export default Cart;
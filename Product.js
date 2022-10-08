class Product {
    constructor(data){        
        Object.assign(this, data)
    }
    
    getProductHtml() {
        const {name, ingredients, id, price, emoji} = this;
        return `<div class="product-wrap" id="${id}">
                    <div class="product">
                        <span class="picture">${emoji}</span>
                        <div class="product-details">
                            <h2 class="product-name">${name}</h2>
                            <span class="product-ingredients">${ingredients}</span>
                            <span class="product-price">\$${price}</span>
                        </div>
                    </div>
                    <button class="button-add" data-product="${id}" data-button="add">
                      +
                    </button>         
                </div>`;
    }
}

export default Product;
class Form {
    constructor() {
       this.userName = '', 
       this.cardNumber = 0,
       this.cvv = 0
    }
    
    getFormHtml() {
        return `<div class="modal-wrap">
                    <h2 class="form-title">Enter card detailes</h2>
                    <form id="payment-form">
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter your full name"
                            aria-label="Full name"
                            required>
                        <span class="error userName"></span>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Enter your card number"
                            aria-label="Card number"
                            required>
                        <span class="error cardNumber"></span>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            aria-label="CVV"
                            required>
                        <span class="error cvv"></span>                        
                        <button id="pay" type="submit" class="green">Pay</button>
                    </form>
                 </div>`;
    }
    
    vaildateFormData(paymentFormData) {
        const userName = paymentFormData.get('userName');
        const cardNumber = paymentFormData.get('cardNumber');
        const cvv = paymentFormData.get('cvv');
        
        let result = [];
        
        if (!userName || userName.length < 2) {
            result.push(['userName', 'Full name needs to be longer than 1 symbol']);
        }
        if (!cardNumber
            || cardNumber.split(' ').join('').length !== 16
            || typeof +cardNumber !== 'number') {
                result.push(['cardNumber', '16 digits', typeof +cardNumber, cardNumber.split(' ').join('').length]);
        }
        if (!cvv || cvv.length !== 3 || typeof +cvv !== 'number') {
            result.push(['cvv', '3 digits']);
        }
        if (result.length !== 0 ){
            return result;
        }
        this.setFormData(paymentFormData);
    }
    
    setFormData(paymentFormData) {
        this.userName = paymentFormData.get('userName');
        this.cardNumber = paymentFormData.get('card');
        this.cvv = paymentFormData.get('cvv');        
    }
    
    getThanksText() {
        return `Thanks, ${this.userName}! Your order is on its way!`;
    }
}

export default Form;
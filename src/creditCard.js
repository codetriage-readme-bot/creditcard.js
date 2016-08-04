const CreditCardList = require('./creditCardList');
const Luhn = require('./helpers/luhn');

class CreditCard {
  constructor() {
    this.creditcardlist = new CreditCardList();
    this.luhn = new Luhn();
  }

  retrieveCreditCardList() {
    return this.creditcardlist.retrieveCreditCardList();
  }

  isValid(number) {
    return this.luhn.isValid(number);
  }

  getCreditCardNameByNumber(number) {
    const INVALID_CARD_MESSAGE = 'Credit card is invalid!';
    if (!this.isValid(number))
      return INVALID_CARD_MESSAGE;

    let CREDIT_CARD_LIST = this.retrieveCreditCardList();

    for (let i = 0; i < CREDIT_CARD_LIST.length; i++) {
      let creditcard = CREDIT_CARD_LIST[i];
      let regex = new RegExp(creditcard.regexpFull);

      if (regex.test(number))
        return creditcard.name;
    }

    return INVALID_CARD_MESSAGE;
  }

  isSecurityCodeValid(number, code) {
    let brand = this.getCreditCardNameByNumber(number);
    let numberLength;

    numberLength = (brand === 'Amex') ? 4 : 3;
    let regex = new RegExp(`^[0-9]{${numberLength}}$`);

    return regex.test(code);
  }

  isExpirationDateValid(month, year) {
    let m = month;
    let y = year;

    m = parseInt(m, 10);
    y = parseInt(y, 10);
    
    if (isNaN(m) || isNaN(y))
      return false;

    if (m < 1 || m > 12)
      return false;

    return !(y < 1000 || y >= 3000);
  }
}

module.exports = CreditCard;

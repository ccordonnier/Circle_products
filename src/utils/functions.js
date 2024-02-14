/**
 * Function that return the correct class according to the category name
 * @param {String} category the name of the category
 * @returns {String} the class corresponding to the category
 */
export const setClassFromCategoryName = (category) => {
  switch (category) {
    case "men's clothing":
      return "main__category--mens-clothing"
    case "jewelery": {
      return "main__category--jewelery"
    }
    default:
      return "main__category--unknown"
  }
}

/**
 * Calculate the price with VAT from the original price
 * @param {number} price the original price
 * @param {Number} vat default value is set to 20
 * @return {Number} The price including VAT 
 */
export const priceWithVAT = (price, vat = 20) => {
  return parseFloat(price + (price * vat / 100)).toFixed(2);
}
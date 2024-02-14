import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setClassFromCategoryName, priceWithVAT } from "../utils/functions";
import Title from '../components/title';



const product = () => {
  const params = useParams();

  /*Get the products Details from local storage for two reason: 
  - We don't have to call the API again, and we know data will not change
  - If we change price, the data will be different of the api, and they will be same with the session   
  */
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem("products")).filter(product => product.id == params.id)[0]);
  const [canUpdateProduct, setCanUpdateProduct] = useState(false);
  const [alert, setAlert] = useState({});


  /**
   * 
   * @param {*} element 
   */
  const CheckPrice = (element) => {
    let isValidPrice = element.target.reportValidity();
    setCanUpdateProduct(isValidPrice);
  }

  /**
   * Update the price of the product, send it to the api and register it on the localStorage
   * @param {HTMLElement} element the price input
   */
  const UpdateProductPrice = (element) => {
    let price = element.target.parentElement.querySelector('input[type="text"]').value;
    let lsProducts = JSON.parse(localStorage.getItem("products"));
    let indexOfProduct = lsProducts.findIndex(lsProduct => lsProduct.id == product.id);
    if (indexOfProduct !== -1) {
      let newProduct = { ...product };
      newProduct.price = parseFloat(price);
      try {
        fetch('https://fakestoreapi.com/products/7', {
          method: "PUT",
          body: JSON.stringify(
            newProduct
          )
        })
        .then(res => res.json())
        .then(json => {
          setProduct(newProduct);
          setAlert({ type: "success", message: "product has been successfully modified" });
          lsProducts[indexOfProduct] = newProduct;
          localStorage.setItem('products', JSON.stringify(lsProducts));
          setTimeout(() => { setAlert({}) }, 5000);
          setCanUpdateProduct(false);
        })
      } catch (error) {
        setAlert({ message: "error updating the product : " + error.message, type: "danger" })
      }

    }

  }

  return (
    <div>
      <div className={(Object.keys(alert).length !== 0 ? "main__alert--active " : "") + "main__alert main__alert--" + alert.type}>{alert.message}</div>
      <div className="main__product-title">
        <Title hasBackIcon={true} title={product.title} />
      </div>
      <div className={'main__product-detail main__product-detail--' + localStorage.getItem("device")}>
        <div className='main__product-detail-image'>
          <img src={product.image} alt={product.title} />
        </div>
        <div className="main__product-detail-description-price">
          <div className="main__product-detail-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          <div className="main__product-detail-price">
            <h2>Price</h2>
            <div>
              <div className='main__product-detail-price-input-group'>
                <input type="text" defaultValue={product.price} onChange={(element) => CheckPrice(element)} pattern="[0-9]+(\.?[0-9]{0,2})" />
                <span className="currency">€</span>
              </div>
              <div>
                <span>
                  <b>Price</b> (including VAT): {priceWithVAT(product.price)}€
                </span>
              </div>
            </div>
            <button onClick={UpdateProductPrice} disabled={!canUpdateProduct}>Update product</button>
          </div></div>
        <div className="main__product-detail-category">
          <h2>Category</h2>
          <span className={"main__category " + setClassFromCategoryName(product.category)}>{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default product;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setClassFromCategoryName, priceWithVAT } from '../utils/functions'
import ChevronDown from '../components/icons/chevronDown';
import ChevronUp from '../components/icons/chevronUp';

/**
 * Sort an array of Objects by his property "category"
 * ex: sortProductsByCategory([{id:1, name:"Lucie"}, {id:2, name:"Jhon"}],"name","asc")  return [{id:2, name:"Jhon"},{id:1, name:"Lucie"}]
 * @param {Array} products The array of object you want to sort 
 * @param {String} sortType Can only be "asc" or "desc"
 * @return {Array} return the sorted Array
 */
const sortProductsByCategory=(products, sortType) => {
    if (sortType == "asc") {
      products.sort((a, b) => {
        return b.category.localeCompare(a.category);
      })
    } else {
      products.sort((a, b) => {
        return a.category.localeCompare(b.category);
      })
    }
    return products;
}


const ProductsManagement = () => {
    const [products, setProducts] = useState([]);
    const [sortByCategory,setSortByCategory] = useState("desc")
    const navigate = useNavigate();

    /**
     * Change the sort order when click on category on the table
    */
    const handleClickSortByCategory = () => {
        if(sortByCategory=="asc"){
            setSortByCategory("desc");
        }else{
            setSortByCategory("asc");
        }
        let sortedProduct = sortProductsByCategory(products,sortByCategory)
        setProducts(sortedProduct);
    }

    /**
     *   Getting the products from the API :
     *   If we got results, set the local state products with value
     *   catch and log the error if there is probleme with the API
    */
    useEffect(() => {
        if (localStorage.getItem("products") === null) {
            try {
                fetch('https://fakestoreapi.com/products?limit=7')
                    .then(res => res.json())
                    .then(json => {
                        if (json.length > 0) {
                            localStorage.setItem("products", JSON.stringify(json));
                            setProducts(json);
                        }
                    })
            }
            catch (error) {
                console.error("error trying to fetch products on the fakeStoreApi : " + error);
            }
        } else {
            setProducts(JSON.parse(localStorage.getItem("products")));
        }
    }, [])
    return (
        <>
            <h1>Products management</h1>
            <table className={'main__table-display-data main__table-display-data--'+localStorage.getItem("device")}>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th className='main__table-display-data-thead-category' onClick={handleClickSortByCategory}>Category {sortByCategory=="desc"?<ChevronDown/> : <ChevronUp/>}</th>
                        <th>Price</th>
                        <th>Price <span className='main__info-thead'>(including VAT)</span></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.id} onClick={() => navigate("./" + product.id)}>
                                <td>{product.title}</td>
                                <td><span className={setClassFromCategoryName(product.category) + " main__category"}>{product.category}</span></td>
                                <td>{product.price}€</td>
                                <td>{priceWithVAT(product.price)}€</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ProductsManagement;
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({ 
	cartReducer,
	productsReducer 
});

export default rootReducer;

export const getCartState = (state) => {
	const { products } = state.productsReducer;
	const { addedIds, quantityById } = state.cartReducer;

	let total = 0;

	const cartItems = addedIds.map(id => {
		const product = products[id];
		const quantity = quantityById[id];
		const subTotal = Number(product.price) * quantity;
		total = total + subTotal;
		return { product, quantity, subTotal, productIndex: id };
	});

	return { cartItems, total }
}

export const getCartQty = (state) => {
	const { quantityById, addedIds } = state.cartReducer;
	return addedIds.reduce((total, id) => {
  		return total + quantityById[id];
	}, 0);
};

export const findProduct = (id, products) => {
	let product = {};
	if (products) {
		product = products.find((product, index) => {  
		  return (index === id);
		});
	}
	return product;
}
        

import CartMongoDB from "../daos/mongoseDb/DB/carts.mongose.js";
const cartDao = new CartMongoDB();

// import { CartManager } from "../daos/fileSystem/manager/cartManager.js";
// import { __dirname } from "../utils.js"
// const cartDao = new CartManager(__dirname + '/daos/fileSystem/data/carts.json');

export const createCart = async () => {
    try {
        return await cartDao.createCart();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addToCart = async (cartId, productId) => {
    try {
        return await cartDao.addToCart(cartId, productId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCart = async () => {
    try {
        return await cartDao.getCart();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCartById = async (cartId) => {
    try {
        return await cartDao.getCartById(cartId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (cartId, productId) => {
    try {
        return await cartDao.deleteProduct(cartId, productId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCart = async (cartId) => {
    try {
        return await cartDao.deleteCart(cartId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const clearCart = async () => {
    try {
        return await cartDao.clearCart();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
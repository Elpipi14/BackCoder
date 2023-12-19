import * as cartService from "../service/cart.service.js";

export const createCart = async (req, res, next) => {
    try {
        const cart = await cartService.createCart();
        res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { cId, pId } = req.params;
        const cart = await cartService.addToCart(cId, pId);
        res.status(200).json(cart);
    } catch (error) {
        if (error.message === "Product not found" || error.message === "Cart not found") {
            res.status(404).json({ msg: error.message });
        } else {
            next(error.message);
        }
    }
};

export const getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart();
        res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { cId } = req.params;
        const cart = await cartService.getCartById(cId);
        res.status(200).json(cart);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { cId, pId } = req.params;
        const cart = await cartService.deleteProduct(cId, pId);
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        next(error.message);
    }
};

export const deleteCart = async (req, res, next) => {
    try {
        const { cId } = req.params;
        await cartService.deleteCart(cId);
        res.status(200).json({ msg: "Cart deleted" });
    } catch (error) {
        next(error.message);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        await cartService.clearCart();
        res.status(200).json({ msg: "Cart cleared" });
    } catch (error) {
        next(error.message);
    }
};
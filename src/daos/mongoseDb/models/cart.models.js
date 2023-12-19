// models/cart.models.js
import { Schema, model } from "mongoose";

export const cartsCollection = "carts";

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: Number
    }],
});

export const CartModel = model(cartsCollection, cartSchema);


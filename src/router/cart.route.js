// routes/cart.routes.js
import { Router } from "express";
import * as cartController from "../controllers/cart.contollers.js";

const routerCart = Router();

// Crear un carrito
routerCart.post("/", cartController.createCart);

// Agregar a carrito por ID de producto (auto genera ID de carrito)
routerCart.post("/:cId/products/:pId", cartController.addToCart);

// Obtener carrito completo
routerCart.get("/", cartController.getCart);

// Buscar carrito por ID
routerCart.get("/:cId", cartController.getCartById);

// Eliminar producto individual por ID de carrito y producto
routerCart.delete("/:cId/products/:pId", cartController.deleteProduct); //_id producto del carrito

// Eliminar carrito por ID
routerCart.delete("/:cId", cartController.deleteCart);

// Vaciar carrito
routerCart.delete("/", cartController.clearCart);

export default routerCart;
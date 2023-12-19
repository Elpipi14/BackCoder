import { Router } from "express";
import * as controller from "../controllers/products.controllers.js";

const routerMongo = Router();

routerMongo.get("/", controller.getAll); //muestra los productos
//http://localhost:8080/api/products?page=1
//http://localhost:8080/api/products?limit=20&sortOrder=asc
//Orden ascendente: http://localhost:8080/api/products?page=2&sortOrder=asc
//Orden descendente: http://localhost:8080/api/products?page=2&sortOrder=desc
//orden descedentre mas category http://localhost:8080/api/products?limit=10&category=2022&sortOrder=desc

routerMongo.get('/aggregation1', controller.aggregation1);

routerMongo.get("/:id", controller.getById); //busca por _id

routerMongo.post("/", controller.createProduct); //crea el producto

routerMongo.put("/:id", controller.updateProduct); //actualiza el producto

routerMongo.delete("/:id", controller.deleteProduct); //elimina el producto

export default routerMongo;
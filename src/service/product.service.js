import ProductMongoDB from "../daos/mongoseDb/DB/products.mongose.js";
const prodDao = new ProductMongoDB();

// import { ProductManager } from "../daos/fileSystem/manager/productsManager.js";
// import { __dirname } from "../utils.js"
// const prodDao = new ProductManager(__dirname + '/daos/fileSystem/data/products.json');

export const getAll = async (page, limit, category, sortOrder) => {
  try {
    return await prodDao.getAll(page, limit, category, sortOrder);
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (obj) => {
  try {
    const newProd = await prodDao.createProduct(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (obj, id) => {
  try {
    const prodUpd = await prodDao.updateProduct(obj, id);
    if (!prodUpd) return false;
    else return prodUpd;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    if (!prodDel) return false;
    else return prodDel;
  } catch (error) {
    console.log(error);
  }
};

export const aggregation1 = async (category) => {
  try {
    const response = await prodDao.aggregation1(category);
    return response;
  } catch (error) {
    console.log(error);
  }
};

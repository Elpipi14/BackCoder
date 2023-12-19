import fs from "fs";

export class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async createProduct(obj) {
        try {
            const product = {
                id: (await this.getProductById()) + 1, ...obj,
                status: true,
                ...obj
            };
            const products = await this.getAll();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    async getProductById() {
        let maxId = 0;
        const products = await this.getAll();
        products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            const product = products.find((product) => product.id == id)
            if (product) {
                return product;
            };
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(updatedProduct, id) {
        try {
            const products = await this.getAll();
            const index = products.findIndex(product => product.id == id);
            if (index === -1) return false;
            for (const prop in updatedProduct) {
                if (updatedProduct.hasOwnProperty(prop)) {
                    products[index][prop] = updatedProduct[prop];
                }
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getAll();
            const index = products.findIndex(product => product.id == id);

            if (index === -1) {
                console.log("Producto no encontrado");
                return false;
            }

            const newArray = products.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};


// Esta función obtiene los productos desde el archivo JSON creado con la logica socket..para mostrarse en home
// usando solo handlebars.. se Exporta para usarlo en la carpeta view.router.js para tener la buena practica del orden..
// ^^
export const getProducts = () => {
    try {
        const productsData = JSON.parse(fs.readFileSync("./src/daos/fileSystem/data/products.json", "utf8"));
        return productsData;
    } catch (error) {
        console.error("Error al leer el archivo de productos:", error);
        return [];
    }
};

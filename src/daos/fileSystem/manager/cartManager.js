import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            let carts;
            try {
                carts = await this.getCart();
            } catch (error) {
                carts = [];
            }
    
            const newCartId = (await this.getCart()).length + 1;
            const newCart = { id: newCartId, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Unable to create cart");
        }
    }

    async getAllProducts() {
        try {
            if (fs.existsSync("./src/daos/fileSystem/data/products.json")) {
                const productsJSON = await fs.promises.readFile("./src/daos/fileSystem/data/products.json", 'utf-8');
                return JSON.parse(productsJSON);
            } else {
                console.log("Products file not found.");
                return [];
            }
        } catch (error) {
            console.log("Error reading products:", error);
            return [];
        }
    }
    

    async addToCart(cartId, productId) {
        try {
            const allProducts = await this.getAllProducts();
    
            const carts = await this.getCart();
            let cart = carts.find(c => c.id == cartId);

            const product = allProducts.find(p => p.id === Number(productId));

            const existingProduct = cart.products.find(p => p.id == productId);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const newProduct = {
                    id: productId,
                    quantity: 1,
                    title: product.title,
                    price: product.price
                };
                cart.products.push(newProduct);
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    
            return cart;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async getCart() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(cartsJSON);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getCartById(cartId) {
        try {
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id == cartId);  
            return cart || null;
        } catch (error) {
            console.log('Error in getCartById:', error);
            return null;
        }
    }
    
    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getCart();
            let cart = carts.find(c => c.id == cartId);
    
            if (!cart) {
                console.log(`Cart with ID ${cartId} not found.`);
                return false;
            }

            const productIndex = cart.products.findIndex(p => p.id == productId);
    
            if (productIndex === -1) {
                console.log(`Product with ID ${productId} not found in cart.`);
                return false;
            }
    
            cart.products.splice(productIndex, 1);
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    
            return cart;
        } catch (error) {
            console.error(`Error deleting product ${productId} from cart ${cartId}: ${error}`);
            return false;
        }
    }

    async deleteCart(cartId) {
        try {
            const carts = await this.getCart();
            const updatedCarts = carts.filter(cart => cart.id != cartId);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, 2));
            console.log(`Cart with ID ${cartId} deleted successfully.`);
            return true;
        } catch (error) {
            console.error(`Error deleting cart with ID ${cartId}: ${error}`);
            return false;
        }
    }

    async clearCart() {
        try {
            const updatedCarts = [];
            await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, 2));
            console.log("Cart cleared successfully.");
            return true;
        } catch (error) {
            console.error("Error clearing the cart:", error);
            return false;
        }
    }
}
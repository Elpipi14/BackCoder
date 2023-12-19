const socketClient = io();

socketClient.on('saludo desde back', (msg) => {
    console.log(msg);
});


const form = document.getElementById('form');

const inputId = document.getElementById('id');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputImage = document.getElementById('image');
const inputCategory = document.getElementById('category');

const listenProducts = document.getElementById('Products');

form.onsubmit = (e) => {
    e.preventDefault()
    const id = inputId.value;
    const title = inputTitle.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const image = inputImage.value;
    const category = inputCategory.value;
    const product = { id, title, price, stock, image, category };
    socketClient.emit('newProducts', product);
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const productId = event.target.getAttribute('id');
        socketClient.emit('deleteProduct', productId);
    }
});


socketClient.on('arrayProducts', (productsArrays) => {
    let infoProducts = ``;
    productsArrays.forEach(e => {
        infoProducts +=
            ` 
            <div class="card" style="width: 18rem;">
                <img src="${e.image}" class="mx-auto img-thumbnail img" alt="${e.title}">
                <div class="card_info card-body">
                    <h2 class="card-text">${e.title}</h2>
                    <p class="card-text">ID: ${e.id}</p>
                    <p class="card-text">Price: ${e.price}</p>
                    <p class="card-text">Stocks: ${e.stock}</p>
                    <p class="card-text">Category: ${e.category}</p>
                </div>
                <div class="delete">
                    <button class="btn cart px-auto delete" id="${e.id}">Delete</button>
                </div>
            </div>
           
            `
    });
    products.innerHTML = infoProducts;
});









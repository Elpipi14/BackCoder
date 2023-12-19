document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            // Obtener el identificador único del producto desde el botón
            const productId = event.target.getAttribute("data-product-id");

            try {
                // Enviar una solicitud POST al servidor para agregar el producto al carrito
                const response = await fetch(`/carts/add/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Manejar la respuesta del servidor
                const responseData = await response.json();
                console.log("Server Response:", responseData);

                if (response.ok) {
                    alert("Product added to cart!");
                } else {
                    alert("Error adding product to cart.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error adding product to cart.");
            }
        });
    });
});

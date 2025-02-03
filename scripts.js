// Almacenamos el precio por kg de cada producto
const productPrices = {
	product1: 1500,
	product2: 1800,
	product3: 1600,
	product4: 1500,
	product5: 2000
};

// Función para actualizar la cantidad
function updateQuantity(productId, change) {
	const quantityElement = document.getElementById(`quantity-${productId}`);
	let quantity = parseInt(quantityElement.innerText);
	quantity += change;
	if (quantity < 1) quantity = 1;
	quantityElement.innerText = quantity;
	updateTotalPrice(productId, quantity);
}

// Función para actualizar el precio total
function updateTotalPrice(productId, quantity) {
	const priceElement = document.getElementById(`total-price-${productId}`);
	const unitPrice = productPrices[productId];
	const totalPrice = unitPrice * quantity;
	priceElement.innerText = `$${totalPrice.toFixed(2)}`;

	const shippingInfoElement = document.getElementById(`shipping-info-${productId}`);
	shippingInfoElement.innerText = quantity >= 3 ? "¡Envío gratis a tu domicilio!" : "";
}

// Función para enviar pedido a WhatsApp
function sendToWhatsApp(productId) {
	const quantity = document.getElementById(`quantity-${productId}`).innerText;
	const unitPrice = productPrices[productId];
	const totalPrice = unitPrice * quantity;
	const productName = document.querySelector(`[data-id="${productId}"] h3`).innerText;
	const message = `Hola, quiero comprar ${quantity}kg de ${productName}. Total: $${totalPrice}`;
	const phone = "5491122334455"; // Número de WhatsApp de la tienda
	const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
	window.open(url, "_blank");
}

// Agregar eventos a los botones
document.querySelectorAll(".btn-increment").forEach(button => {
	button.addEventListener("click", () => updateQuantity(button.getAttribute("data-id"), 1));
});

document.querySelectorAll(".btn-decrement").forEach(button => {
	button.addEventListener("click", () => updateQuantity(button.getAttribute("data-id"), -1));
});

document.querySelectorAll(".btn-whatsapp").forEach(button => {
	button.addEventListener("click", () => sendToWhatsApp(button.getAttribute("data-id")));
});

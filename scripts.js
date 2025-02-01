// Almacenamos el precio por kg de cada producto
const productPrices = {
	product1: 1500, // Precio por kg del producto 1
	product6: 1600, // Precio por kg del producto 6
	// Puedes agregar más productos con su precio por kg aquí
};

// Función para actualizar la cantidad
function updateQuantity(productId, change) {
	const quantityElement = document.getElementById("quantity-" + productId);
	let quantity = parseInt(quantityElement.innerText);
	quantity += change;
	if (quantity < 1) quantity = 1; // No permitir cantidad menor que 1
	quantityElement.innerText = quantity;
	updateTotalPrice(productId, quantity);
}

// Función para actualizar el precio total
function updateTotalPrice(productId, quantity) {
	const priceElement = document.querySelector("#total-price-" + productId);

	// Obtenemos el precio por kg de la variable `productPrices`
	const unitPrice = productPrices[productId];
	const totalPrice = unitPrice * quantity;

	priceElement.innerText = "$" + totalPrice.toFixed(2); // Redondear a dos decimales

	// Mostrar el mensaje de "Envío gratis" si la cantidad es 3 o más
	const shippingInfoElement = document.getElementById(
		"shipping-info-" + productId
	);
	if (quantity >= 3) {
		shippingInfoElement.innerText = "¡Envío gratis a tu domicilio!";
	} else {
		shippingInfoElement.innerText = ""; // Eliminar el mensaje si no cumple la condición
	}
}

// Función para enviar pedido a WhatsApp
function sendToWhatsApp(productId, productName, unitPrice) {
	const quantity = parseInt(
		document.getElementById("quantity-" + productId).innerText
	);
	const totalPrice = unitPrice * quantity;
	const message = `¡Hola! Quiero pedir ${quantity} kg de ${productName}. Total: $${totalPrice}.`;
	const phoneNumber = "+5493456543505"; // Reemplazar con el número de WhatsApp del negocio
	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message
	)}`;
	window.open(whatsappUrl, "_blank");
}

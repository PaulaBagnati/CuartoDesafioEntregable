const socket = io();

// if (document.getElementById("AgregarProducto")) {
//   document
//     .getElementById("AgregarProducto")
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       AgregarProducto();
//     });

//   document.querySelectorAll(".delete").forEach((el) => {
//     el.addEventListener("click", (e) => {
//       const id = e.target.getAttribute("id");
//       socket.emit("deleteFromProducts", id);
//     });
//   });
// }

// function AgregarProducto() {
//   let title = document.getElementById("nombre").value;
//   let descripcion = document.getElementById("description").value;
//   let precio = document.getElementById("price").value;
//   let stock = document.getElementById("stock").value;
//   let keywords = document.getElementById("keywords").value.split(",");

//   let product = {
//     title: title,
//     description: descripcion,
//     price: precio,
//     stock: stock,
//     keywords: keywords,
//   };

//   socket.emit("addToProducts", product);
// }

// function limpiar() {
//   document.getElementById("nombre").value = "";
//   document.getElementById("description").value = "";
//   document.getElementById("price").value = "";
//   document.getElementById("stock").value = "";
//   document.getElementById("keywords").value = "";
// }

// CREACION del producto a treves de la peticion POST
socket.on("addProduct", (product) => {
  console.log(`El producto ${product.title} ha sido eliminado`);
});

// ELIMINACION del producto a treves de la peticion DELETE
socket.on("deleteProduct", (id) => {
  console.log(`El producto con id ${id} ha sido eliminado`);
});

// socket.on("viewProducts", async (products) => {
//   let productos = "";
//   for (i = 0; i <= products.length - 1; i++) {
//     productos =
//       productos +
//       "<div>" +
//       '<div class="uk-card uk-card-default">' +
//       `<span id=${products[i].id} class="delete">x</span>` +
//       '<div class="uk-card-media-top">' +
//       '<img alt="foto producto" />' +
//       "</div>" +
//       '<div class="uk-card-body">' +
//       `<h3 class="uk-card-title">${products[i].title}</h3>` +
//       `<h5>USD ${products[i].price}</h5>` +
//       `<span class="uk-badge">${products[i].keywords}</span>` +
//       `<p>${products[i].description}</p>` +
//       '<button class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>' +
//       "</div>" +
//       "</div>" +
//       "</div>";
//   }
//   document.getElementById("products").innerHTML = productos;
// });

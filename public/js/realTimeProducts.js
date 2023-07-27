const socket = io();

document
  .getElementById("AgregarProducto")
  .addEventListener("click", AgregarProducto());

// CREACION del producto a treves de la peticion POST
function AgregarProducto() {
  let title = document.getElementById("nombre");
  let descripcion = document.getElementById("description");
  let precio = document.getElementById("price");
  let stock = document.getElementById("stock");
  let keywords = document.getElementById("keywords").value.split(",");

  let product = {
    title: title,
    description: descripcion,
    price: precio,
    stock: stock,
    keywords: keywords,
  };

  socket.emit("addToProducts", product);
}

// ELIMINACION del producto a treves de la peticion DELETE
function EliminarProducto() {
  // socket.on('deleteProduct', (pid) => {
  //     const p = pid.toString()
  //     const div = d.getElementById(p)
  //     listProducts.removeChild(div)
  // })
}

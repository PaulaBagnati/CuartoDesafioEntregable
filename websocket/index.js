const ProductManager = require("../managers/ProductManager.js");
const productManager = new ProductManager("products.json");

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("addToProducts", async (product) => {
    await productManager.create(product);
    const products = await productManager.getAll();

    socket.emit("viewProducts", products);
  });

  socket.on("deleteFromProducts", async (productId) => {
    await productManager.delete(productId);
    const products = await productManager.getAll();

    socket.emit("viewProducts", products);
  });
}

module.exports = socketManager;

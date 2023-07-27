const { Router } = require("express");
const path = require("path");
const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager("products.json");

const router = Router();

//rutas de home (siempre que servimos archivos estaticos se usa GET)

//HOME
router.get("/", async (req, res) => {
  //res.sendFile(path.join(__dirname, "../public/index.html"));
  const productos = await productManager.getAll();

  res.render("home", {
    title: "Home",
    productos,
  });
});

//REAL TIME PRODUCTS
router.get("/realtimeproducts", async (req, res) => {
  const productos = await productManager.getAll();

  res.render("realtimeproducts", {
    title: "Products in Real Time",
    productos,
  });
});

//CARRITO
router.get("/carrito", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/carrito.html"));
});

module.exports = router;

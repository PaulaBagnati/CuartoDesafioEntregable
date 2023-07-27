const { Router } = require("express");
const path = require("path");

const ProductsRouter = require("./api/product.router");
const CartsRouter = require("./api/cart.router");
const HomeRouter = require("./home.router");

// /api
const router = Router();

// rutas de productos
router.use("/productos", ProductsRouter);
// rutas de carritos
router.use("/carts", CartsRouter);
//rutas estaticas

module.exports = {
  api: router,
  home: HomeRouter,
};

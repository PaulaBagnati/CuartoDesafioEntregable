const ProductManager = require("../../managers/ProductManager");

const productManager = new ProductManager("products.json");

const { Router } = require("express");
const router = Router();

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getById(id);

  if (!product) {
    res.sendStatus(404);
    return;
  }

  res.send(product);
});

// /api/products/
router.get("/", async (req, res) => {
  const { search, max, min, limit } = req.query;

  const products = await productManager.getAll();

  let filtrados = products;

  if (search) {
    /// filtrar
    filtrados = filtrados.filter(
      (p) =>
        p.keywords.includes(search.toLowerCase()) ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (min || max) {
    filtrados = filtrados.filter(
      (p) => p.price >= (+min || 0) && p.price <= (+max || Infinity)
    );
  }

  res.send(filtrados);
});

// /api/productos/
router.post("/", async (req, res) => {
  const body = req.query;

  const products = await productManager.getAll();

  const newId = products[products.length - 1]?.id + 1 || 0;

  if (
    !body.title ||
    !body.description ||
    !body.price ||
    !body.stock ||
    !body.keywords
  ) {
    res.status(400).send("Todos los campos son obligatorios");
  } else if (products.find((prod) => prod.title == body.title)) {
    res.status(400).send("Este producto ya se encuentra en el archivo");
  } else {
    req.io.emit("addProduct", body, (id = newId));
    //await productManager.addProduct(body, id = newId + 1)
    const product = await productManager.create(body);
    res.status(201).send(`El Producto ${product.title} fue creado con éxito`);
  }
});

// /api/productos/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    if (!(await productManager.getById(id))) {
      res.sendStatus(404);
      return;
    }

    await productManager.save(id, body);
    res.sendStatus(202);
  } catch (e) {
    res.status(500).send({
      message: "Ha ocurrido un error en el servidor",
      exception: e.stack,
    });
  }
});

// /api/productos/:id
router.delete("/:id", async (req, res) => {
  const id = req.query.id;

  req.io.emit("deleteProduct", id);

  if (!(await productManager.getById(id))) {
    res
      .status(404)
      .send(`El producto con id: ${id} no se encuentra en el archivo.`);
    return;
  }

  await productManager.delete(id);

  res.status(200).send(`El producto con id: ${id} ha sido eliminado.`);
});

module.exports = router;

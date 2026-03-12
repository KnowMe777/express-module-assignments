import express from "express";

// dummy data for products
let products = [
  {
    id: 1,
    name: "AeroSound Bluetooth Headphones",
    category: "Electronics",
    price: 89,
  },
  {
    id: 2,
    name: "SmartView 4K Monitor",
    category: "Electronics",
    price: 249,
  },
  {
    id: 3,
    name: "QuantumPhone XR",
    category: "Electronics",
    price: 699,
  },
  {
    id: 4,
    name: "Pulse Fitness Tracker",
    category: "Electronics",
    price: 129,
  },
  {
    id: 5,
    name: "HomeBrew Coffee Maker",
    category: "Kitchen",
    price: 79,
  },
  {
    id: 6,
    name: "Maple Hardcover Journal",
    category: "Books",
    price: 14,
  },
  {
    id: 7,
    name: "Nordic Ceramic Vase",
    category: "Home",
    price: 32,
  },
  {
    id: 8,
    name: "Racer-X Remote Control Car",
    category: "Toys",
    price: 49,
  },
  {
    id: 9,
    name: "USB-C Fast Charger",
    category: "Electronics",
    price: 24,
  },
  {
    id: 10,
    name: "NoiseCancel Over-Ear Headset",
    category: "Electronics",
    price: 159,
  },
];

const router = express.Router();

// get all products, get filtered products, get sorted products
router.get("/", (req, res) => {
  let result = products;

  if (req.query.category) {
    const category = req.query.category.toString().toLowerCase();
    result = result.filter((p) => p.category.toLowerCase() === category);
  }

  if (req.query.sort === "price") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  return res.send(result);
});

// get product by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => id === p.id);
  return res.json(product);
});

// post a new product
router.post("/", (req, res) => {
  const { name, category, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
  };

  products.push(newProduct);

  return res.json({
    message: "New product added successsfully",
    data: newProduct,
  });
});

// update a product
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => id === p.id);
  const { name, category, price } = req.body;

  product.name = name;
  product.category = category;
  product.price = price;

  return res.json({
    message: `Product with id ${id} updated successsfully`,
    data: product,
  });
});

// delete a product
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  products = products.filter((p) => id !== p.id);

  return res.json({
    message: `Product with id ${id} deleted successfully`,
    data: products,
  });
});

export default router;

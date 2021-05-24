const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("helooos");
});

app.get("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    res.send(productsArr);
  });
});

app.get("/products/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    const product = productsArr.find(
      (product) => product.id === +req.params.id
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      res.send();
    }
  });
});

app.listen(3434);

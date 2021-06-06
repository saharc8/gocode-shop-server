const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const mongoose = require("mongoose");

app.get("/products", (req, res) => {
  const { category } = req.query;
  let { min } = req.query;
  let { max } = req.query;
  let categoryFilteredProductsArr;
  let minMaxFilteredProductsArr;
  Product.find()
    .exec()
    .then((productsArr) => {
      if (category) {
        categoryFilteredProductsArr = productsArr.filter((product) =>
          product.category.includes(category)
        );
      }
      if (min && max) {
        min = parseInt(min);
        max = parseInt(max);
        if (categoryFilteredProductsArr) {
          minMaxFilteredProductsArr = categoryFilteredProductsArr.filter(
            (product) => product.price > min && product.price < max
          );
        } else {
          minMaxFilteredProductsArr = productsArr.filter(
            (product) => product.price > min && product.price < max
          );
        }
      }
      if (minMaxFilteredProductsArr) {
        res.send(minMaxFilteredProductsArr);
      } else {
        if (categoryFilteredProductsArr) {
          res.send(categoryFilteredProductsArr);
        } else {
          res.send(productsArr);
        }
      }
    });
});

app.get("/products/:id", (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        res.status(404);
        res.send();
      }
    });
});

app.post("/products", (req, res) => {
  console.log(req.body);
  const { title, price, description, category, image } = req.body;
  Product.insertMany([
    {
      title,
      price,
      description,
      category,
      image,
    },
  ]).then(() => {
    res.send("success");
  });
});

app.put("/products/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  Product.findOneAndUpdate(
    { _id: id },
    {
      title,
      price,
      description,
      category,
      image,
      s,
    }
  ).then(() => {
    res.send("success");
  });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  Product.findOneAndDelete({ _id: id }).then(() => {
    res.send("success");
  });
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// const product1 = {
//   title: "Mens Cotton Jacket",
//   price: 55.99,
//   description: "great outerwear jackets for Spring/Autumn/Winter",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
// };

// const product2 = {
//   title: "Mens Cotton Jacket",
//   price: 55.99,
//   description: "great outerwear jackets for Spring/Autumn/Winter",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
// };

mongoose
  .connect("mongodb://localhost:27017/products", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
    app.listen(6052);
  });

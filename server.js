require("dotenv").config();

const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.static("client/build"));

app.get("/api/products", (req, res) => {
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

app.get("/api/products/:id", (req, res) => {
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

app.post("/api/products", (req, res) => {
  console.log(req.body);
  const { title, description, category, price, image } = req.body;
  Product.insertMany([
    {
      title: title || "",
      description: description || "",
      category: category || "",
      price: price || "",
      image: image || "",
    },
  ]).then(() => {
    res.send("success");
  });
});

app.put("/api/products/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  Product.findOneAndUpdate(
    { _id: id },
    {
      title: title || "",
      price: price || "",
      description: description || "",
      category: category || "",
      image: image || "",
    }
  ).then(() => {
    res.send("success");
  });
});

app.delete("/api/products/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  Product.findOneAndDelete({ _id: id }).then(() => {
    res.send("success");
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    const port = process.env.PORT || 6052;
    app.listen(port);
    console.log(`Listening on ${port}`);
  });

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

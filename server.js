const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// app.get("/products", (req, res) => {
//   fs.readFile("products.json", "utf8", (err, products) => {
//     const productsArr = JSON.parse(products);
//     res.send(productsArr);
//   });
// });

app.get("/products", (req, res) => {
  const { category } = req.query;
  let { min } = req.query;
  let { max } = req.query;
  let categoryFilteredProductsArr;
  let minMaxFilteredProductsArr;
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
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

app.post("/products", (req, res) => {
  console.log(req.body);
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    productsArr.push({
      id: productsArr.length + 1,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    });
    fs.writeFile("products.json", JSON.stringify(productsArr), (err) => {
      console.log(err);
      res.send("success");
    });
  });
});

app.put("/products/:id", (req, res) => {
  console.log(req.body);
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;
    const updatedProductsArr = productsArr.map((product) => {
      if (product.id === +id) {
        return { ...product, title, price, description, category, image };
      } else {
        return product;
      }
    });
    fs.writeFile("products.json", JSON.stringify(updatedProductsArr), (err) => {
      console.log(err);
      res.send("success");
    });
  });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.body);
  fs.readFile("products.json", "utf8", (err, products) => {
    const productsArr = JSON.parse(products);
    const { id } = req.params;
    const updatedProductsArr = productsArr.filter(
      (product) => product.id !== +id
    );
    fs.writeFile("products.json", JSON.stringify(updatedProductsArr), (err) => {
      console.log(err);
      res.send("success");
    });
  });
});

app.listen(6052);

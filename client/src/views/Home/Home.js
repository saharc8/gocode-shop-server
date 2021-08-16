import Nav from "../../components/Nav/Nav";
import Products from "../../components/Products/Products";
import Loading from "../../components/Loading/Loading";
import Cart from "../../components/Cart/Cart";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsHandler from "../../contexts/ProductsHandler";
import Countdown from "../../components/Countdown/Countdown";
import Button from "@material-ui/core/Button";

function Home({ startSale, percent }) {
  const [products, setProducts] = useState([]);
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [minMax, setMinMax] = useState([]);
  const [range, setRange] = useState([]);

  useEffect(() => {
    setLoading(true);
    //fetch("https://fakestoreapi.com/products")
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        chkIfSale(data);
        // findMinMax(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    findMinMax(products);
  }, [products]);

  function chkIfSale(products) {
    setProducts(
      products.map((product) => {
        if (startSale) {
          return {
            ...product,
            salePrice: product.price - product.price * (percent / 100),
          };
        } else {
          return product;
        }
      })
    );
  }

  function findMinMax(products) {
    let min = 99999999;
    let max = 0;
    if (!startSale) {
      for (let product of products) {
        if (product.price < min) {
          min = product.price;
        }
        if (product.price > max) {
          max = product.price;
        }
      }
    } else {
      for (let product of products) {
        if (product.salePrice < min) {
          min = product.salePrice;
        }
        if (product.salePrice > max) {
          max = product.salePrice;
        }
      }
    }
    min = min.toFixed(2);
    max = max.toFixed(2);
    min = parseFloat(min);
    max = parseFloat(max);
    setMinMax([min, max]);
    setRange([min, max]);
  }

  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});

  const categories = Object.keys(groupBy(products, "category"));

  const [category, setCategory] = useState("all categories");

  function filterByCategory(category) {
    setCategory(category);
  }

  function filterByRange(range) {
    setRange(range);
  }

  function addToCart(id) {
    const product = products.find((product) => product._id === id);
    const productExist = boughtProducts.findIndex((i) => i._id === product._id);
    if (productExist !== -1) {
      setBoughtProducts(
        boughtProducts.map((product) => {
          if (product._id === id) {
            return { ...product, amount: product.amount + 1 };
          } else {
            return product;
          }
        })
      );
    } else {
      setBoughtProducts([...boughtProducts, { ...product, amount: 1 }]);
    }
    startSale
      ? setTotalPrice(totalPrice + product.salePrice)
      : setTotalPrice(totalPrice + product.price);
  }

  function removeFromCart(id) {
    const product = products.find((product) => product._id === id);
    const productExist = boughtProducts.findIndex((i) => i._id === product._id);
    if (boughtProducts[productExist].amount > 1) {
      setBoughtProducts(
        boughtProducts.map((product) => {
          if (product._id === id) {
            return { ...product, amount: product.amount - 1 };
          } else {
            return product;
          }
        })
      );
    } else {
      setBoughtProducts(
        boughtProducts.filter((product) => {
          if (product._id !== id) {
            return product;
          }
        })
      );
    }
    startSale
      ? setTotalPrice(totalPrice - product.salePrice)
      : setTotalPrice(totalPrice - product.price);
  }

  return (
    <>
      <ProductsHandler.Provider value={{ boughtProducts, minMax }}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Link to={"/admin"}>
              <Button
                className="admin-btn"
                variant="contained"
                color="secondary"
              >
                admin
              </Button>
            </Link>
            <Nav
              categories={categories}
              filterByCategory={filterByCategory}
              filterByRange={filterByRange}
            />
            <Products
              products={products.filter((product) => {
                //if (product.price >= range[0] && product.price <= range[1]) {
                if (!startSale) {
                  return (
                    (product.category === category ||
                      category === "all categories") &&
                    product.price >= range[0] &&
                    product.price <= range[1]
                  );
                } else {
                  return (
                    (product.category === category ||
                      category === "all categories") &&
                    product.salePrice >= range[0] &&
                    product.salePrice <= range[1]
                  );
                }
                //} else return <h1>no results</h1>;
              })}
              addToCart={addToCart}
              startSale={startSale}
            />
            <Cart
              totalPrice={totalPrice}
              removeFromCart={removeFromCart}
              startSale={startSale}
            />
            {startSale && <Countdown />}
          </div>
        )}
      </ProductsHandler.Provider>
    </>
  );
}

export default Home;

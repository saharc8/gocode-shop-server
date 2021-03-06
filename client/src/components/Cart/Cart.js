import { useContext, useState, useEffect } from "react";
import ProductsHandler from "../../contexts/ProductsHandler";
import ProductCart from "../ProductCart/ProductCart";
import { Link } from "react-router-dom";

function Cart() {
  const { boughtProducts, totalPrice, removeFromCart, startSale } =
    useContext(ProductsHandler);
  const [showPayBtn, setShowPayBtn] = useState(false);

  useEffect(() => {
    boughtProducts.length > 0 ? setShowPayBtn(true) : setShowPayBtn(false);
  }, [boughtProducts]);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2>Total Price: {Math.abs(totalPrice.toFixed(2))}$</h2>
      <br />
      {showPayBtn && (
        <Link className="pay-btn" to="/checkout">
          PAY NOW
        </Link>
      )}
      <br />
      <br />
      <section className="boughtProducts">
        {boughtProducts.map((product) => (
          <ProductCart
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            salePrice={product.salePrice}
            description={product.description}
            category={product.category}
            image={product.image}
            amount={product.amount}
            removeFromCart={removeFromCart}
            startSale={startSale}
          />
        ))}
      </section>
    </div>
  );
}

export default Cart;

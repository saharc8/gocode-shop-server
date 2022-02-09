import { useContext } from "react";
import ProductsHandler from "../../contexts/ProductsHandler";
import ProductCart from "../ProductCart/ProductCart";

const Checkout = () => {
  const { boughtProducts, totalPrice, removeFromCart, startSale } =
    useContext(ProductsHandler);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2>Total Price: {totalPrice.toFixed(2)}$</h2>
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
};

export default Checkout;

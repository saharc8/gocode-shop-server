import Product from "../Product/Product";

const Products = ({ products, addToCart, startSale }) => {
  return (
    <section className="products">
      {products.map((product) => (
        <Product
          key={product._id}
          id={product._id}
          title={product.title}
          price={product.price}
          salePrice={product.salePrice}
          description={product.description}
          category={product.category}
          image={product.image}
          addToCart={addToCart}
          startSale={startSale}
        />
      ))}
    </section>
  );
};

export default Products;

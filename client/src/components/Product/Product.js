import { Link } from "react-router-dom";

const Product = ({
  id,
  title,
  price,
  salePrice,
  image,
  addToCart,
  startSale,
}) => {
  if (!startSale) {
    return (
      <div className="product-card">
        <div className="product-image">
          <img src={image} alt="pic" />
        </div>
        <div className="product-info">
          <Link to={`/products/${id}`}>
            <h5>{title}</h5>
          </Link>
          <br></br>
          <h6>{price.toFixed(2)}$</h6>
          <br></br>
          <button className="plus-button" onClick={() => addToCart(id)}>
            Add To Cart +
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-card">
        <div className="product-image">
          <img src={image} alt="pic" />
        </div>
        <div className="product-info">
          <Link to={`/products/${id}`}>
            <h5>{title}</h5>
          </Link>
          <br></br>
          <h6 className="active">{price.toFixed(2)}$</h6>
          <h6>{salePrice.toFixed(2)}$</h6>
          <br></br>
          <button className="plus-button" onClick={() => addToCart(id)}>
            Add To Cart +
          </button>
        </div>
      </div>
    );
  }
};

export default Product;

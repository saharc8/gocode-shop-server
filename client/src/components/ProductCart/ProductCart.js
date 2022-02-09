const ProductCart = ({
  id,
  title,
  price,
  salePrice,
  image,
  amount,
  removeFromCart,
  startSale,
}) => {
  if (!startSale) {
    return (
      <div className="product-card-c">
        <div className="product-image-c">
          <img src={image} alt="pic" />
        </div>
        <div className="product-info-c">
          <h5>{title}</h5>
          <br></br>
          <h6>{price.toFixed(2)}$</h6>
          <br></br>
          <h4>{amount}</h4>
          <br></br>
          <button onClick={() => removeFromCart(id)} className="minus-button">
            Remove
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-card-c">
        <div className="product-image-c">
          <img src={image} alt="pic" />
        </div>
        <div className="product-info-c">
          <h5>{title}</h5>
          <br></br>
          <h6 className="active">{price.toFixed(2)}$</h6>
          <h6>{salePrice.toFixed(2)}$</h6>
          <br></br>
          <h4>{amount}</h4>
          <br></br>
          <button onClick={() => removeFromCart(id)} className="minus-button">
            Remove
          </button>
        </div>
      </div>
    );
  }
};

export default ProductCart;

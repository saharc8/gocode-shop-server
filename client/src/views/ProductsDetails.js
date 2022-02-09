import { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

function ProductsDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  return (
    <div>
      <br></br>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
      </ul>
      <br></br>
      <h1>{productData.title}</h1>
      <br></br>
      <h2>price: {productData.price}$</h2>
      <br></br>
      <p>{productData.description}</p>
      <br></br>
      <h6> {productData.category}</h6>
      <br></br>
      <img
        style={{ width: "200px" }}
        src={productData.image}
        alt="product-img"
      />
      <br></br>
      <br></br>
      <label>for more details : saharc8@gmail.com</label>
      <Switch>
        <Route path="/"></Route>
      </Switch>
    </div>
  );
}

export default ProductsDetails;

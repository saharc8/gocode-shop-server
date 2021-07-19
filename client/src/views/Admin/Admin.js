import { Link, Route, Switch } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "../../components/Modal/Modal";
import useModal from "../../components/Modal/useModal";

const Admin = ({ setStartSale, setPercent }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        createTable(data);
      });
  }, []);

  function createTable(data) {
    setColumns([
      { field: "id", headerName: "ID", width: 230 },
      { field: "title", headerName: "Title", width: 150 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "category", headerName: "Category", width: 150 },
      { field: "price", headerName: "Price", type: "number", width: 120 },
      { field: "image", headerName: "Image", width: 150 },
    ]);

    for (const elem of data) {
      const row = {
        id: elem._id,
        title: elem.title,
        description: elem.description,
        category: elem.category,
        price: elem.price,
        image: elem.image,
      };
      setRows((rows) => [...rows, row]);
    }
  }

  function addProduct(title, description, category, price, image) {
    console.log("add new");
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        category: category,
        price: price,
        image: image,
      }),
    });
  }

  function deleteProduct(id) {
    console.log("delete: ", id);
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <div>
        <br></br>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <br></br>
          <li>
            <h1 className="Management">Management</h1>
          </li>
        </ul>
        <br></br>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(newSelection) => {
              console.log(newSelection.selectionModel[0]);
              setId(newSelection.selectionModel[0]);
            }}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            toggle();
          }}
        >
          edit
        </Button>
        <Modal isShowing={isShowing} hide={toggle} id={id} />
        &nbsp;
        <Button variant="contained" onClick={(e) => deleteProduct(id)}>
          delete
        </Button>
        <br /> <br /> <br />
        <label>New Product</label>
        <br />
        <TextField
          id="title"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        &nbsp;
        <TextField
          id="description"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />{" "}
        <TextField
          id="category"
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        />{" "}
        <TextField
          id="price"
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <TextField
          id="image"
          label="Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <br /> <br />
        <Button
          variant="contained"
          onClick={() => addProduct(title, description, category, price, image)}
        >
          add
        </Button>
        <br />
        <br />
        <br />
        <h2>Summer Sale:</h2>
        <TextField
          onChange={(e) => {
            setPercent(e.target.value);
            console.log(e.target.value);
          }}
          id="standard-basic"
          label="Percent"
        />
        <br />
        <br />
        <Button
          className="start-sale-btn"
          variant="contained"
          color="primary"
          onClick={() => {
            setStartSale(true);
            window.alert("start sale");
          }}
        >
          start summer sale
        </Button>
        <Button
          className="stop-sale-btn"
          variant="contained"
          color="secondary"
          onClick={() => {
            setStartSale(false);
            window.alert("stop sale");
          }}
        >
          stop summer sale
        </Button>
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </div>
    </>
  );
};

export default Admin;

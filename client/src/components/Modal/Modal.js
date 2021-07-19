import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Modal = ({ isShowing, hide, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  function updateProduct(title, description, category, price, image) {
    console.log("update: ", id);
    fetch(`/api/products/${id}`, {
      method: "PUT",
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

  return (
    <>
      {isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
              <div className="modal-overlay" />
              <div
                className="modal-wrapper"
                aria-modal
                aria-hidden
                tabIndex={-1}
                role="dialog"
              >
                <div className="modal">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="modal-close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <TextField
                    id="title"
                    label="Title"
                    onChange={(e1) => setTitle(e1.target.value)}
                  />
                  &nbsp;
                  <TextField
                    id="description"
                    label="Description"
                    onChange={(e2) => setDescription(e2.target.value)}
                  />{" "}
                  <TextField
                    id="category"
                    label="Category"
                    onChange={(e3) => setCategory(e3.target.value)}
                  />{" "}
                  <TextField
                    id="price"
                    label="Price"
                    onChange={(e4) => setPrice(e4.target.value)}
                  />{" "}
                  <TextField
                    id="image"
                    label="Image"
                    onChange={(e5) => setImage(e5.target.value)}
                  />{" "}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      updateProduct(title, description, category, price, image)
                    }
                  >
                    update
                  </Button>
                </div>
              </div>
            </React.Fragment>,
            document.body
          )
        : null}
    </>
  );
};

export default Modal;

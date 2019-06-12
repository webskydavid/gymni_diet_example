import React, { useContext, useState } from "react";
import { Context } from "./storage/Store";

const AddProduct = props => {
  const { addProduct, product, handleClickProduct } = useContext(Context);
  const [state, setState] = useState({
    name: "Jajko",
    weight: 100,
    unit: "g",
    protein: 12.5,
    fat: 9.7,
    carbohydrates: 0.6
  });

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;

    setState(s => {
      return {
        ...s,
        [name]: value
      };
    });
  };

  const handleSave = () => {
    console.log(state);
    addProduct({
      ...state,
      id: Date.now()
    });
  };

  return (
    <div>
      <div>
        <h4>Add product</h4>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:{" "}
          <input
            type="text"
            name="weight"
            value={state.weight}
            onChange={handleChange}
          />
        </label>
        <label>
          Unit:{" "}
          <input
            type="text"
            name="unit"
            value={state.unit}
            onChange={handleChange}
          />
        </label>
        <label>
          Macro: P
          <input
            type="text"
            name="protein"
            size="2"
            value={state.protein}
            onChange={handleChange}
          />{" "}
          F
          <input
            type="text"
            name="fat"
            size="2"
            value={state.fat}
            onChange={handleChange}
          />{" "}
          W
          <input
            type="text"
            name="carbohydrates"
            size="2"
            value={state.carbohydrates}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
      <hr />
      <div>
        <div>
          {product.map(p => {
            return (
              <div className="chip" key={p.id}>
                <div>
                  <strong>{p.name}</strong>
                  <span
                    style={{
                      fontSize: 8
                    }}
                  >{`${p.protein} ${p.fat} ${p.carbohydrates}`}</span>
                </div>
                <span>X</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

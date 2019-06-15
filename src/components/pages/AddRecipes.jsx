import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../storage/Store';
import { calculateMacro } from './../../utils';
import PropTypes from 'prop-types';

const initialValues = {
  productIds: [],
  name: ''
};

const AddRecipes = () => {
  const [macro, setMacro] = useState({});
  const [state, setState] = useState(initialValues);
  const [tempProduct, setTempProduct] = useState({});
  const [edit, setEdit] = useState({ id: null, isEdit: false });

  const { recipe, product, addRecipe, editRecipe, deleteRecipe } = useContext(
    Context
  );

  useEffect(() => {
    setMacro(calculateMacro(state.productIds, product.items));
  }, [product.items, state.productIds, tempProduct]);

  const handleChange = e => {
    const {
      target: { value }
    } = e;

    setState(s => ({ ...s, name: value }));
  };

  const handleSave = () => {
    if (edit.isEdit) {
      editRecipe({
        ...state,
        id: edit.id
      });
    } else {
      addRecipe({
        ...state,
        id: Date.now()
      });
    }
    setEdit({ id: null, isEdit: false });
    setState(initialValues);
  };

  const handleEdit = id => {
    setEdit({ id, isEdit: true });
    setState(s => {
      return {
        ...s,
        ...recipe.items[id]
      };
    });
  };

  const handleCancel = () => {
    setEdit({ id: null, isEdit: false });
    setState(initialValues);
  };

  const handleAdd = () => {
    setState(s => {
      if (s.productIds.includes(tempProduct.id)) {
        return s;
      }

      return {
        ...s,
        productIds: [...s.productIds, tempProduct.id]
      };
    });
  };

  const handleDelete = id => {
    setState(s => {
      const prods = s.productIds.filter(item => item !== id);

      return {
        ...s,
        productIds: [...prods]
      };
    });
  };

  const handleTempProduct = e => {
    const {
      target: { value }
    } = e;

    setTempProduct(s => ({
      ...product.items[value]
    }));
  };

  const isSelected = id => {
    if (edit.isEdit && id === edit.id) {
      return { border: '2px solid #e04646' };
    }

    return {};
  };

  return (
    <div>
      <h4>{edit.isEdit ? 'Edit' : 'Add'} product</h4>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      {edit.isEdit && (
        <button className="cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
      <br />
      <h4>Selected products:</h4>
      {state.productIds.map((id, index) => {
        return (
          <div key={index}>
            {product.items[id].name} {product.items[id].p} {product.items[id].f}{' '}
            {product.items[id].c}
            <button
              className="cancel"
              type="button"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <label>
        Product:
        <select
          type="text"
          name="product"
          value={state.product}
          onChange={handleTempProduct}
        >
          <option value="">-select</option>
          {product.ids.map(id => {
            return (
              <option key={id} value={id}>
                {product.items[id].name}
              </option>
            );
          })}
        </select>
      </label>
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <hr />
      <div>
        Kcal: <strong>{macro.kcal}</strong>
      </div>
      <div>
        Proteins: <strong>{macro.p}</strong>
      </div>
      <div>
        Fat: <strong>{macro.f}</strong>{' '}
      </div>
      <div>
        Carbohydrates: <strong>{macro.c}</strong>
      </div>
      <hr />
      {!!recipe.ids.length &&
        recipe.ids.map(id => {
          const { name, productIds } = recipe.items[id];
          const macro = calculateMacro(productIds, product.items);

          return (
            <div className="chip" key={id} style={isSelected(id)}>
              <div onClick={() => handleEdit(id)}>
                <strong>{name}</strong>
                <span
                  style={{
                    fontSize: 8
                  }}
                >
                  <hr />
                  {productIds.map((productId, index) => {
                    const { name } = product.items[productId];

                    return <p key={index}>{name}</p>;
                  })}
                  <br />
                  {macro.kcal}
                  <br />
                  {`${macro.p} ${macro.f} ${macro.c}`}
                </span>
              </div>
              {edit.id !== id && (
                <span onClick={() => deleteRecipe(id)}>X</span>
              )}
            </div>
          );
        })}
    </div>
  );
};

AddRecipes.propTypes = {};

export default AddRecipes;

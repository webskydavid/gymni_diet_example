import React, { useContext, useState } from 'react';
import { Context } from '../../storage/Store';
import AddProductForm from '../AddProductForm';

const initialValues = {
  name: '',
  weight: 0,
  unit: '',
  p: 0.0,
  f: 0.0,
  c: 0.0
};

const AddProduct = props => {
  const [state, setState] = useState(initialValues);
  const [edit, setEdit] = useState({ id: null, isEdit: false });
  const { addProduct, editProduct, product, deleteProduct } = useContext(
    Context
  );

  const handleCancel = id => {
    setEdit({ id: null, isEdit: false });
    setState(initialValues);
  };

  const handleEdit = id => {
    setEdit(s => ({ id, isEdit: true }));
    setState(s => {
      return {
        ...s,
        ...product.items[id]
      };
    });
  };

  const handleChangeInt = e => {
    const {
      target: { name, value }
    } = e;

    setState(s => {
      return {
        ...s,
        [name]: parseFloat(value)
      };
    });
  };

  const handleChangeString = e => {
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
    if (edit.isEdit) {
      editProduct({
        ...state,
        id: edit.id
      });
    } else {
      addProduct({
        ...state,
        id: Date.now()
      });
    }
    setEdit({ id: null, isEdit: false });
    setState(initialValues);
  };

  const isSelected = id => {
    if (edit.isEdit && id === edit.id) {
      return { border: '2px solid #e04646' };
    }

    return {};
  };

  return (
    <div>
      <AddProductForm
        isEdit={edit.isEdit}
        state={state}
        handleCancel={handleCancel}
        handleChangeInt={handleChangeInt}
        handleChangeString={handleChangeString}
        handleSave={handleSave}
      />
      <hr />

      <div>
        {!!product.ids.length &&
          product.ids.map(id => {
            return (
              <div className="chip" key={id} style={isSelected(id)}>
                <div onClick={() => handleEdit(id)}>
                  <strong>{product.items[id].name}</strong>
                  <span
                    style={{
                      fontSize: 8
                    }}
                  >{`${product.items[id].p} ${product.items[id].f} ${
                    product.items[id].c
                  }`}</span>
                </div>
                {edit.id !== id && (
                  <span onClick={() => deleteProduct(id)}>X</span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddProduct;

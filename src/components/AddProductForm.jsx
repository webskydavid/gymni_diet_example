import React from 'react';
import PropTypes from 'prop-types';

const AddProductForm = ({
  isEdit,
  state,
  handleSave,
  handleChangeInt,
  handleChangeString,
  handleCancel
}) => {
  return (
    <div>
      <h4>{isEdit ? 'Edit' : 'Add'} product</h4>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChangeString}
        />
      </label>
      <label>
        Weight:
        <input
          type="text"
          name="weight"
          value={state.weight}
          onChange={handleChangeInt}
        />
      </label>
      <label>
        Unit:
        <input
          type="text"
          name="unit"
          value={state.unit}
          onChange={handleChangeString}
        />
      </label>
      <label>
        Macro: P
        <input
          type="text"
          name="p"
          size="2"
          value={state.p}
          onChange={handleChangeInt}
        />{' '}
        F
        <input
          type="text"
          name="f"
          size="2"
          value={state.f}
          onChange={handleChangeInt}
        />{' '}
        W
        <input
          type="text"
          name="c"
          size="2"
          value={state.c}
          onChange={handleChangeInt}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      {isEdit && (
        <button className="cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

AddProductForm.propTypes = {};

export default AddProductForm;

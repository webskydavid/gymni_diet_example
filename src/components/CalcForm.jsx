import React, { useContext } from 'react';
import { Context } from './../storage/Store';

const CalcForm = () => {
  const { macro, clickCalculateMacro, changeMacro } = useContext(Context);

  return (
    <>
      <label>
        Kcal:{' '}
        <input type="text" value={macro.kcal} name="kcal" mb="0" readOnly />
        <button type="button" onClick={clickCalculateMacro}>
          Calculate
        </button>
      </label>
      <label>
        Protein:
        <input
          size="3"
          type="text"
          value={macro.p}
          name="p"
          onChange={changeMacro}
        />
      </label>

      <label>
        Fat:{' '}
        <input
          size="3"
          type="text"
          value={macro.f}
          name="f"
          onChange={changeMacro}
        />
      </label>
      <label>
        Carbohydrates:{' '}
        <input
          size="3"
          type="text"
          value={macro.c}
          name="c"
          onChange={changeMacro}
        />
      </label>
    </>
  );
};

export default CalcForm;

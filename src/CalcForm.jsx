import React, { useContext } from "react";
import { Context } from "./storage/Store";

const CalcForm = () => {
  const { macro, handleClickCalculateMacro, handleChangeMacro } = useContext(
    Context
  );
  return (
    <>
      <label>
        Kcal: <input type="text" value={macro.kcal} name="kcal" mb="0" />
        <button type="button" onClick={handleClickCalculateMacro}>
          Calculate
        </button>
      </label>
      <label>
        Protein:
        <input
          size="3"
          type="text"
          value={macro.protein}
          name="protein"
          onChange={handleChangeMacro}
        />
      </label>

      <label>
        Fat:{" "}
        <input
          size="3"
          type="text"
          value={macro.fat}
          name="fat"
          onChange={handleChangeMacro}
        />
      </label>
      <label>
        Carbohydrates:{" "}
        <input
          size="3"
          type="text"
          value={macro.carbohydrate}
          name="carbohydrate"
          onChange={handleChangeMacro}
        />
      </label>
    </>
  );
};

export default CalcForm;

import React, { useState, useEffect } from "react";
import { PROTEIN, FAT, CARBOHYDRATE, WEEKDAYS } from "../vars";

const initData = {
  lastModified: null,
  macro: {
    kcal: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0
  },
  config: {
    planDuration: "2",
    duretionType: "weeks",
    numberOfMeals: 4,
    defaultTimes: [700, 1100, 1600, 2030]
  },
  selectedDays: {
    ...WEEKDAYS.reduce((a, v) => {
      return {
        ...a,
        [v]: false
      };
    }, {})
  },
  product: [],
  recipe: [],
  plan: {}
};

export const Context = React.createContext();

const calculateCalories = (p, f, c) => {
  return PROTEIN * p + FAT * f + CARBOHYDRATE * c;
};

const Store = ({ children }) => {
  const [lastModified, setLastModified] = useState(null);
  const [data, setData] = useState(initData);

  useEffect(() => {
    const data = localStorage.getItem("diet");
    if (data) {
      setData(d => ({ ...JSON.parse(data) }));
    }
  }, []);

  useEffect(() => {
    if (lastModified > data.lastModified) {
      localStorage.setItem("diet", JSON.stringify(data));
      console.log("Log: [LocalStorage Write]", true);
    }
  }, [data]);

  const handleChangeMacro = e => {
    const {
      target: { name, value }
    } = e;

    setData(s => ({
      ...s,
      macro: {
        ...s.macro,
        [name]: Number(value)
      }
    }));
    setLastModified(Date.now());
  };

  const handleClickCalculateMacro = () => {
    setData(s => {
      return {
        ...s,
        macro: {
          ...s.macro,
          kcal: calculateCalories(
            s.macro.protein,
            s.macro.fat,
            s.macro.carbohydrate
          )
        }
      };
    });
    setLastModified(Date.now());
  };

  const handleChangeDays = e => {
    const {
      target: { name, checked }
    } = e;
    setData(s => {
      return {
        ...s,
        selectedDays: {
          ...s.selectedDays,
          [name]: checked
        }
      };
    });
    setLastModified(Date.now());
  };

  const handleClickProduct = id => {
    // setPlan(s => {
    //   return [...s, id];
    // });
    setLastModified(Date.now());
  };

  const handleDayForProduct = e => {
    const {
      target: { name, value }
    } = e;
    console.log({ name, value });
    setLastModified(Date.now());
  };

  const addProduct = product => {
    setData(s => {
      s.product.push(product);
      return {
        ...s,
        product: [...s.product]
      };
    });
    setLastModified(Date.now());
  };

  return (
    <Context.Provider
      value={{
        ...data,
        handleChangeMacro,
        handleClickCalculateMacro,
        handleChangeDays,
        handleClickProduct,
        handleDayForProduct,
        addProduct
      }}
    >
      {console.log("Log: [data]", data)}
      {children}
    </Context.Provider>
  );
};

export default Store;

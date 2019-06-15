import React, { useState, useEffect } from 'react';
import { calculateRecipeMacro } from './../utils';
import { PROTEIN, FAT, CARBOHYDRATE, WEEKDAYS } from '../vars';
import data from './../data';

const initData = {
  lastModified: null,
  macro: {
    kcal: 0,
    p: 0,
    f: 0,
    c: 0
  },
  config: {
    planDuration: '2',
    duretionType: 'weeks',
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
  product: {
    ids: [],
    items: {}
  },
  recipe: {
    ids: [],
    items: {}
  },
  plan: {}
};

export const Context = React.createContext();

export const calculateCalories = (p, f, c) => {
  return parseInt(PROTEIN * p + FAT * f + CARBOHYDRATE * c);
};

const Store = ({ children }) => {
  const [lastModified, setLastModified] = useState(null);
  const [data, setData] = useState(initData);

  useEffect(() => {
    const data = localStorage.getItem('diet');

    if (data) {
      setData(d => ({ ...JSON.parse(data) }));
    } else {
      localStorage.setItem('diet', JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (lastModified > data.lastModified) {
      localStorage.setItem('diet', JSON.stringify(data));
    }
  }, [data, lastModified]);

  const changeMacro = e => {
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

  const clickCalculateMacro = () => {
    setData(s => {
      return {
        ...s,
        macro: {
          ...s.macro,
          kcal: calculateCalories(s.macro.p, s.macro.f, s.macro.c)
        }
      };
    });
    setLastModified(Date.now());
  };

  const changeDays = e => {
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

  const clickProduct = id => {
    // setPlan(s => {
    //   return [...s, id];
    // });
    setLastModified(Date.now());
  };

  const deleteProduct = id => {
    setData(s => {
      const {
        product: { items, ids }
      } = s;

      const deleteFromObjectByKey = (key, obj) => {
        const newObj = {};
        const keys = Object.keys(obj).filter(
          k => parseInt(k) !== parseInt(key)
        );

        keys.forEach(k => {
          newObj[k] = obj[k];
        });

        return newObj;
      };

      const newItems = deleteFromObjectByKey(id, items);
      const newIds = ids.filter(item => item !== id);

      return {
        ...s,
        product: {
          ids: newIds,
          items: newItems
        }
      };
    });
    setLastModified(Date.now());
  };

  const handleDayForProduct = e => {
    const {
      target: { name, value }
    } = e;

    setLastModified(Date.now());
  };

  const addProduct = product => {
    const id = product.id;

    setData(s => {
      s.product.ids.push(id);

      return {
        ...s,
        product: {
          ...s.product,
          items: {
            ...s.product.items,
            [id]: product
          }
        }
      };
    });
    setLastModified(Date.now());
  };

  const editProduct = product => {
    const { id } = product;

    setData(s => {
      return {
        ...s,
        product: {
          ...s.product,
          items: {
            ...s.product.items,
            [id]: product
          }
        },
        recipe: {
          ...s.recipe,
          items: {
            ...s.recipe.items,
            ...calculateRecipeMacro(product, s.recipe, s)
          }
        }
      };
    });

    setLastModified(Date.now());
  };

  const addRecipe = recipe => {
    const id = recipe.id;

    setData(s => {
      s.recipe.ids.push(id);

      return {
        ...s,
        recipe: {
          ...s.recipe,
          items: {
            ...s.recipe.items,
            [id]: recipe
          }
        }
      };
    });
    setLastModified(Date.now());
  };

  const editRecipe = recipe => {
    const { id } = recipe;

    setData(s => {
      return {
        ...s,
        recipe: {
          ...s.recipe,
          items: {
            ...s.recipe.items,
            [id]: recipe
          }
        }
      };
    });
    setLastModified(Date.now());
  };

  const deleteRecipe = id => {
    setData(s => {
      const {
        recipe: { items, ids }
      } = s;

      const deleteFromObjectByKey = (key, obj) => {
        const newObj = {};
        const keys = Object.keys(obj).filter(
          k => parseInt(k) !== parseInt(key)
        );

        keys.forEach(k => {
          newObj[k] = obj[k];
        });

        return newObj;
      };

      const newItems = deleteFromObjectByKey(id, items);
      const newIds = ids.filter(item => item !== id);

      return {
        ...s,
        recipe: {
          ids: newIds,
          items: newItems
        }
      };
    });
    setLastModified(Date.now());
  };

  return (
    <Context.Provider
      value={{
        ...data,
        addProduct,
        addRecipe,
        changeDays,
        changeMacro,
        clickCalculateMacro,
        clickProduct,
        deleteProduct,
        deleteRecipe,
        editProduct,
        editRecipe,
        handleDayForProduct
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;

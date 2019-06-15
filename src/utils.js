import { PROTEIN, FAT, CARBOHYDRATE } from './vars';

export const calculateRecipeMacro = (product, recipe, state) => {
  let newRecipe = {};

  recipe.ids.forEach(recipeId => {
    const { productIds } = recipe.items[recipeId];
    const isProduct = productIds.includes(product.id);

    if (isProduct) {
      const macroUpdated = { p: 0, f: 0, c: 0 };

      productIds.forEach(prodId => {
        const { p, f, c } = state.product.items[prodId];
        const thisProduct = product.id === prodId;

        macroUpdated.p =
          parseFloat(thisProduct ? product.p : p) + parseFloat(macroUpdated.p);

        macroUpdated.f =
          parseFloat(thisProduct ? product.f : f) + parseFloat(macroUpdated.f);

        macroUpdated.c =
          parseFloat(thisProduct ? product.c : c) + parseFloat(macroUpdated.c);

        newRecipe = {
          ...recipe,
          items: {
            ...recipe.items,
            [recipeId]: {
              ...recipe.items[recipeId],
              macro: {
                ...macroUpdated
              }
            }
          }
        };
      });
    }
  });

  return newRecipe;
};

export const calculateCalories = (p, f, c) => {
  return parseFloat(PROTEIN * p + FAT * f + CARBOHYDRATE * c);
};

export const calculateMacro = (ids, items) => {
  console.log('Log: [ids, items]', ids, items);
  let p = 0;

  let f = 0;

  let c = 0;

  ids.forEach(id => {
    p = p + items[id].p;
    f = f + items[id].f;
    c = c + items[id].c;
  });
  console.log('Log: []', {
    p,
    f,
    c
  });
  if (!!items.length) {
    return { p: 0, f: 0, c: 0 };
  }

  return {
    p,
    f,
    c
  };
};

export const currentTimestamp = () => {
  return Date.now();
};

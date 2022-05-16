import { shape, number, string, arrayOf, objectOf, func, instanceOf, oneOfType } from 'prop-types';

export const optionsType = objectOf(
  shape({
    id: string,
    name: string,
    type: string,
    items: arrayOf(objectOf(string))
  })
);

export const pricesType = arrayOf(
  shape({
    currency: objectOf(string),
    amount: number
  })
);

export const byIdsType = objectOf(
  shape({
    id: string,
    brand: string,
    name: string,
    quantity: number,
    options: optionsType,
    prices: pricesType,
    gallery: arrayOf(string)
  })
);

export const cartType = shape({
  allIds: arrayOf(string),
  byIds: byIdsType
});

export const currencyType = shape({
  index: number,
  label: string,
  symbol: string
});

export const refType = oneOfType([func, shape({ current: instanceOf(Element) })]);

export const attributesType = arrayOf(
  shape({
    id: string,
    name: string,
    type: string,
    items: arrayOf(objectOf(string))
  })
);

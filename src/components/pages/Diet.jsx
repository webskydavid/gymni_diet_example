import React, { useContext } from 'react';
import { WEEKDAYS } from '../../vars';
import { Context } from '../../storage/Store';

import CalcForm from '../CalcForm';
import Weekdays from '../Weekdays';

const Products = () => {
  const { handleDayForProduct } = useContext(Context);
  const buildHead = list => {
    return list.map((item, index) => {
      return (
        <th key={item}>
          <input
            type="radio"
            name="selectedDay"
            value={item}
            onChange={handleDayForProduct}
          />
          <label>{item}</label>
        </th>
      );
    });
  };

  return (
    <div>
      <>
        <div col="2/4">
          <CalcForm />
        </div>
        <div col="1/4">
          <Weekdays />
        </div>
      </>
      <hr />
      <div col="5/6">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>{buildHead(WEEKDAYS)}</tr>
          </thead>

          <tbody>
            <tr>
              <td>Jajko</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

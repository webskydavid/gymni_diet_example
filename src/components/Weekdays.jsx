import React, { useContext } from 'react';
import { Context } from '../storage/Store';
import { WEEKDAYS } from '../vars';

const Weekdays = () => {
  const { selectedDays, changeDays } = useContext(Context);

  return (
    <>
      <div col="1/1">
        <h5 mb="0">Training days</h5>
      </div>
      <div col="1/1">
        <div>
          {WEEKDAYS.map((day, i) => {
            return (
              <div className="days" key={day}>
                <input
                  checked={selectedDays[day]}
                  type="checkbox"
                  name={day}
                  onChange={changeDays}
                  mt="0"
                />
                <label mt="0">{day}</label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Weekdays;

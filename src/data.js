import { WEEKDAYS } from './vars';

const data = {
  lastModified: Date.now() - 10000,
  macro: {
    kcal: 0,
    p: 160,
    f: 65,
    c: 220
  },
  selectedDays: {
    ...WEEKDAYS.reduce((a, v) => {
      return {
        ...a,
        [v]: false
      };
    }, {})
  },
  config: {
    planDuration: '2',
    duretionType: 'weeks',
    numberOfMeals: 4,
    defaultTimes: [700, 1100, 1600, 2030]
  },
  product: {
    ids: [],
    items: {}
  },
  recipe: {
    ids: [],
    items: {},
    macro: {}
  },
  plan: {
    mo: {
      700: {
        recipeIds: [1, 2],
        productIds: [1],
        macro: { p: 60, f: 10, c: 160, kcal: 1400 }
      },
      1100: {},
      1600: {},
      2030: {}
    },
    tu: {}
  }
};

//localStorage.setItem('diet', JSON.stringify(data));

const events = [
  {
    id: 'int',
    type: 'string',
    startDate: 'timestamp',
    endDate: 'timestamp'
  }
];

const schedule = {
  month: 5, // it will change by clicking the switch month button
  year: 2019, // change if selected for drop down
  day: 1, // current selected day
  grid: [
    { index: 0, day: 29, isSelected: false, eventAmount: 10 },

    { index: 1, day: 30, isSelected: false, eventAmount: 1 },
    { index: 2, day: 1, isSelected: true, eventAmount: 2 }
    // ...
    // Up to 42 objects, where the last day is 9-Sunday Mai 2019
  ],
  events: {
    29: [] /* 10 events */,
    30: [] /* 1 event */,
    1: [
      // grid[2].day -> events by day
      {
        id: 'int', //
        type: 'string',
        startDate: 'timestamp',
        endDate: 'timestamp'
      },
      {
        id: 'int', //
        type: 'string',
        startDate: 'timestamp',
        endDate: 'timestamp'
      }
      // ...
      //
    ]
  }
};

const data1 = {
  diet: [{ time: 1000 }],
  schedule: {
    custom: {},
    default: /* calendar name */ {
      '01052019': {
        events: [
          {
            id: 'int',
            type: 'string',
            startDate: 'timestamp',
            endDate: 'timestamp'
          }

          // ...
        ],
        training: {
          1000: {
            workout: {
              exercise: [
                { name: 'string' },
                { name: 'string' },
                { name: 'string' }
              ]
            }
          },
          2000: {
            //...
          }
        },
        diet: [{ time: 1000 }]
      },
      '02052019': {}
    }
  }
};

export default data;

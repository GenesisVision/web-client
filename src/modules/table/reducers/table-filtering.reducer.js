const defaultState = {};

const tableFilteringReducer = ({ type, filters = {} }) => {
  const initialState = { ...defaultState, ...filters };
  return (state = initialState, action) => {
    switch (action.type) {
      case type: {
        const { name, value } = action.payload;
        const existingFilterValue = state[name];
        if (JSON.stringify(existingFilterValue !== JSON.stringify(value))) {
          return {
            ...state,
            ...{ [name]: value }
          };
        }

        return state;
      }

      default:
        return state;
    }
  };
};

export default tableFilteringReducer;

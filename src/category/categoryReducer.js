const INITIAL_STATE = { list: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CATEGORY_FETCHED':
            return { ...state, list: action.payload.data.categories };
        default:
            return state;
    }
};

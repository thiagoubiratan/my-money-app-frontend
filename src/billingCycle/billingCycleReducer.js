const INITIAL_STATE = { list: [], loading: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BILLING_CYCLES_FETCHED':
            return { ...state, list: action.payload.data }
        case 'SHOW_LOADING':
            return { ...state, loading: true }
        case 'HIDE_LOADING':
            return { ...state, loading: false }
        default:
            return state
    }
}
import { FORM_DETAILS } from '../action/Action'

const initialstate = { formlist: {} }

function FormReducerComponent(state = initialstate, action) {
    switch (action.type) {
        case FORM_DETAILS:
            return Object.assign({}, state, { formlist: action.payload })
        default:
            return state
    }

}
export default FormReducerComponent
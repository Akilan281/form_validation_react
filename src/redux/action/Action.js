export const FORM_DETAILS = 'form_details'

export const formList = (data) => {
    return {
        type: FORM_DETAILS,
        payload: data
    }
}
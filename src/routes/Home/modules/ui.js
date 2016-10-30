import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DATES_FILTER = 'Ui.SET_DATES_FILTER'

// ------------------------------------
// Actions
// ------------------------------------
export function setDatesFilter(dates) {
  return {
    type: SET_DATES_FILTER,
    payload: dates
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  dates: {
    startDate: moment("2013-09-15"),
    endDate: moment("2014-06-07")
  }
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATES_FILTER:
      return Object.assign({}, state, {
        dates: {
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        }
      })
    default:
      return state
  }
}


import {CALL_API} from 'redux-api-middleware'
import {BASE_API_URL, getHeaders} from '../../../helpers/constants'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SHIFTS_REQUEST = 'Shift.FETCH_SHIFTS_REQUEST'
export const FETCH_SHIFTS_SUCCESS = 'Shift.FETCH_SHIFTS_SUCCESS'
export const FETCH_SHIFTS_FAILURE = 'Shift.FETCH_SHIFTS_FAILURE'

export const FETCH_RANGE_SHIFTS_REQUEST = 'Shift.FETCH_RANGE_SHIFTS_REQUEST'
export const FETCH_RANGE_SHIFTS_SUCCESS = 'Shift.FETCH_RANGE_SHIFTS_SUCCESS'
export const FETCH_RANGE_SHIFTS_FAILURE = 'Shift.FETCH_RANGE_SHIFTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Calls the API to retrieve a shift for a given date.
 * @param date
 * @returns {{}}
 */
export function fetchShiftForDate(date) {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: getHeaders,
      endpoint: BASE_API_URL + '/shift/' + date,
      types: [FETCH_SHIFTS_REQUEST, FETCH_SHIFTS_SUCCESS, FETCH_SHIFTS_FAILURE]
    }
  }
}

export function fetchShiftForDateInRange(dateFrom, dateTo) {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: getHeaders,
      endpoint: BASE_API_URL + '/shifts/' + dateFrom + '/' + dateTo,
      types: [FETCH_RANGE_SHIFTS_REQUEST, FETCH_RANGE_SHIFTS_SUCCESS, FETCH_RANGE_SHIFTS_FAILURE]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: true,
  data: {},
  isError: false,
  errorMsg: null
}

export default function shiftReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHIFTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isError: false
      })
    case FETCH_SHIFTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        isError: false,
        errorMsg: null
      })
    case FETCH_SHIFTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMsg: 'Something went wrong'
      })

    case FETCH_RANGE_SHIFTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isError: false
      })
    case FETCH_RANGE_SHIFTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        isError: false,
        errorMsg: null
      })
    case FETCH_RANGE_SHIFTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMsg: 'Something went wrong'
      })
    default:
      return state
  }
}

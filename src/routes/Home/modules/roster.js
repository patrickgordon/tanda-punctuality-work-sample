import {CALL_API} from 'redux-api-middleware'
import {BASE_API_URL, getHeaders} from '../../../helpers/constants'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ROSTERS_REQUEST = 'Roster.FETCH_ROSTERS_REQUEST'
export const FETCH_ROSTERS_SUCCESS = 'Roster.FETCH_ROSTERS_SUCCESS'
export const FETCH_ROSTERS_FAILURE = 'Roster.FETCH_ROSTERS_FAILURE'

export const FETCH_RANGE_ROSTERS_REQUEST = 'Roster.FETCH_RANGE_ROSTERS_REQUEST'
export const FETCH_RANGE_ROSTERS_SUCCESS = 'Roster.FETCH_RANGE_ROSTERS_SUCCESS'
export const FETCH_RANGE_ROSTERS_FAILURE = 'Roster.FETCH_RANGE_ROSTERS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Calls the API to retrieve a roster for a given date.
 * @param date
 * @returns {{}}
 */
export function fetchRosterForDate(date) {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: getHeaders,
      endpoint: BASE_API_URL + '/roster/' + date,
      types: [FETCH_ROSTERS_REQUEST, FETCH_ROSTERS_SUCCESS, FETCH_ROSTERS_FAILURE]
    }
  }
}

export function fetchRosterForDateInRange(dateFrom, dateTo) {
  return {
    [CALL_API]: {
      method: 'GET',
      headers: getHeaders,
      endpoint: BASE_API_URL + '/rosters/' + dateFrom + '/' + dateTo,
      types: [FETCH_RANGE_ROSTERS_REQUEST, FETCH_RANGE_ROSTERS_SUCCESS, FETCH_RANGE_ROSTERS_FAILURE]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: true,
  data: [],
  isError: false,
  errorMsg: null
}

export default function rosterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROSTERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isError: false
      })
    case FETCH_ROSTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        isError: false,
        errorMsg: null
      })
    case FETCH_ROSTERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMsg: 'Something went wrong'
      })

    case FETCH_RANGE_ROSTERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_RANGE_ROSTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        isError: false,
        errorMsg: null
      })
    case FETCH_RANGE_ROSTERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        errorMsg: 'Something went wrong'
      })
    default:
      return state
  }
}

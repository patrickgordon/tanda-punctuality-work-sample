import {createSelector} from 'reselect'
import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import moment from 'moment'

const getRosters = (state) => state.roster.data
const getShifts = (state) => state.shift.data
const getFilterDates = (state) => state.ui.dates

/***
 * This selector gets all of the data for rosters and shifts and combines them to provide an array for the same date.
 * It is composed using two other selectors (getRosters and getShifts) which just simply retrieve all records from
 * state.
 */
export const getCombinedData = createSelector(
  [getRosters, getShifts],
  (rosters, shifts) => {

    var rostersFormatted = forEach(rosters, (roster, key) => {
      roster.rosterStart = roster.start
      roster.rosterFinish = roster.finish
      delete roster.start
      delete roster.finish
    })

    var rostersKeyedByDate = keyBy(rostersFormatted, 'date')

    var shiftsFormatted = forEach(shifts, (shift, key) => {
      shift.shiftFinish = shift.finish
      shift.shiftStart = shift.start
      delete shift.start
      delete shift.finish
    })
    var shiftsKeyedByDate = keyBy(shiftsFormatted, 'date')

    var data = []
    values(merge(rostersKeyedByDate, shiftsKeyedByDate)).map((row, index) => {
      row.id = index + 1
      data.push(row)
    })

    data = sortBy(data, 'date')

    return data
  }
)

/***
 * This selector filters the data using the date range specified in the calendar.
 * It uses the getCombinedData selector and the getFilterDates selector as inputs.
 *
 * If there are no dates it just returns the full data set.
 * If there is dates it returns dates between (and including) the provided dates
 */
export const getFilteredData = createSelector(
  [getCombinedData, getFilterDates],
  (data, dates) => {
    return data.filter((row) => {
      return ((moment(row.date) >= dates.startDate) && (moment(row.date) <= dates.endDate))
    })
  }
)

/***
 * This selector is composed using the getCombinedData selector and checks to see if there are any issues with each
 * date's data. That is, if there is no start & finish for roster or shift. It creates an array of id's to be used
 * later by a style formatter for the table.
 */
export const getInvalidDataRowIds = createSelector(
  [getFilteredData],
  (data) => {
    var invalidRows = []
    data.map((row, index) => {
      if ((!row.shiftStart && !row.shiftFinish) || (!row.rosterStart && !row.rosterFinish)) {
        invalidRows.push(row.id)
      }
    })
    return invalidRows
  }
)

/***
 * This selector is composed using the getFilteredData selector and it computes the punctuality stats that are used
 * in the labels that are displayed to the user.
 */
export const getPunctualityStats = createSelector(
  [getFilteredData],
  (data) => {
    var stats = {
      punctual: 0,
      punctualPercent: 0,
      notPunctualPercent: 0,
      arrivedLate: 0,
      leftEarly: 0,
      timeSaved: 0
    }

    data.map((row) => {
      if (row.shiftStart && row.shiftFinish) {

        // For late arrivals
        if (row.shiftStart > row.rosterStart) {
          stats.arrivedLate += 1
        } else {
          stats.punctual += 1
        }

        // For early finishers
        if (row.shiftFinish < row.rosterFinish) {
          stats.leftEarly += 1
        } else {
          stats.punctual += 1
        }
      }

    })

    var total = stats.punctual + stats.leftEarly + stats.arrivedLate

    stats.punctualPercent = total != 0 ? (Math.round((stats.punctual / total) * 100) / 100) * 100 : 0
    stats.notPunctualPercent = 100 - stats.punctualPercent

    return stats
  }
)

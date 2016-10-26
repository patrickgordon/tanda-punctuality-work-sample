import {createSelector} from 'reselect'
import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
import values from 'lodash/values'

const getRosters = (state) => state.roster.data
const getShifts = (state) => state.shift.data

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

    return data
  }
)

/***
 * This selector is composed using the getCombinedData selector and checks to see if there are any issues with each
 * date's data. That is, if there is no start & finish for roster or shift. It creates an array of id's to be used
 * later by a style formatter for the table.
 */
export const getInvalidDataRowIds = createSelector(
  [getCombinedData],
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
 * This selector is composed using the getCombinedData selector and it computes the punctuality stats that are used
 * in the labels that are displayed to the user.
 */
export const getPunctualityStats = createSelector(
  [getCombinedData],
  (data) => {
    var stats = {
      punctual: 0,
      arrivedLate: 0,
      leftEarly: 0
    }

    data.map((row) => {
      var arrivedLate = false
      var leftEarly = false

      if (row.shiftStart > row.rosterStart) {
        stats.arrivedLate += 1
        arrivedLate = true
      }

      if (row.shiftFinish < row.rosterFinish) {
        stats.leftEarly += 1
        leftEarly = true
      }

      if (!arrivedLate && !leftEarly) {
        stats.punctual += 1
      }

    })

    return stats
  }
)

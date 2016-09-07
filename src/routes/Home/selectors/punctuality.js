import {createSelector} from 'reselect'
import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
import values from 'lodash/values'

const getRosters = (state) => state.roster.data
const getShifts = (state) => state.shift.data

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

export const getPunctualityStats = createSelector(
  [getCombinedData],
  (data) => {
    var stats = {
      punctual: 0,
      arrivedLate: 0,
      leftEarly: 0
    }
    data.map((row) => {
      if (row.shiftStart <= row.rosterStart) {
        stats.punctual += 1
      } else if (row.shiftStart > row.rosterStart) {
       stats.arrivedLate += 1
      } else if (row.shiftFinish < row.rosterFinish) {
        stats.leftEarly += 1
      }
    })

    return stats
  }
)

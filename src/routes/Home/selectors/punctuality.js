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
    var rostersKeyedByDate = keyBy(rosters, 'date')

    var shiftsFormatted = forEach(shifts, (shift, key) => {
      shift.shiftFinish = shift.finish
      shift.shiftStart = shift.start
      delete shift.start
      delete shift.finish
    })
    var shiftsKeyedByDate = keyBy(shiftsFormatted, 'date')

    var data = []
    values(merge(rostersKeyedByDate, shiftsKeyedByDate)).map((row, index) => {
      row.id = index+1
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
      if ((!row.shiftStart && !row.shiftFinish) || (!row.start && !row.finish)) {
        invalidRows.push(row.id)
      }
    })
    return invalidRows
  }
)

import {connect} from 'react-redux'
import {setDatesFilter} from '../modules/ui'
import {getFilteredData, getInvalidDataRowIds, getPunctualityStats} from '../selectors/punctuality'

import HomeView from '../components/HomeView'

const mapDispatchToProps = (dispatch) => ({
  setDatesFilter: (dates) => dispatch(setDatesFilter(dates))
})

const mapStateToProps = (state) => ({
  data: getFilteredData(state),
  invalidDataRowIds: getInvalidDataRowIds(state),
  stats: getPunctualityStats(state),
  ui: state.ui
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

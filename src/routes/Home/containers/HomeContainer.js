import {connect} from 'react-redux'
import {fetchRosterForDate} from '../modules/roster'
import {getCombinedData, getInvalidDataRowIds} from '../selectors/punctuality'

import HomeView from '../components/HomeView'

const mapActionCreators = {
  fetchRosterForDate: (date) => fetchRosterForDate(date)
}

const mapStateToProps = (state) => ({
  data: getCombinedData(state),
  invalidDataRowIds: getInvalidDataRowIds(state)
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)

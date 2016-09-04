import {connect} from 'react-redux'
import {fetchRosterForDate} from '../modules/roster'

import HomeView from '../components/HomeView'

const mapActionCreators = {
  fetchRosterForDate: (date) => fetchRosterForDate(date)
}

const mapStateToProps = (state) => ({
  roster: state.roster.data
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)

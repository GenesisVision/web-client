import { connect } from 'react-redux'
import TraderList from './TraderList/TraderList'

const mapStateToProps = (state) => ({
  trader: state.trader
})

const TradersScene = connect(
  mapStateToProps
)(TraderList)

export default TradersScene

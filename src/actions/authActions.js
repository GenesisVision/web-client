import history from '../utils/history'
import routes from '../utils/constants/routes'

const alreadyAuthenticated = () => (dispatch) => {
    history.push(routes.index);
}

const authActions = { alreadyAuthenticated }
export default authActions
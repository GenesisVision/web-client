import { logout } from '../../services/authService'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const logoutRequest = () => ({
    type: LOGOUT_REQUEST
})

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const logoutUser = () => dispatch => {
    dispatch(logoutRequest());
    logout();
    dispatch(logoutSuccess());
}
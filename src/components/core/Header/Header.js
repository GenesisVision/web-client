import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingBar from 'react-redux-loading-bar'
import LogoutButton from './LogoutButton'
import MenuLink from './MenuLink'
import { logoutUser } from '../../../actions/auth/logoutActions'

class Header extends Component {
  render() {
    const { dispatch, auth } = this.props;

    const onLogoutCLick = () => {
      dispatch(logoutUser());
    }

    const renderLogoutButton = () => {
      if (auth.isAuthenticated) {
        return (<LogoutButton onLogoutClick={onLogoutCLick} />);
      }
      return (<span className="text-danger">Not Authorized</span>)
    }

    return (
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
          <span className='navbar-brand'>Trade app</span>
          <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
            <ul className='navbar-nav mr-auto'>
              <MenuLink url='/' name='Traders' />
              <MenuLink url='/dashboard' name='Dashboard' />
            </ul>
            {renderLogoutButton()}
          </div>
        </nav>
        <LoadingBar style={{ backgroundColor: '#17a2b8' }} />
      </header>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Header)

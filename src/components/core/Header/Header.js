import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingBar from 'react-redux-loading-bar'
import MenuLink from './MenuLink'
import AuthButtons from './AuthButtons/AuthButtons'

const Header = (props) => {
  const { match } = props;
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
        <span className='navbar-brand'>Trade app</span>
        <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
          <ul className='navbar-nav mr-auto'>
            <MenuLink url='/traders' name='Traders' match={match} />
            <MenuLink url='/dashboard' name='Dashboard' match={match}/>
          </ul>
          <AuthButtons { ...props } />
        </div>
      </nav>
      <LoadingBar style={{ backgroundColor: '#17a2b8' }} />
    </header>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Header)

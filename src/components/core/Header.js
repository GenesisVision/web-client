import React from 'react'
import PropTypes from 'prop-types'
import LoadingBar from 'react-redux-loading-bar'
import { Link } from 'react-router-dom'

const MenuLink = props => {
  MenuLink.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  const { url, name } = props;
  const isActive = window.location.pathname === url;
  if (isActive) {
    return (
      <li className='nav-item active'>
        <span className='nav-link' to={url}>{name}</span>
      </li>
    );
  }
  return (
    <li className='nav-item'>
      <Link className='nav-link' to={url}>{name}</Link>
    </li>
  );
}

const Header = () =>
  <header>
    <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
      <span className='navbar-brand'>Trade app</span>
      <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
        <ul className='navbar-nav mr-auto'>
          <MenuLink url='/' name='Traders' />
          <MenuLink url='/dashboard' name='Dashboard' />
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          <button className='btn btn-outline-success my-2 my-sm-0'>Log In</button>
        </form>
      </div>
    </nav>
    <LoadingBar style={{backgroundColor: '#17a2b8'}} />
  </header>


export default Header;

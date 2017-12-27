import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MenuLink = props => {

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

MenuLink.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default MenuLink

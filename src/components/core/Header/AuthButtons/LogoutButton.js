import React from 'react'

const LogoutButton = ({ onLogoutClick }) => (
  <div>
    <span>UserName</span>
    <button className='btn btn-outline-success my-2 my-sm-0' onClick={onLogoutClick}>
      Log Out
    </button>
  </div>
)

export default LogoutButton

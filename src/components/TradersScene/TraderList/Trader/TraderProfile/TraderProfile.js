import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TraderProfile.css'
import Link from 'react-router-dom/Link'

class TraderProfile extends Component {
  state = {
    tooltipOpen: false
  };
  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  render() {
    return (
      <div className='trader-profile'>
        <div className='row'>
          <div className='col-sm-4'>
            <img
              src='http://via.placeholder.com/100x90'
              alt={this.props.name}
            />
          </div>
          <div className='col-sm-8'>
            <div className='card-block'>
              <h5 className='card-title'>
                <Link className='trader-profile__name' to={`/traders/${this.props.id}`}>{this.props.name}</Link>
              </h5>
              <p className='card-text trader-profile__description'>{this.props.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TraderProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default TraderProfile;

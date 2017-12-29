import React from 'react'
import PropTypes from 'prop-types'

const TraderCard = ({ name, description }) => (
  <div className="media">
    <img className="d-flex mr-3" src="http://via.placeholder.com/200x200" alt={name} />
    <div className="media-body">
      <h5 className="mt-0">{name}</h5>
      {description}
    </div>
  </div>
)

TraderCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default TraderCard

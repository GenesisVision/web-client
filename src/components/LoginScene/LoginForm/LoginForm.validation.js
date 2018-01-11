const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default validate

const validateEmail = (email) => {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if(values.password !== values.confirmPassword){
    errors.confirmPassword = 'Passwords must match';
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if(!validateEmail(values.email)){
    errors.email ='Email is invalid';
  }
  return errors
}

export default validate

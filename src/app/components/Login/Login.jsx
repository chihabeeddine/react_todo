import React from 'react'
import { connect } from 'react-redux'

import * as mutations from '../../store/mutations'
import './Login.scss'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const LoginComponent = ({ authenticateUser, authenticated }) => {
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <h2 className="login-title ">Please Login</h2>
        <form onSubmit={authenticateUser}>
          {/* <input type="text" placeholder="username" name="username" defaultValue="Dev" required />
          <input type="password" placeholder="password" name="password" defaultValue="" required /> */}
          <TextField className="form-input" id="outlined-basic" label="Username" variant="outlined" name="username" defaultValue="Dev" required />
          <TextField className="form-input" type="password" id="outlined-basic" label="Password" variant="outlined" name="password" defaultValue="TUPLES" required />

          {authenticated == mutations.NOT_AUTHENTICATED ? <p> Login incorrect</p> : null}
          <Button type="submit" className="form-login" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
})

const mapDispatchToProps = dispatch => ({
  authenticateUser(e) {
    e.preventDefault()
    const username = e.target['username'].value
    const password = e.target['password'].value
    dispatch(mutations.requestAuthenticateUser(username, password))
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

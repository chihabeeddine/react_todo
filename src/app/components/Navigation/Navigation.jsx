import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
import './Navigation.scss'

const Navigation = () => (
  <div className="Navigation-component">
    <Link className="Navigation-title" to="/dashboard">
      <h2>Home</h2>
    </Link>
  </div>
)

export const ConnectedNavigation = connect(state => state)(Navigation)

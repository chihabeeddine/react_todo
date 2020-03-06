import React from 'react'
import { connect } from 'react-redux'
import { ConnectedTasksList } from '../TaskList/TaskList'

import './Dashboard.scss'

export const Dashboard = ({ groups }) => (
  <div className="App-dashboard ">
    {groups.map(group => (
      <ConnectedTasksList key={group.id} id={group.id} name={group.name} />
    ))}
  </div>
)

function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as mutations from '../../store/mutations'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import './TaskDetail.scss'

const TaskDetail = ({ id, comments, task, isComplete, groups, setTaskCompletion, setTaskGroup, setTaskName }) => (
  <div className="task-detail">
    <div className="items-wrapper">
      <div className="item-input">
        <TextField className="item-input" id="outlined-basic" label="Item" variant="outlined" onChange={setTaskName} value={task.name} />
      </div>
      <div className="item-input">
        <Select className="task-status-button" labelId="demo-simple-select-label" id="options-select" value={task.group} onChange={setTaskGroup}>
          {groups.map(group => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="item-input">
        <Button className="task-status-button" onClick={() => setTaskCompletion(id, !isComplete)} variant="outlined" color="primary">
          {isComplete ? `Reopen` : `Complete`}
        </Button>
      </div>

      <div>
        <Link className="dashboard-link" to="/dashboard">
          <Button className="dashboard-link-button" variant="outlined" color="primary">
            Done
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id
  let task = state.tasks.find(task => task.id === id)
  let groups = state.groups
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete))
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value))
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value))
    }
  }
}

export const ConnectTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail)

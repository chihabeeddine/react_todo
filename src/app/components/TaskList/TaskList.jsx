import React from 'react'
import { connect } from 'react-redux'

import { requestTaskCreation } from '../../store/mutations'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import './TaskList.scss'

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div className="task-list">
    <h3 className="task-title">{name}</h3>
    <div className="task-wrapper">
      {tasks.map(task => (
        <Link className="task-item" to={`/task/${task.id}`} key={task.id}>
          <div className="item"> {task.name} </div>
        </Link>
      ))}
    </div>

    <Button className="add-task-button" onClick={() => createNewTask(id)} variant="outlined" color="primary">
      Add New
    </Button>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter(task => task.group == groupID)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log('creating new task..', id)
      dispatch(requestTaskCreation(id))
    }
  }
}
export const ConnectedTasksList = connect(mapStateToProps, mapDispatchToProps)(TaskList)

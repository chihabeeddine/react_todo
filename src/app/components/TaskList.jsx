import React from 'react'
import { connect } from 'react-redux'

import { requestTaskCreation } from '../store/mutations'
import { Link } from 'react-router-dom'

import './TaskList.scss'

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3 className="task-title">{name}</h3>
    <div>
      {tasks.map(task => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div> {task.name} </div>
        </Link>
      ))}
    </div>
    <button onClick={() => createNewTask(id)}>Add New</button>
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

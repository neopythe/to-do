import React, { Component } from 'react'

import { AiFillEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      task: this.props.task,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleComplete() {
    this.props.toggleCompleted(this.props.id)
  }

  handleDelete() {
    this.props.deleteTodo(this.props.id)
  }

  handleUpdate(event) {
    event.preventDefault()
    this.props.updateTodo(this.props.id, this.state.task)
    this.toggleForm()
  }

  toggleForm() {
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    const form = (
      <li
        style={{ transition: 'all 0.5s' }}
        className="card-body flex-row justify-between items-center w-full h-16 my-1 py-6 bg-[#c5e755]"
      >
        <form
          onSubmit={this.handleUpdate}
          className="flex flex-row justify-between w-full items-center gap-4"
        >
          <input
            onChange={this.handleChange}
            type="text"
            name="task"
            value={this.state.task}
            className="input input-bordered h-10 w-32 sm:w-fit sm:pr-10"
            required
          />
          <button className="btn btn-sm h-10 font-medium bg-slate-800 lowercase">
            save
          </button>
        </form>
      </li>
    )

    const taskStyles = !this.props.isCompleted
      ? {
          backgroundColor: '#f0f9d2',
          color: '#54631e',
          transition: 'all 0.5s',
        }
      : {
          backgroundColor: '#f0f2f5',
          color: '#475569',
          textDecoration: 'line-through',
          transition: 'all 0.5s',
        }

    const todo = (
      <li
        style={taskStyles}
        id={this.props.id}
        className="card-body flex-row justify-between items-center w-full h-16 my-1"
      >
        <div onClick={this.handleComplete} className="w-full text-start">
          <p className="block py-4">{this.props.task}</p>
        </div>
        <div className="flex flex-row gap-1 text-xl">
          <label className="flex flex-row items-center cursor-pointer hover:text-[#9ac50d]">
            <button onClick={this.toggleForm} className="w-fit h-fit"></button>
            <AiFillEdit />
          </label>
          <label className="flex flex-row items-center cursor-pointer hover:text-[#9ac50d]">
            <button
              onClick={this.handleDelete}
              className="w-fit h-fit"
            ></button>
            <TiDelete />
          </label>
        </div>
      </li>
    )

    return this.state.editMode ? form : todo
  }
}

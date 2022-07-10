import React, { Component } from 'react'

import { v4 as uuidv4 } from 'uuid'

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: '',
      isCompleted: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createTodo({ ...this.state, id: uuidv4() })
    this.setState({ task: '' })
  }

  render() {
    return (
      <section className="card w-full">
        <form
          onSubmit={this.handleSubmit}
          className="flex flex-row flex-wrap items-end justify-between card-body gap-4"
        >
          <fieldset className="flex flex-col items-start">
            <label>
              <input
                onChange={this.handleChange}
                type="text"
                id="task"
                name="task"
                value={this.state.task}
                placeholder="new to-do"
                className="input input-bordered w-32 sm:w-fit h-10 sm:pr-10"
                required
              />
            </label>
          </fieldset>
          <button className="btn btn-success btn-sm h-10 hover:bg-[#c5e755] lowercase">
            add to-do
          </button>
        </form>
      </section>
    )
  }
}

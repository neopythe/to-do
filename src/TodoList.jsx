import React, { Component } from 'react'

import Todo from './Todo'
import NewTodoForm from './NewTodoForm'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      isSorted: false,
    }
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
  }

  create(todo) {
    localStorage.setItem('todos', JSON.stringify([...this.state.todos, todo]))
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  delete(id) {
    localStorage.setItem(
      'todos',
      JSON.stringify(this.state.todos.filter((todo) => todo.id !== id))
    )
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  update(id, updatedTask) {
    localStorage.setItem(
      'todos',
      JSON.stringify(
        this.state.todos.map((todo) =>
          todo.id === id ? { ...todo, task: updatedTask } : todo
        )
      )
    )
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  toggleCompleted(id) {
    localStorage.setItem(
      'todos',
      JSON.stringify(
        this.state.todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      )
    )
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')),
    })
  }

  toggleSort() {
    this.setState({ isSorted: !this.state.isSorted })
  }

  render() {
    return (
      <div className="min-h-screen flex justify-center from-slate-900 bg-gradient-to-br bg-slate-600 select-none py-24">
        <main
          style={{
            boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
          }}
          className="flex flex-col justify-between items-start card w-[90%] sm:w-fit h-fit bg-white"
        >
          <section className="flex flex-row justify-between w-full">
            <div className="flex flex-col items-start card-body text-start">
              <h1 className="font-bold text-xl">to-do list</h1>
              <p className="text-sm">a simple React to-do list app</p>
            </div>
            {this.state.todos.length > 0 && (
              <div className="flex flex-col text-end card-body text-[#add331]">
                <h2 className="font-bold text-lg">{this.state.todos.length}</h2>
                <button
                  onClick={this.toggleSort}
                  className="btn btn-xs btn-success w-fit hover:bg-[#c5e755] lowercase px-4 self-end"
                >
                  {this.state.isSorted ? 'unsort' : 'sort'}
                </button>
              </div>
            )}
          </section>
          <ul className="flex flex-col w-full gap-2">
            {!this.state.isSorted &&
              this.state.todos.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  task={todo.task}
                  isCompleted={todo.isCompleted}
                  deleteTodo={this.delete}
                  updateTodo={this.update}
                  toggleCompleted={this.toggleCompleted}
                />
              ))}
            {this.state.isSorted &&
              this.state.todos
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    isCompleted={todo.isCompleted}
                    deleteTodo={this.delete}
                    updateTodo={this.update}
                    toggleCompleted={this.toggleCompleted}
                  />
                ))
                .sort((x, y) => x.props.isCompleted - y.props.isCompleted)}
          </ul>
          <NewTodoForm createTodo={this.create} />
        </main>
      </div>
    )
  }
}

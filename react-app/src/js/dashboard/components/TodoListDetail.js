import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import pencilBtn from "../../../img/pencil-btn.png";
import garbageBtn from "../../../img/garbage-btn.png";
import plusBtn from "../../../img/plus-btn.png";

import { getTodoList } from "../actions";

import EditTodoListModal from "./EditTodoListModal";
import DeleteTodoListModal from "./DeleteTodoListModal";
import DashboardPage from "./DashboardPage";
import Todos from "./Todos";
import AddTodoModal from "./AddTodoModal";

export class TodoListDetail extends React.Component {
  static propTypes = {
    todoListDetail: PropTypes.object,
    getTodoList: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    deleteTodoListIsSuccessfull: PropTypes.bool
  };

  static defaultProps = {
    todoListDetail: null,
    history: undefined,
    deleteTodoListIsSuccessfull: null
  };

  constructor(props) {
    super(props);

    this.state = {
      editTodoListModalIsOpen: false,
      deleteTodoListModalIsOpen: false,
      addTodoModalIsOpen: false
    };
  }

  componentDidMount() {
    const { match, getTodoList } = this.props;
    getTodoList(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      location,
      getTodoList,
      history,
      deleteTodoListIsSuccessfull
    } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      getTodoList(match.params.id);
    }

    if (deleteTodoListIsSuccessfull && !prevProps.deleteTodoListIsSuccessfull) {
      this.closeDeleteTodoListModal();
      history.push("/dashboard");
    }
  }

  openEditTodoListModal = () =>
    this.setState({ editTodoListModalIsOpen: true });

  openDeleteTodoListModal = () =>
    this.setState({ deleteTodoListModalIsOpen: true });

  closeEditTodoListModal = () =>
    this.setState({ editTodoListModalIsOpen: false });

  closeDeleteTodoListModal = () =>
    this.setState({ deleteTodoListModalIsOpen: false });

  openAddTodoModal = () => this.setState({ addTodoModalIsOpen: true });

  closeAddTodoModal = () => this.setState({ addTodoModalIsOpen: false });

  render() {
    const {
      editTodoListModalIsOpen,
      deleteTodoListModalIsOpen,
      addTodoModalIsOpen
    } = this.state;
    const { todoListDetail } = this.props;
    return (
      <DashboardPage>
        <div className="todo-list-detail">
          {todoListDetail ? (
            <Fragment>
              <h1>
                <strong>{todoListDetail.title}</strong>
                <Button variant="no-style" onClick={this.openEditTodoListModal}>
                  <img
                    src={pencilBtn}
                    alt="Edit Todo List"
                    className="todo-list-detail__edit-btn"
                  />
                </Button>
                <EditTodoListModal
                  show={editTodoListModalIsOpen}
                  onHide={this.closeEditTodoListModal}
                  todoList={todoListDetail}
                />
                <Button
                  variant="no-style"
                  onClick={this.openDeleteTodoListModal}
                >
                  <img
                    src={garbageBtn}
                    alt="Delete Todo List"
                    className="todo-list-detail__delete-btn"
                  />
                </Button>
                <DeleteTodoListModal
                  show={deleteTodoListModalIsOpen}
                  onHide={this.closeDeleteTodoListModal}
                  todoList={todoListDetail}
                />
              </h1>
              <p>
                (<strong>id</strong>:{todoListDetail.id}) (
                <strong>owner</strong>: {todoListDetail.owner})
              </p>
              <Todos todoListId={todoListDetail.id} />
              <br />
              <Button variant="dark" onClick={this.openAddTodoModal}>
                <img src={plusBtn} alt="Add Todo" className="todos__add-btn" />
              </Button>
              <AddTodoModal
                show={addTodoModalIsOpen}
                onHide={this.closeAddTodoModal}
                todoListId={todoListDetail.id}
              />
            </Fragment>
          ) : null}
        </div>
      </DashboardPage>
    );
  }
}

const mapStateToProps = state => ({
  todoListDetail: state.todo.todoListDetail,
  deleteTodoListIsSuccessfull: state.todo.deleteTodoListIsSuccessfull
});

const mapDispatchToProps = dispatch => ({
  getTodoList: todoListId => dispatch(getTodoList(todoListId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListDetail);

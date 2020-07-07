import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import moment from "moment";

import {
  createTodo,
  getTodos,
  clearCreateTodoSuccessMessage,
  clearCreateTodoErrors
} from "../actions";

import FormErrors from "../../FormErrors";

export class AddTodoModal extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
    todoListId: PropTypes.number.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    createTodoSuccessMessage: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    getTodos: PropTypes.func.isRequired,
    clearCreateTodoSuccessMessage: PropTypes.func.isRequired,
    createTodoErrors: PropTypes.object,
    clearCreateTodoErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    history: undefined,
    createTodoSuccessMessage: "",
    createTodoErrors: null
  };

  constructor(props) {
    super(props);

    this.state = {
      todoTitle: "",
      todoDeadline: moment().format("YYYY-MM-DD")
    };
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      createTodoSuccessMessage,
      todoListId,
      getTodos,
      clearCreateTodoSuccessMessage
    } = this.props;

    if (createTodoSuccessMessage && !prevProps.createTodoSuccessMessage) {
      getTodos(todoListId);
      this.handleCloseModal();
      clearCreateTodoSuccessMessage();
      history.push(`/todo-list/${todoListId}`);
    }
  }

  handleCloseModal = () => {
    const { onHide, clearCreateTodoErrors } = this.props;
    this.setState({
      todoTitle: "",
      todoDeadline: moment().format("YYYY-MM-DD")
    });
    clearCreateTodoErrors();
    onHide();
  };

  onSubmit = e => {
    e.preventDefault();
    const { todoTitle, todoDeadline } = this.state;
    const { todoListId, createTodo } = this.props;
    createTodo(todoListId, todoTitle, todoDeadline);
  };

  handleTodoTitleChange = e => {
    const { value } = e.target;
    this.setState({ todoTitle: value });
  };

  handleTodoDeadlineChange = e => {
    const { value } = e.target;
    this.setState({ todoDeadline: moment(value).format("YYYY-MM-DD") });
  };

  render() {
    const { todoTitle, todoDeadline } = this.state;
    const { show, createTodoErrors } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal}>
        <Form onSubmit={this.onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create To-Do</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="form-todo">
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                name="todoTitle"
                required
                type="text"
                placeholder="Insert title"
                value={todoTitle}
                onChange={this.handleTodoTitleChange}
              />
              <br />
              <Form.Label>
                <strong>Deadline</strong>
              </Form.Label>
              <Form.Control
                name="todoDeadline"
                required
                type="date"
                placeholder="Insert deadline"
                value={todoDeadline}
                onChange={this.handleTodoDeadlineChange}
              />
            </Form.Group>
            {createTodoErrors ? <FormErrors errors={createTodoErrors} /> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  createTodoSuccessMessage: state.todo.createTodoSuccessMessage,
  createTodoErrors: state.todo.createTodoErrors
});

const mapDispatchToProps = dispatch => ({
  createTodo: (todoListId, todoTitle, todoDeadline) =>
    dispatch(createTodo(todoListId, todoTitle, todoDeadline)),
  getTodos: todoListId => dispatch(getTodos(todoListId)),
  clearCreateTodoSuccessMessage: () =>
    dispatch(clearCreateTodoSuccessMessage()),
  clearCreateTodoErrors: () => dispatch(clearCreateTodoErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddTodoModal));

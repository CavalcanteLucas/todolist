import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav, Button, Modal, Form } from "react-bootstrap";

import plusBtn from "../../img/plus-btn.png";

import { createTodoList, clearCreateTodoListErrors } from "./actions";
import FormErrors from "../auth/components/FormErrors";

export class CreateTodoList extends React.Component {
  static propTypes = {
    createTodoList: PropTypes.func.isRequired,
    errors: PropTypes.object,
    clearCreateTodoListErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    errors: null
  }

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      todoListTitle: ""
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.props.clearCreateTodoListErrors();
  };

  openModal = () => this.setState({ modalIsOpen: true });

  onSubmit = e => {
    e.preventDefault();
    const { todoListTitle } = this.state;
    const { createTodoList } = this.props;
    createTodoList(todoListTitle);
//    this.closeModal();
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { modalIsOpen, todoListTitle } = this.state;
    const { errors } = this.props;

    return (
      <React.Fragment>
        <Nav className="action-bar flex-column" activeKey="/">
          <Nav.Item className="action-bar__item">
            <Nav.Link>
              <Button onClick={this.openModal}>
                <img
                  src={plusBtn}
                  alt="Add Todo"
                  className="action-bar__add-btn"
                />
              </Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Modal
          show={modalIsOpen}
          onHide={this.closeModal}
        >
          <Form onSubmit={this.onSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Create To-Do List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="form-todo-list-title">
                <Form.Label>
                  <strong>Title</strong>
                </Form.Label>
                <Form.Control
                  name="todoListTitle"
                  required
                  type="text"
                  placeholder="Insert title"
                  value={todoListTitle}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              {errors ? <FormErrors errors={errors} /> : null} 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.todo.createTodoListErrors
});

const mapDispatchToProps = dispatch => ({
  createTodoList: todoListTitle => dispatch(createTodoList(todoListTitle)),
  clearCreateTodoListErrors: () => dispatch(clearCreateTodoListErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodoList);

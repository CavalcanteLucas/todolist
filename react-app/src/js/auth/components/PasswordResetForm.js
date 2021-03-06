import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { passwordReset, clearPasswordResetErrors } from "../actions";
import FormErrors from "../../FormErrors";

export class PasswordResetForm extends React.Component {
  state = {
    email: ""
  };

  static propTypes = {
    passwordReset: PropTypes.func.isRequired,
    history: PropTypes.object,
    passwordResetIsSuccessfull: PropTypes.bool,
    passwordResetErrors: PropTypes.object,
    clearPasswordResetErrors: PropTypes.func.isRequired
  };

  static defaultProps = {
    history: null,
    passwordResetIsSuccessfull: false,
    passwordResetErrors: null
  };

  componentDidUpdate(prevProps) {
    const { passwordResetIsSuccessfull, history } = this.props;
    if (passwordResetIsSuccessfull && !prevProps.passwordResetIsSuccessfull) {
      history.push("/password_reset/confirm");
    }
  }

  componentWillUnmount() {
    const { clearPasswordResetErrors } = this.props;
    clearPasswordResetErrors();
  }

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const { passwordReset } = this.props;
    passwordReset(email);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email } = this.state;
    const { passwordResetErrors } = this.props;

    return (
      <div className="auth-page">
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs={{ span: 8, offset: 2 }}
              md={{ span: 6, offset: 0 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <div className="auth-form-card">
                <h4>Reset your password</h4>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="form-email">
                    <Form.Label>
                      Enter your user account`s verified email address and we
                      will send you a password reset link.
                    </Form.Label>
                    <Form.Control
                      name="email"
                      required
                      type="text"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  {passwordResetErrors ? (
                    <FormErrors errors={passwordResetErrors} />
                  ) : null}
                  <Button variant="success" type="submit" block>
                    Send password reset email
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  passwordResetIsSuccessfull: state.auth.passwordResetIsSuccessfull,
  passwordResetErrors: state.auth.passwordResetErrors
});

const mapDispatchToProps = dispatch => ({
  passwordReset: email => dispatch(passwordReset(email)),
  clearPasswordResetErrors: () => dispatch(clearPasswordResetErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);

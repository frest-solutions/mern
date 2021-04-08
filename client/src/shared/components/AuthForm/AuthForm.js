import {Button, Form} from "react-bootstrap";
import {DebounceInput} from "react-debounce-input";

function AuthForm(props) {

  const checkUsernameAvailability = (ev) => {
  }

  const handleInputChange = (ev) => {
  }

  const handleRegistration = (ev) => {

  }

  return (
    <Form className="auth-form">
      <Form.Group controlId="formEmail">
        <DebounceInput
          className="form-control"
          type="email"
          placeholder="Введите email"
          minLength={2}
          debounceTimeout={300}
          onChange={checkUsernameAvailability}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          name="password"
          minLength={8}
          placeholder="Введите пароль"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegistration}>
        Вход
      </Button>
    </Form>
  );
}

export default AuthForm;

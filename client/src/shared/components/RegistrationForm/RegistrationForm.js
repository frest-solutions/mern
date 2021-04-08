import {Button, Form} from "react-bootstrap";
import {DebounceInput} from "react-debounce-input";

const checkUsernameAvailability = (ev) => {
}

const handleInputChange = (ev) => {
}

const handleRegistration = (ev) => {

}

function RegistrationForm(props) {
  return (
    <Form className="auth-form">
      <Form.Group controlId="formUsername">
        <DebounceInput
          className="form-control"
          type="email"
          placeholder="Enter email"
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
          placeholder="Enter Password"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegistration}>
        Registration
      </Button>
    </Form>
  );
}

export default RegistrationForm;

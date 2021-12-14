import { Form, Button } from 'react-bootstrap';

const Signup = (props) => {
    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control id="signup-email" type="email" placeholder="Enter email" onChange={props.handleChange} />
                <Form.Label>Confirm Email address</Form.Label>
                <Form.Control id="confirm-email" type="email" placeholder="Confirm email" onChange={props.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="signup-password" type="password" placeholder="Password" onChange={props.handleChange} />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="confirm-password" type="password" placeholder="Confirm password" onChange={props.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={props.signup}>
                Signup
            </Button>
        </Form>
    );
}

export default Signup;
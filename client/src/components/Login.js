import { Form, Button } from 'react-bootstrap';

const Login = (props) => {
    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control id="login-email" type="email" placeholder="Enter email" onChange={props.handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="login-password" type="password" placeholder="Password" onChange={props.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={props.login}>
                Login
            </Button>
        </Form>
    );
}

export default Login;
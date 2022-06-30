import React from "react"
import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, userSelector} from '../userSlice'
import { useNavigate } from 'react-router-dom'

const Login = props => {
    const dispatch = useDispatch()
    const userData = useSelector(userSelector)
    let navigate = useNavigate()

    const [login, setLogin] = useState({
        email: '',
        password: '',
        isError: false,
        message: ''
    })

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    const handleInput = (event) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const userLogin = (event) => {
        event.preventDefault()
        
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(login.email) ) {
            setLogin( {
                ...login,
                isError: true,
                message: 'Introduce un e-mail válido'
            });
            return;
        }

        if(login.password.length > 4){

            if (! /[\d()+-]/g.test(login.password) ) {
                setLogin({
                    ...login,
                    isError: true,
                    message: 'Introduce un password válido'
                });
                return;
            };
            
        }else{
            setLogin({
                ...login,
                isError: true,
                message: 'El password debe de tener como mínimo 4 caracteres'
            });
            return;
        }

        setLogin({
            ...login,
            isError: false,
            errorMsg: ''
        });

        dispatch(loginUser(login.email, login.password))
        navigate('/')
    }

    return (
        <Row className="Login justify-content-md-center">
            <Col md={6}>
                <h1>Login</h1>
                <br></br>
                <Form onSubmit={userLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleInput} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                {/*ponerme el error bonito!*/}
                <p>{login.isError ? login.message : ''}</p>
                <p>{userData.isError ? userData.errorMessage : userData.successMessage}</p>
            </Col>
        </Row>
    )
}

export default Login
"use client";

import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Loading from '@/components/loadings/Loading';
import { useRouter } from 'next/navigation';
import './login.scss';

const host = process.env.HOST;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [already, setAlready] = useState(false);
    const [loadingCallApi, setLoadingCallApi] = useState(true);
    const router = useRouter();

    const onSubmit = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        console.log(email, password);
    }

    const handleLogin = (e: any) => {
        setLoadingCallApi(true);
        setAlready(false);
        axios.request({
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: `${host}/api/user/login`,
            timeout: 5000,
            responseType: 'json',
            data: {
                email_username: email,
                password: password,
            },
        }).then((response) => {
            if (response.status === 200 && response.data.email === email) {
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('employeeId', response.data.employee.id);
                localStorage.setItem('employeeFirstName', response.data.employee.first_name);
                localStorage.setItem('employeeLastName', response.data.employee.last_name);
                localStorage.setItem('employeeAvatar', response.data.employee.avatar);
                localStorage.setItem('employeeGender', response.data.employee.gender);
                localStorage.setItem('employeePosition', response.data.employee.position);
                return router.push('/time-sheet');
            }
            setLoadingCallApi(false);
        }).catch((error) => {
            console.error(error);
            setLoadingCallApi(false);
        });
    }

    useEffect(() => {
        if (!already) {
            setAlready(true);
        }
    }, [already]);

    useEffect(() => {
        setLoadingCallApi(false);
    }, []);

    return (
        <>
            {already == false ?
                <Loading></Loading>
                :
                <div className='bg-info d-flex vh-100'>
                    <Container className='align-items-center col-sm-7 col-lg-4 d-flex bg-info login-container' fluid>
                        <Container className='bg-white box-login col-xs-4 ' fluid>
                            <Form noValidate validated={validated} onSubmit={onSubmit} className='mt-4 form-login'>
                                <Form.Group className='d-flex justify-content-center'>
                                    <img src='https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png' className='w-50 h-50' alt="..." />
                                </Form.Group>

                                <Form.Group className=' form-outline mb-4' controlId='formGroupEmail'>
                                    <Form.Label className=''>Email:</Form.Label>
                                    <Form.Control required type='email' placeholder='Enter your email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3 form-outline ' controlId='formGroupPassword'>
                                    <Form.Label className=''>Password:</Form.Label>
                                    <Form.Control required type='password' placeholder='Enter your password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Check type='checkbox' label='Remember me' />
                                </Form.Group>
                                <div className='d-grid my-3 mt-4 pt-2'>
                                    <Button type='button' onClick={(event: any) => handleLogin(event)} disabled={loadingCallApi} >Login</Button>
                                </div>
                            </Form>
                        </Container>
                    </Container>
                </div>
            }
        </>
    );
}

export default Login;

import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { AiOutlineReload } from "react-icons/ai";
import Cookies from 'js-cookie'

const LForm = () => {
    const [status, setStatus] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    // axios.defaults.withCredentials = true;

    // function refreshPage() {
    //     window.location.reload(false);
    // }

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    let navigate = useNavigate();
    const onSubmit = data => {

        if (checked === true) {
            // Cookies.set('user_name', data.email);
            // Cookies.set('password', data.pass);
            Cookies.set('user_name', data.email, { domain: 'hasadahup.netlify.app' });
            Cookies.set('password', data.pass, { domain: 'hasadahup.netlify.app' });
        }

        axios.post('https://hasadahoup-mongo-server.herokuapp.com/up/db_user/login', data)
            .then(res => {
                if (res.data.access_token) {
                    sessionStorage.setItem("user", JSON.stringify(res.data));
                    setStatus(res.data.message)
                    navigate('/dashboard/db-home');
                    window.location.reload();
                } else {
                    // console.log(res.data);
                    setStatus(res.data);
                }
                // console.log(res)
            })
    };


    // remember me
    const uname = Cookies.get('user_name');
    const pword = Cookies.get('password');

    return (
        <Container className="py-5 text-center form-cc">
            <div className="pb-3">
                <p className="fs-2 fw-bold text-success mb-0">হাসাদাহ এডমিন প্যানেল</p>
                <p className="fs-5">অনুগ্রহ করে আপনার একাউন্টে লগইন করুন</p>
            </div>

            <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" defaultValue={uname ? uname : ""} placeholder="আপনার নাম"  {...register("email", { required: true })} />
                </Form.Group>
                {errors.email && <span>User name is required</span>}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" defaultValue={pword ? pword : ''} placeholder="পাসওয়ার্ড" {...register("pass", { required: true })} />
                </Form.Group>
                {errors.pass && <span>Password is required</span>}
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3">
                    <Form.Group className="mb-0 mb-md-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="মনে রাখুন" name="rememberme" onClick={handleClick} checked={checked} />
                    </Form.Group>

                    {/* <Button className="p-0" variant="outline" size="sm" onClick={refreshPage} data-toggle="tooltip" data-placement="bottom" title="Refresh Page"><AiOutlineReload /></Button> */}
                    <p>পাসওয়ার্ড ভুলে গেছেন?</p>
                </div>

                <div className="text-center d-flex flex-column justify-content-center align-items-center">

                    <Button className="px-5" variant="success" type="submit">
                        লগ ইন
                    </Button>

                    {/* {role ?
                        <Link to='dashboard'> <Button className="px-5 my-3" variant="success" type="submit">
                            ড্যাশবোর্ড
                        </Button></Link> : ''
                    } */}

                </div>
            </Form>

            {status ? <Alert className="mt-5">{status}</Alert> : ''}
        </Container >
    );
};

export default LForm;
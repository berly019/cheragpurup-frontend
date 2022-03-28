import axios from 'axios';
import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";

const LForm = () => {
    const [status, setStatus] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    // axios.defaults.withCredentials = true;

    function refreshPage() {
        window.location.reload(false);
    }

    let navigate = useNavigate();
    const onSubmit = data => {
        axios.post('https://khadimpur-mongoose-backend.herokuapp.com/up/db_user/login', data)
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
            })
        // console.log(data)
    };

    return (
        <Container className="py-5 text-center form-cc">
            <div className="pb-3">
                <p className="fs-2 fw-bold text-success mb-0">খাদিমপুর এডমিন প্যানেল</p>
                <p className="fs-5">অনুগ্রহ করে আপনার একাউন্টে লগইন করুন</p>
            </div>

            <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="আপনার নাম" {...register("email", { required: true })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="পাসওয়ার্ড" {...register("pass", { required: true })} />
                </Form.Group>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3">
                    <Form.Group className="mb-0 mb-md-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="মনে রাখুন" />
                    </Form.Group>
                    <Button className="p-0" variant="outline" size="sm" onClick={refreshPage} data-toggle="tooltip" data-placement="bottom" title="Refresh Page"><AiOutlineReload /></Button>
                    <p>পাসওয়ার্ড ভুলে গেছেন?</p>
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
                <div className="text-center d-flex flex-column justify-content-center align-items-center">

                    <Button className="px-5" variant="success" type="submit">
                        লগ ইন
                    </Button>

                </div>
            </Form>

            {status ? <Alert className="mt-5">{status}</Alert> : ''}
        </Container>
    );
};

export default LForm;
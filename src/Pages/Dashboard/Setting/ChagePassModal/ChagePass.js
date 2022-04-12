import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChagePass = () => {
    const [success, setSuccess] = React.useState(false);
    const [success2, setSuccess2] = React.useState('');
    // get user id
    const [id, setId] = React.useState(undefined);
    const token = JSON.parse(sessionStorage.getItem("user"));
    React.useEffect(() => {
        if (token) {
            fetch(`${process.env.REACT_APP_BASE_URL}/up/db_user/user/token`, {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token.access_token }
            }).then(response => response.json())
                .then(data => setId(data.data.userId));
        }
    }, [token]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (data.newPassword === data.newPassword2) {
            axios.put(`${process.env.REACT_APP_BASE_URL}/up/db_user/cng_pass/${id}`, (data), { headers: { Authorization: 'Bearer ' + token.access_token } })
                .then((res) => {
                    // console.log(res)
                    if (res?.data?.affectedRows > 0) {
                        setSuccess(true)
                    } else {
                        setSuccess2(res?.data)
                    }
                })
        } else {
            setSuccess2("Please retype your password")
        }
    };
    let navigate = useNavigate();

    if (success) {
        setTimeout(() => {
            window.location.reload();
            navigate('/login')
        }, 1000);
    }
    return (
        <Container className="w-75">
            <Row>
                <p className="fs-3 text-center text-danger">পাসওয়ার্ড পরিবর্তন করুন</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column className="fs-5" sm={4}>
                            পুরানো পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("oldPassword", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPasswordNew">
                        <Form.Label column className="fs-5" sm={4}>
                            নতুন পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("newPassword", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPasswordNew2">
                        <Form.Label column className="fs-5" sm={4}>
                            নিশ্চিত কর নতুন পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("newPassword2", { required: true })} />
                        </Col>
                    </Form.Group>

                    {errors.oldPassword && <span>This field is required</span>}
                    {errors.newPassword && <span>This field is required</span>}
                    {errors.newPassword2 && <span>This field is required</span>}

                    <Col className="text-center">
                        <Button type="submit" variant="outline-danger" className='px-4 mt-5'>পাসওয়ার্ড আপডেট করুন</Button>
                    </Col>
                </Form>

                {success && <div className="p-4 text-danger">Password Changed</div>}
                {success2 && <div className="p-4 text-danger">{success2}</div>}
            </Row>
        </Container>
    );
};

export default ChagePass;
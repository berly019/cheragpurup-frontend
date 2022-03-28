import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Setting = () => {
    const handleLogOut = () => {
        // Cookies.remove('userId', { path: '/', domain: '.nilanjona.com.bd' });
        sessionStorage.removeItem("user");
    }
    return (
        <Container className="mx-auto">
            <div className="d-flex flex-column align-items-center justify-content-center">
                {/* <Col className="text-center py-2"> */}
                <Button className="w-50 py-2 my-4" as={Link} to="/dashboard/change_pass" variant="outline-success"><BsEye /> পাসওয়ার্ড পরিবর্তন করুন</Button>
                {/* </Col> */}
                {/* <Col className="text-center"> */}
                <Button className="w-50 py-2" as={Link} to="/dashboard/profile" variant="outline-success"><AiOutlineUser /> প্রোফাইল পরিবর্তন করুন</Button>
                {/* </Col> */}
                {/* <Col className="text-center py-2"> */}
                <Button className="w-50 py-2 my-4" as={Link} onClick={handleLogOut} to="/home" variant="outline-danger"><MdLogout /> লগ আউট করুন</Button>
                {/* </Col> */}
            </div>
        </Container>
    );
};

export default Setting;








/* import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
    // const [pass1, setPass1] = React.useState([]);
    // const [pass2, setPass2] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [success2, setSuccess2] = React.useState('');

    const [id, setId] = React.useState(undefined)
    console.log(id);

    React.useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("user"));
        if (token) {
            axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/db_user', { headers: { 'token': token.access_token } })
                .then(res => {
                    setId(res?.data?.data?.id);
                    // setIsDB(true);
                })
        }
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`https://khadimpur-mongoose-backend.herokuapp.com/up/api/change/${id}`, data)
            .then((res) => {
                console.log(res)
                if (res?.data?.affectedRows > 0) {
                    setSuccess(true)
                } else {
                    setSuccess2(res?.data)
                }
            })
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
                <p className="fs-3 text-center">পাসওয়ার্ড পরিবর্তন করুন</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={4}>
                            পুরানো পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("oldPassword", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={4}>
                            নতুন পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password"  {...register("newPassword", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={4}>
                            নিশ্চিত কর নতুন পাসওয়ার্ড
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("newPassword", { required: true })} />
                        </Col>
                    </Form.Group>

                    {[errors.newPassword, errors.oldPassword] && <span>This field is required</span>}

                    <Col className="text-center">
                        <Button type="submit" variant="success" className='px-4'>পাসওয়ার্ড আপডেট করুন</Button>
                    </Col>
                </Form>

                {success && <div className="p-4 text-danger">Password Changed</div>}
                {success2 && <div className="p-4 text-danger">{success2}</div>}
            </Row>
        </Container>
    );
};

export default Setting; */
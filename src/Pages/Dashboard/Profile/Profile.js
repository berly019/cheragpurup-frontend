import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
// import { BsFacebook } from 'react-icons/bs';
// import { AiOutlineMail } from 'react-icons/ai';
// import { BiPhone } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';


const Profile = () => {
    const [isDisabled, setDisabled] = React.useState(true);
    const [show, toggleShow] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleEdit = () => {
        setDisabled(!isDisabled);
        toggleShow(!show)
    };

    // const iconSize = {
    //     height: '35px',
    //     width: '35px'
    // }

    // get user id
    const [id, setId] = React.useState(undefined);
    const token = JSON.parse(sessionStorage.getItem("user"));
    React.useEffect(() => {
        if (token) {
            fetch('https://hasadahoup-mongo-server.herokuapp.com/up/db_user/user/token', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token.access_token }
            }).then(response => response.json())
                .then(data => setId(data.data.userId));
        }
    }, [token]);

    // handle image loading
    const [image, setImage] = React.useState(null);
    const handleImageSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://hasadahoup-mongo-server.herokuapp.com/up/db_user/edit/image/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.affectedRows > 0) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error)
            });
    }

    // handle data
    const [data, setData] = React.useState([]);
    // console.log(data);
    React.useEffect(() => {
        /*         axios.get("https://hasadahoup-mongo-server.herokuapp.com/up/wchairman", {
                    headers: {
                        'token': token
                    }
                }) */
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/db_user/${id}`)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err)
                } else {
                    setData(res.data)
                }
            });
    }, [id, success]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`https://hasadahoup-mongo-server.herokuapp.com/up/db_user/edit/profile/${id}`, data)
            .then(res => {
                if (res.data) {
                    setSuccess(true)
                }
            })
    };

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <Container>
            <Row className="pb-4">
                <Col>
                    <p className="fs-5 mb-0">{data?.designation}</p>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleEdit}>
                        এডিট করুন
                    </Button>
                </Col>
            </Row>
            <Row sx={1} sm={2} className='justify-content-between align-items-center pb-3'>
                <Col className='d-flex align-items-center'>
                    <Image src={data?.image} style={{ height: '125px', width: '125px', borderRadius: '50%', border: '5px solid #C4C4C4' }} />
                    <span className='ms-5 fw-bold text-center'>
                        <p className='fs-5 mb-0'>{data?.name}</p>
                        <p className='mb-0'>{data?.designation}</p>
                    </span>
                </Col>
                <Col className="d-flex text-center">
                    {show && <Form size="sm" onSubmit={handleImageSubmit}>
                        <Form.Control size="sm" type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required />
                        <Button type="submit" size="sm">Update Image</Button>
                    </Form>}
                </Col>
                {/* <Col style={{ textAlign: 'right' }}>
                    <Link to='facebook.com'><BsFacebook style={iconSize} /></Link>
                    <Link to='facebook.com'><AiOutlineMail style={iconSize} className="mx-4" /></Link>
                    <Link to='facebook.com'><BiPhone style={iconSize} /></Link>
                </Col> */}
            </Row>
            <Form className="pt-3 pb-5 border-top" onSubmit={handleSubmit(onSubmit)}>
                <Row xs={1} >
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            Username
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" defaultValue={data?.name} disabled={isDisabled} required {...register("name", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            Designation
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" defaultValue={data?.designation} disabled={isDisabled} required {...register("designation", { required: true })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            Email
                        </Form.Label>
                        <Col sm="9">
                            {/* <Form.Control type="text" defaultValue={data?.email} disabled={isDisabled} required {...register("email", { required: true })} /> */}
                            <Form.Control title="You cannot change your email address 🙃" type="text" defaultValue={data?.email} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextName">
                        <Form.Label column sm="3">
                            Phone
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" defaultValue={data?.phone} disabled={isDisabled} required {...register("phone", { required: true })} />
                        </Col>
                    </Form.Group>
                </Row>
                {errors.exampleRequired && <span>This field is required</span>}
                {show && <div className="text-end">
                    <Button variant="primary mt-5" type="submit">Save</Button>
                </div>}
            </Form>
            {success && <div className="text-center">Data Successfully Submitted</div>}
        </Container>
    );
};

export default Profile;
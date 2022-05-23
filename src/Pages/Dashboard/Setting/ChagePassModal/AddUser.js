import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import useUser from '../../../../hooks/useUser.js'

const AddUser = () => {
    const { user } = useUser();

    const [success2, setSuccess2] = React.useState('');

    // get user
    const [dbUser, setUser] = useState([]);
    const [fUser, setFUser] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_user`)
            .then(res => {
                setUser(res.data);
                setFUser(res.data);
            })

    }, [])

    const addUser = (email, role) => {
        // setCommerces([...commerces, { holdingNo, payerName, guardianName, businessOrg, wordNo, village, pAreasTax, assignTax, collectedTax, mobileNo, totalTax, areasTax }]);
        const newData = ([...dbUser, { email, role }]);

        setUser(newData);
        setFUser(newData);
    }

    /* delete data */
    const deleteResident = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/db_user/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        setSuccess2(res.data)
                        const remain = (dbUser?.filter(Resident => Resident._id !== id))
                        setUser(remain);
                        setFUser(remain);
                        setSuccess2('')
                    }
                })
        }
    }


    const token = JSON.parse(sessionStorage.getItem("user"));
    const [role, setRole] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (role === '1' || role === '0') {
            setSuccess2('');
            axios.post(`${process.env.REACT_APP_BASE_URL}/up/db_user/multiple_user/create`, (data), { headers: { Authorization: 'Bearer ' + token.access_token } })
                .then((res) => {
                    // console.log(res)
                    if (res?.data?.user) {
                        addUser(data.email, data.role);
                        setSuccess2("ইউসার সফল ভাবে তৈরি হয়েছে।")
                        reset();
                    } else {
                        // console.log(res?.data.data)
                        setSuccess2(res?.data.data)
                    }
                })
        } else {
            setSuccess2("Please select a role")
        }
    };

    return (
        <Container className="w-75">
            <Row>
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-3 text-danger" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>নতুন ইউসার তৈরি করুন</p>
                </Col>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column className="fs-5" sm={4}>
                            ইউসার নামঃ
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" {...register("email", { required: true })} />
                        </Col>
                    </Form.Group>
                    {errors.username && <span className="text-danger">This field is required</span>}
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPasswordNew">
                        <Form.Label column className="fs-5" sm={4}>
                            পাসওয়ার্ডঃ
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" {...register("pass", { required: true })} />
                        </Col>
                    </Form.Group>
                    {errors.pass && <span className="text-danger">This field is required</span>}
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPasswordNew2">
                        <Form.Label column className="fs-5" sm={4}>
                            রোলঃ
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select aria-label="Default select example"  {...register("role")} onChange={(e) => setRole(e.target.value)} required>
                                <option>রোল সিলেক্ট করুন</option>
                                <option value="0">মডারেটর</option>
                                <option value="1">অ্যাডমিন</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    {errors.role && <span className="text-danger">This field is required</span>}


                    <Col className="text-center">
                        <Button type="submit" variant="outline-danger" className='px-4 mt-3'>পাসওয়ার্ড আপডেট করুন</Button>
                    </Col>
                </Form>

                {success2 && <div className="p-4 text-danger">{success2}</div>}
            </Row>

            <Row className="my-5">
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-3 text-danger" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>সকল ইউজার</p> </Col>

                <table className="table table-striped table-hover fs-6 text-center">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0.5rem 0 0' }}>নামঃ</th>
                            <th scope="col" className="fw-normal py-3">ইউজার নামঃ</th>
                            <th scope="col" className="fw-normal py-3">রোলঃ</th>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0 0.5rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fUser.map(data =>
                                <tr key={data?._id}>
                                    <td>{data?.name}</td>
                                    <td>{data?.email}</td>
                                    <td>{data?.role === '1' ? "অ্যাডমিন" : "মডারেটর"}</td>
                                    <td className='text-danger' style={{ cursor: 'pointer' }} >
                                        {data._id === user?.userId ? <RiDeleteBinLine style={{ width: "2rem" }} disabled /> : <RiDeleteBinLine style={{ width: "2rem" }} onClick={() => deleteResident(data._id)} />}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </Row>
        </Container>
    );
};

export default AddUser;
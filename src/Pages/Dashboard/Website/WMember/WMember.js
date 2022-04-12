import React from 'react';
import { Col, Container, Form, Image, Row, Button, Alert, Spinner } from 'react-bootstrap';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import WMemberAdd from './WMemberAdd/WMemberAdd';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import WMemberEdit from './WMemberEdit/WMemberEdit'

const WMember = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalId, setModalId] = React.useState(false);
    const [member, setMember] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState('');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/wmember`)
            .then((res) => {
                setMember(res.data)
                setIsLoading(true);
            })
    }, [success, member?._id, warn]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/wmember/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data.affectedRows > 0) {
                        setSuccess(true);
                    } else {
                        setWarn(res.data);
                    }
                });
        }
    };

    // spinner
    if (!isLoading) {
        return <div className="text-center 100vh pt-5">
            <Button variant="success" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
    }

    return (
        <Container>
            <div className="pb-5 text-end">
                <Button variant="success" onClick={() => setModalShow(true)}><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>

                <WMemberAdd
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <WMemberEdit
                    id={modalId}
                    show={modalEdit}
                    onHide={() => setModalEdit(false)}
                />
            </div>
            <Row xs={1} md={2} className="g-5 g-sm-5">
                {
                    member.map(dt =>
                        <Col key={dt?._id}>
                            <div className="bg-light">
                                <div className="p-3 border rounded d-flex justify-content-between">
                                    <p className="fs-5 mb-0">মেম্বার</p>
                                    <div>
                                        <FiEdit onClick={() => { setModalEdit(true); setModalId(dt._id) }} /> <RiDeleteBinLine className="text-danger" onClick={() => handleDelete(dt._id)} />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="d-flex flex-column flex-md-row">
                                        <div>
                                            <Image src={dt?.image} fluid style={{ width: '148px', height: '140px' }} />
                                        </div>
                                        <p className="ms-md-5">File name: image-321922-1593666104.jpg<br />
                                            File type: image/jpeg<br />
                                            Uploaded on: October 16, 2020<br />
                                            File size: 132 KB<br />
                                            Dimensions: 459 by 570 pixels
                                        </p>
                                    </div>
                                </div>
                                <Form className="p-5 border-top">
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Designation
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.desi} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Name
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.name} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Phone
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.phone} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Email
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.email} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Date of joining
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.doj?.slice(0, 10)} disabled />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    )
                }
            </Row>
            {success && <Alert>Data Successfully Deleted</Alert>}
            {warn ? <Alert>{warn}</Alert> : ''}
        </Container>
    );
};

export default WMember;
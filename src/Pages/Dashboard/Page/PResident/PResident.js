import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
// import { GoDiffAdded } from 'react-icons/go';
// import { RiDeleteBinLine } from 'react-icons/ri';
// import PRModalAdd from './PRModalAdd/PRModalAdd';
import PRModalEdit from './PRModalEdit/PRModalEdit';

const PResident = () => {
    // const [modalShow, setModalShow] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    // const [success, setSuccess] = React.useState(false);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/president')
            .then(data => {
                setData(data.data);
                setIsLoading(true);
            })
    }, [data?._id]);
    /* 
        const handleDelete = id => {
            const proceed = window.confirm('Are you sure, you want to delete?');
            if (proceed) {
                axios.delete(`https://khadimpur-mongoose-backend.herokuapp.com/up/president/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.affectedRows > 0) {
                            setSuccess(true);
                        }
                    });
            }
        } */

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
            {/* <PRModalAdd
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}

            <PRModalEdit
                id={modalId}
                show={modalEdit}
                onHide={() => setModalEdit(false)}
            />
            {
                data.map(dt =>
                    <div key={dt._id}>
                        <div>
                            <Col className="text-end" style={{ cursor: 'pointer' }}>
                                {/* <GoDiffAdded onClick={() => setModalShow(true)} />  */}
                                <Button variant="success" onClick={() => { setModalEdit(true); setModalId(dt?._id) }} size="sm"><FiEdit /> Edit</Button>
                                {/* <RiDeleteBinLine onClick={() => handleDelete(dt?.id)} className="text-danger" /> */}


                            </Col>
                            <Col className="d-flex align-items-center justify-content-center text-center">
                                <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Header Image</p>
                            </Col>
                            {/* {success && <Alert>Data Successfully Deleted</Alert>} */}
                            <Row className="border p-3 rounded-3" md={2}>
                                <Col md={8} className="d-flex flex-column flex-md-row">
                                    <Image src={dt?.image} fluid style={{ width: '216px', height: '132px' }} />
                                    <p className="ms-md-3">File name: image-321922-1593666104.jpg<br />
                                        File type: image/jpeg<br />
                                        Uploaded on: October 16, 2020<br />
                                        File size: 132 KB<br />
                                        Dimensions: 459 by 570 pixels
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="py-3">
                            <Col className="d-flex align-items-center justify-content-center text-center">
                                <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Header Text</p>
                            </Col>
                            <Row className="border p-3 rounded-3" md={2}>
                                <Col md={8}>
                                    <Form>
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
                                                Location
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" defaultValue={dt?.location} disabled />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            }
        </Container>
    );
};

export default PResident;
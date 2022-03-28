import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import PMModalEdit from './PMModalEdit/PMModalEdit';
import axios from 'axios';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import PBImageAdd from './PBImageAdd/PBImageAdd';
import PBImageEdit from './PBImageEdit/PBImageEdit';
import CreateIntro from './CreateIntro/CreateIntro';
import DataTableEdit from './DataTableEdit/DataTableEdit';
import EditIntro from './EditIntro/EditIntro'
import AboutImageEdit from './AboutImageEdit/AboutImageEdit'

const PMain = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [dataEdit, setDataEdit] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [PBShow, setPBShow] = React.useState(false);
    const [PBEdit, setPBEdit] = React.useState(false);
    const [aiEdit, setAIEdit] = React.useState(false);
    const [editInto, setEditIntro] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [warn, setWarn] = React.useState('');

    const [pMain, setPMain] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/pmain')
            .then(res => {
                console.log(res)
                setPMain(res?.data[0])
                setIsLoading(true)
            })
    }, [success, pMain?._id, warn]);

    const [pbImage, setpbImage] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/pbimage')
            .then(res => setpbImage(res?.data))
    }, [warn, pbImage._id]);

    const [intro, setIntro] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/intro')
            .then(res => setIntro(res?.data))
    }, [warn, intro._id])


    /*  const [pdf, setPdf] = useState([]);
     // for pdf
     const pdf2base64 = require('pdf-to-base64');
     // pdf2base64("http://www.africau.edu/images/default/sample.pdf")
     pdf2base64("https://stagingmb.herokuapp.com/users/admin_product/pdf/9ad8f6f88420af43a2b182ac594968d1.pdf")
         .then(
             (response) => {
                 console.log(response); //cGF0aC90by9maWxlLmpwZw==
                 setPdf(response); //cGF0aC90by9maWxlLmpwZw==
             }
         )
         .catch(
             (error) => {
                 console.log(error); //Exepection error....
             }
         ) */

    /*     const handleDelete = id => {
            const proceed = window.confirm('Are you sure, you want to delete?');
            if (proceed) {
                axios.delete(`https://khadimpur-mongoose-backend.herokuapp.com/up/pmain/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.affectedRows > 0) {
                            setSuccess(true);
                        }
                    });
            }
        }; */

    const handleImageDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this image?');
        if (proceed) {
            axios.delete(`https://khadimpur-mongoose-backend.herokuapp.com/up/pbimage/${id}`)
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setWarn(res.data);
                    }
                });
        }
    };

    const handleInstallationDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this image?');
        if (proceed) {
            axios.delete(`https://khadimpur-mongoose-backend.herokuapp.com/up/intro/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        setSuccess(true);
                    }
                });
        }
    };

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // data table
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/data_table`)
            .then((res) => setData(res.data[0]))
    }, [data?._id, warn])

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

    if (warn) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <Container>
            <PMModalEdit
                id={modalId}
                show={modalEdit}
                onHide={() => setModalEdit(false)}
            />
            <PBImageAdd
                show={PBShow}
                onHide={() => setPBShow(false)}
            />
            <PBImageEdit
                id={modalId}
                show={PBEdit}
                onHide={() => setPBEdit(false)}
            />

            <AboutImageEdit
                id={modalId}
                show={aiEdit}
                onHide={() => setAIEdit(false)}
            />



            <div>

                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Header Image</p>
                </Col>

                <Col className="text-end pb-3">
                    {/* <FiEdit className="text-danger" style={{ cursor: 'pointer' }} onClick={() => { setModalEdit(true); setModalId(pMain?._id) }} /> */}
                    <Button variant="success" onClick={() => { setModalEdit(true); setModalId(pMain?._id) }} size="sm"><FiEdit /> Edit</Button>
                    {/* <RiDeleteBinLine onClick={() => handleDelete(pMain?.id)} className="text-danger" /> */}
                </Col>
                <Row className="border p-3 rounded-3" md={2}>
                    <Col md={8} className="d-flex flex-column flex-md-row align-items-center">
                        <Image src={pMain?.image} fluid style={{ width: '216px', height: '132px' }} required />
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
                                    <Form.Control type="text" defaultValue={pMain?.name} required disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Location
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={pMain?.location} required disabled />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
            {success && <Alert>Data Deleted</Alert>}
            <div className="pb-5">
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>About Text</p>
                </Col>
                <Row className="border p-3 rounded-3" md={2}>
                    <Col md={8}>
                        <Form>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Title
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={pMain?.title} required disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Description
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={pMain?.description} as="textarea" style={{ height: '100px' }} required disabled />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>

            <div className="py-5 border-top border-bottom">

                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>About Image</p>
                </Col>

                <Col className="text-end pb-3">
                    <FiEdit onClick={() => { setAIEdit(true); setModalId(pMain?._id) }} />
                </Col>
                <Row className="rounded-3 g-4" xs="auto" sm={2} md={3} lg={3}>

                    <Col md={6} className="position-relative" >
                        <div className='border p-3 rounded-3'>
                            <Image src={pMain?.f_image} fluid style={{ width: '160px', height: '99px' }} />
                            <p>File name: image-321922-1593666104.jpg<br />
                                File type: image/jpeg<br />
                                Uploaded on: October 16, 2020<br />
                                File size: 132 KB
                            </p>
                        </div>
                        <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>

                            {/* <RiDeleteBinLine onClick={() => handleImageDelete(pMain?._id)} className="text-danger" /> */}
                        </div>
                    </Col>
                    <Col md={6} className="position-relative" >
                        <div className='border p-3 rounded-3'>
                            <Image src={pMain?.s_image} fluid style={{ width: '160px', height: '99px' }} />
                            <p>File name: image-321922-1593666104.jpg<br />
                                File type: image/jpeg<br />
                                Uploaded on: October 16, 2020<br />
                                File size: 132 KB
                            </p>
                        </div>
                        <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>
                            {/* <RiDeleteBinLine onClick={() => handleImageDelete(pMain?._id)} className="text-danger" /> */}
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="py-5 border-top border-bottom">
                <div>
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Soldier Image</p>
                    </Col>
                    <div className='text-end pb-3'>
                        <Button variant="success" onClick={() => setPBShow(true)} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>
                    </div>
                </div>
                <Row className="rounded-3 g-4" xs="auto" sm={2} md={3} lg={3}>
                    {
                        pbImage?.map(pbimg =>
                            <Col md={6} className="position-relative" key={pbimg?._id}>
                                <div className='border p-3 rounded-3'>
                                    <Image src={pbimg?.image} fluid style={{ width: '160px', height: '99px' }} />
                                    <Form className="pt-3">
                                        <Form.Group as={Col} className="mb-3">
                                            <Col>
                                                <Form.Control type="text" defaultValue={pbimg?.title} disabled />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    <p>File name: image-321922-1593666104.jpg<br />
                                        File type: image/jpeg<br />
                                        Uploaded on: October 16, 2020<br />
                                        File size: 132 KB
                                    </p>
                                </div>
                                {/* <Form className="position-absolute" style={{ top: '25px', right: '35px' }}>
                                    <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column>
                                            Title
                                        </Form.Label>
                                        <Col>
                                            <Form.Control type="text" defaultValue={pbimg?.title} disabled />
                                        </Col>
                                    </Form.Group>
                                </Form> */}
                                <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>
                                    <FiEdit onClick={() => { setPBEdit(true); setModalId(pbimg?._id) }} /> <RiDeleteBinLine onClick={() => handleImageDelete(pbimg?._id)} className="text-danger" />
                                </div>
                            </Col>
                        )
                    }
                </Row>
            </div>


            {/* data table */}
            <div className="py-5 border-bottom">
                <div>
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Data Table</p>
                    </Col>
                    <div className='text-end pb-3'>
                        <Button variant="success" onClick={() => setDataEdit(true)} size="sm"><FiEdit /> Edit</Button>
                    </div>
                    <DataTableEdit
                        show={dataEdit}
                        onHide={() => setDataEdit(false)}
                        id={data?._id}
                    />
                </div>
                <Row className="px-md-4 overflow-auto">
                    <table className="dltrc" style={{ background: "none" }}>
                        <tbody>
                            <tr className="dlheader">
                                {/* <td class="dlheader">Subject</td> */}
                                <td className="fw-normal p-3 dlheader">ডাকঘর</td>
                                <td className="fw-normal p-3 dlheader">গ্রাম</td>
                                <td className="fw-normal p-3 dlheader">মৌজা</td>
                                <td className="fw-normal p-3 dlheader">হাট বাজার</td>
                                <td className="fw-normal p-3 dlheader">মসজিদ</td>
                                <td className="fw-normal p-3 dlheader">শিক্ষা প্রতিষ্ঠান</td>
                                <td className="fw-normal p-3 dlheader">কবরস্থান</td>
                                <td className="fw-normal p-3 dlheader">ঈদ্গাহ মাঠ</td>
                                <td className="fw-normal p-3 dlheader">মন্দির	শ্মশান</td>
                            </tr>
                            <tr className="dlinfo hover01">
                                {/* <td className="dlinfo hover01">One</td> */}
                                <td className="dlinfo hover01 p-2">{data?.post_office} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.village} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.mouza} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.bazar} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.mosque} টি</td>
                                <td className='dlinfo hover01 p-2'>{data.edu_institute} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.grove} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.eid_gah} টি</td>
                                <td className='dlinfo hover01 p-2'>{data?.mondir} টি</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <Table responsive striped hover className="text-center">
                        <thead className="bg-success text-white rounded-3">
                            <tr>
                                <th scope="col" className="fw-normal py-4" style={{ borderRadius: '1rem 0 0' }}>ডাকঘর</th>
                                <th scope="col" className="fw-normal py-4">গ্রাম</th>
                                <th scope="col" className="fw-normal py-4">মৌজা</th>
                                <th scope="col" className="fw-normal py-4">হাট বাজার</th>
                                <th scope="col" className="fw-normal py-4">মসজিদ</th>
                                <th scope="col" className="fw-normal py-4">শিক্ষা প্রতিষ্ঠান</th>
                                <th scope="col" className="fw-normal py-4">কবরস্থান</th>
                                <th scope="col" className="fw-normal py-4">ঈদ্গাহ মাঠ</th>
                                <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 1rem 0 0' }}>মন্দির	শ্মশান</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.post_office} টি</td>
                                <td>{data?.village} টি</td>
                                <td>{data?.mouza} টি</td>
                                <td>{data?.bazar} টি</td>
                                <td>{data?.mosque} টি</td>
                                <td>{data.edu_institute} টি</td>
                                <td>{data?.grove} টি</td>
                                <td>{data?.eid_gah} টি</td>
                                <td>{data?.mondir} টি</td>
                            </tr>
                        </tbody>
                    </Table> */}
                </Row>
            </div>
            {warn ? <Alert>{warn}</Alert> : ''}
            {/* Installation Image */}
            <div className="pt-5">
                <div>
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Installation Image</p>
                    </Col>
                    <div className='text-end pb-3'>
                        <Button variant="success" onClick={() => setModalShow(true)} size="sm"><HiOutlinePlusCircle /> নতুন সংযুক্ত</Button>
                    </div>
                    <CreateIntro
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <EditIntro
                        id={modalId}
                        show={editInto}
                        onHide={() => setEditIntro(false)}
                    />
                </div>
                <Row xs={1} sm={2} md={3}>
                    {
                        intro?.map(int =>
                            <Col key={int._id} className="py-3">
                                <Card
                                    text='dark'
                                    style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4', border: "2px solid #00AA55" }}
                                    className="mb-2 mx-auto h-100"
                                >
                                    <Card.Header className="fs-4" style={{ backgroundColor: '#fff', borderRadius: "1rem 1rem 0 0", borderBottom: "2px solid #00AA55" }}>{int.title}</Card.Header>
                                    <Card.Body className="p-0 d-flex align-items-center">
                                        <Image className="w-50" fluid src={int?.image} style={{ borderRadius: '0 0 0 0.90rem', height: "-webkit-fill-available" }} />
                                        <Card.Text className="w-50 p-1 p-md-2" style={{ textAlign: 'justify' }}>
                                            {int?.texts?.slice(0, 2).map(txt =>
                                                <p key={txt._id}>{txt?.serialNo}। {txt?.descText}</p>
                                            )}

                                            {/* {int?.text1 ? <p>১। {int?.text1}</p> : ""}
                                            {int?.text2 ? <p>২। {int?.text2}</p> : ""}
                                            {int?.text3 ? <p>৩। {int?.text3}</p> : ""}
                                            {int?.text4 ? <p>৪। {int?.text4}</p> : ""}
                                            {int?.text5 ? <p>৫। {int?.text5}</p> : ""} */}
                                        </Card.Text>
                                    </Card.Body>
                                    <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>
                                        <FiEdit onClick={() => { setEditIntro(true); setModalId(int?._id) }} /> <RiDeleteBinLine onClick={() => handleInstallationDelete(int?._id)} className="text-danger" />
                                    </div>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </div>

            {/* <div>
                <img src={`data:application/pdf;base64,${pdf}`} alt="isdnfjksd sdjfk " />
            </div> */}
        </Container>
    );
};

export default PMain;
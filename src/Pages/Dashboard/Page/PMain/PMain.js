import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Image, Modal, Row, Spinner } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import PMModalEdit from './PMModalEdit/PMModalEdit';
import axios from 'axios';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import PBImageAdd from './PBImageAdd/PBImageAdd';
import PBImageEdit from './PBImageEdit/PBImageEdit';
import CreateIntro from './CreateIntro/CreateIntro';
import DataTableEdit from './DataTableEdit/DataTableEdit';
import EditIntro from './EditIntro/EditIntro';
import AboutImageEdit from './AboutImageEdit/AboutImageEdit';
import { DataContext } from '../../../../contexts/DataContext';

const PMain = () => {

    const { isLoading, pMainData,  pbImage, setpbImage, intro, setIntro, dataTable } = useContext(DataContext);

    const [modalShow, setModalShow] = React.useState(false);
    const [dataEdit, setDataEdit] = React.useState(false);
    const [PBShow, setPBShow] = React.useState(false);
    const [PBEdit, setPBEdit] = React.useState(false);
    const [aiEdit, setAIEdit] = React.useState(false);
    const [editInto, setEditIntro] = React.useState(false);
    const [modalId, setModalId] = React.useState('');

    const [modalEData, setModalEData] = React.useState('');

    const [showAlert, setShowAlert] = useState(false);

    // for edit modal
    const [showE, setShowE] = useState(false);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);



    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000)
    }
    // const [rerender, setRerender] = useState(false);

    useEffect(() => {
        handleCloseE();

        return () => {
            handleShowAlert();
        }
    }, [pMainData, pbImage, intro, dataTable]);


    // const [pbImage, setpbImage] = React.useState([]);
    // React.useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/pbimage`)
    //         .then(res => setpbImage(res?.data))
    // }, [warn, pbImage._id]);

    // const [intro, setIntro] = React.useState([]);
    // React.useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/intro`)
    //         .then(res => setIntro(res?.data))
    // }, [warn, intro._id])


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
                axios.delete(`${process.env.REACT_APP_BASE_URL}/up/pmain/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.affectedRows > 0) {
                            setSuccess(true);
                        }
                    });
            }
        }; */

    // soldier image delete
    const handleImageDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this image?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/pbimage/${id}`)
                .then((res) => {
                    if (res.data) {
                        const remain = (pbImage?.filter(Commerce => Commerce._id !== id))
                        setpbImage(remain);
                    }
                });
        }
    };

    const handleInstallationDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this image?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/intro/${id}`)
                .then((res) => {
                    // console.log(res);    
                    if (res.data) {
                        const remain = (intro?.filter(Commerce => Commerce._id !== id))
                        setIntro(remain);
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

    // if (warn) {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1500);
    // }

    return (
        <Container>
            {/* <PMModalEdit
                data={modalEData}
                show={modalEdit}
                onHide={() => setModalEdit(false)}
            /> */}
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
                    <Button variant="success" onClick={() => { handleShowE(); setModalEData(pMainData) }} size="sm"><FiEdit /> Edit</Button>
                    {/* <RiDeleteBinLine onClick={() => handleDelete(pMainData?.id)} className="text-danger" /> */}
                </Col>
                <Row className="border p-3 rounded-3" md={2}>
                    <Col md={8} className="d-flex flex-column flex-md-row align-items-center">
                        <Image src={pMainData?.image} fluid style={{ width: '216px', height: '132px' }} required />
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
                                    <Form.Control type="text" value={pMainData?.name} required disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Location
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" value={pMainData?.location} required disabled />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>

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
                                    <Form.Control type="text" value={pMainData?.title} required disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Description
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" value={pMainData?.description} as="textarea" style={{ height: '100px' }} required disabled />
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
                    <FiEdit onClick={() => { setAIEdit(true); setModalId(pMainData?._id) }} />
                </Col>
                <Row className="rounded-3 g-4" xs="auto" sm={2} md={3} lg={3}>

                    <Col md={6} className="position-relative" >
                        <div className='border p-3 rounded-3'>
                            <Image src={pMainData?.f_image} fluid style={{ width: '160px', height: '99px' }} />
                            <p>File name: image-321922-1593666104.jpg<br />
                                File type: image/jpeg<br />
                                Uploaded on: October 16, 2020<br />
                                File size: 132 KB
                            </p>
                        </div>
                        <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>

                            {/* <RiDeleteBinLine onClick={() => handleImageDelete(pMainData?._id)} className="text-danger" /> */}
                        </div>
                    </Col>
                    <Col md={6} className="position-relative" >
                        <div className='border p-3 rounded-3'>
                            <Image src={pMainData?.s_image} fluid style={{ width: '160px', height: '99px' }} />
                            <p>File name: image-321922-1593666104.jpg<br />
                                File type: image/jpeg<br />
                                Uploaded on: October 16, 2020<br />
                                File size: 132 KB
                            </p>
                        </div>
                        <div className="position-absolute" style={{ top: '5px', right: '20px', cursor: 'pointer' }}>
                            {/* <RiDeleteBinLine onClick={() => handleImageDelete(pMainData?._id)} className="text-danger" /> */}
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
                        <Button variant="success" onClick={() => setPBShow(true)} size="sm"><HiOutlinePlusCircle /> ????????????????????? ????????????</Button>
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
                        id={dataTable?._id}
                    />
                </div>
                <Row className="px-md-4 overflow-auto">
                    <table className="dltrc" style={{ background: "none" }}>
                        <tbody>
                            <tr className="dlheader">
                                {/* <td class="dlheader">Subject</td> */}
                                <td className="fw-normal p-3 dlheader">???????????????</td>
                                <td className="fw-normal p-3 dlheader">???????????????</td>
                                <td className="fw-normal p-3 dlheader">????????????</td>
                                <td className="fw-normal p-3 dlheader">????????? ???????????????</td>
                                <td className="fw-normal p-3 dlheader">???????????????</td>
                                <td className="fw-normal p-3 dlheader">?????????????????? ??????????????????????????????</td>
                                <td className="fw-normal p-3 dlheader">????????????????????????</td>
                                <td className="fw-normal p-3 dlheader">?????????????????? ?????????</td>
                                <td className="fw-normal p-3 dlheader">??????????????????	??????????????????</td>
                            </tr>
                            <tr className="dlinfo hover01">
                                {/* <td className="dlinfo hover01">One</td> */}
                                <td className="dlinfo hover01 p-2">{dataTable?.post_office} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.village} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.mouza} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.bazar} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.mosque} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable.edu_institute} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.grove} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.eid_gah} ??????</td>
                                <td className='dlinfo hover01 p-2'>{dataTable?.mondir} ??????</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <Table responsive striped hover className="text-center">
                        <thead className="bg-success text-white rounded-3">
                            <tr>
                                <th scope="col" className="fw-normal py-4" style={{ borderRadius: '1rem 0 0' }}>???????????????</th>
                                <th scope="col" className="fw-normal py-4">???????????????</th>
                                <th scope="col" className="fw-normal py-4">????????????</th>
                                <th scope="col" className="fw-normal py-4">????????? ???????????????</th>
                                <th scope="col" className="fw-normal py-4">???????????????</th>
                                <th scope="col" className="fw-normal py-4">?????????????????? ??????????????????????????????</th>
                                <th scope="col" className="fw-normal py-4">????????????????????????</th>
                                <th scope="col" className="fw-normal py-4">?????????????????? ?????????</th>
                                <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 1rem 0 0' }}>??????????????????	??????????????????</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data?.post_office} ??????</td>
                                <td>{data?.village} ??????</td>
                                <td>{data?.mouza} ??????</td>
                                <td>{data?.bazar} ??????</td>
                                <td>{data?.mosque} ??????</td>
                                <td>{data.edu_institute} ??????</td>
                                <td>{data?.grove} ??????</td>
                                <td>{data?.eid_gah} ??????</td>
                                <td>{data?.mondir} ??????</td>
                            </tr>
                        </tbody>
                    </Table> */}
                </Row>
            </div>

            {/* Installation Image */}
            <div className="pt-5">
                <div>
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Installation Image</p>
                    </Col>
                    <div className='text-end pb-3'>
                        <Button variant="success" onClick={() => setModalShow(true)} size="sm"><HiOutlinePlusCircle /> ???????????? ?????????????????????</Button>
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
                                                <p key={txt._id}>{txt?.serialNo}??? {txt?.descText}</p>
                                            )}

                                            {/* {int?.text1 ? <p>?????? {int?.text1}</p> : ""}
                                            {int?.text2 ? <p>?????? {int?.text2}</p> : ""}
                                            {int?.text3 ? <p>?????? {int?.text3}</p> : ""}
                                            {int?.text4 ? <p>?????? {int?.text4}</p> : ""}
                                            {int?.text5 ? <p>?????? {int?.text5}</p> : ""} */}
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


            {/* PM edit data */}
            <Modal className="overflow-auto" show={showE} onHide={handleCloseE}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Update Main Page</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <Container className="py-5 border-top">
                        <PMModalEdit data={modalEData} />
                    </Container>
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Main Page Updated Successfully!
            </Alert>
        </Container>
    );
};

export default PMain;
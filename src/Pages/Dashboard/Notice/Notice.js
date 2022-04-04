import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Image, Row, Spinner, Table, } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import CreateNotice from './CreateNotice/CreateNotice';
import EditNotice from './EditNotice/EditNotice';
import ShowNotice from './ShowNotice/ShowNotice';

import CreateRunNotice from './CreateRunNotice/CreateRunNotice';
import EditRunNotice from './EditRunNotice/EditRunNotice';
// import ShowNotice from './ShowNotice/ShowNotice';

const Notice = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowF, setModalShowF] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);

    const [modalRunShow, setModalRunShow] = React.useState(false);
    const [modalRunEdit, setModalRunEdit] = React.useState(false);

    const [modalId, setModalId] = React.useState('');
    const [modalRunId, setModalRunId] = React.useState('');
    const [success, setSuccess] = React.useState('')
    const [data, setData] = useState([]);
    const [runData, setRunData] = useState([]);
    useEffect(() => {
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/notice')
            .then(data => {
                setData(data.data);
                setIsLoading(true);
                // console.log(data.data);
            })

        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/run_notice')
            .then(data => {
                setRunData(data.data);
                setIsLoading(true);
                // console.log(data.data);
            })
    }, [modalShow, data?.id, success]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/notice/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        setSuccess(true);
                    }
                });
        }
    }
    const handleRunDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/run_notice/${id}`)
                .then((res) => {
                    // console.log(res)
                    // console.log(res);
                    if (res.data) {
                        setSuccess(true);
                    }
                });
        }
    }
    // if(success){
    //     setTimeout(() => {
    //         window.location.reload();
    //       }, 1000);
    // }

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
            <div>


                <CreateNotice
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <EditNotice
                    id={modalId}
                    show={modalEdit}
                    onHide={() => setModalEdit(false)}
                />
                <ShowNotice
                    id={modalId}
                    show={modalShowF}
                    onHide={() => setModalShowF(false)}
                />

                <CreateRunNotice
                    show={modalRunShow}
                    onHide={() => setModalRunShow(false)}
                />
                <EditRunNotice
                    id={modalRunId}
                    show={modalRunEdit}
                    onHide={() => setModalRunEdit(false)}
                />
            </div>

            {/* data table */}
            <Row>
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>ক্যারজেল এর মত নোটিশ</p>
                </Col>
                <div className="text-end">
                    <Button variant="success" className="rounded-3 px-2" onClick={() => setModalShow(true)} size="sm"><MdOutlineDashboardCustomize /> সংযুক্ত করুন</Button>
                </div>
            </Row>
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <Table className="table table-hover fs-6 text-center">
                    <thead>
                        <tr>
                            <th scope="col">প্রিভিও</th>
                            <th scope="col">টাইটেল</th>
                            <th scope="col">সাব টাইটেল</th>
                            <th scope="col">ডেসক্রিপসন</th>
                            <th scope="col">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(data => <tr key={data._id}>
                                <td><Image fluid style={{ height: '52px', width: '97px' }} src={data.image} /></td>
                                <td>{data.title}</td>
                                <td>{data.subtitle}</td>
                                <td>{data.desc}</td>
                                <td className='text-danger' style={{ cursor: 'pointer' }}><BsEye onClick={() => { setModalShowF(true); setModalId(data._id) }} /> <FiEdit className="mx-4" onClick={() => { setModalEdit(true); setModalId(data._id) }} /> <RiDeleteBinLine onClick={() => handleDelete(data._id)} /></td>
                            </tr>)
                        }
                    </tbody>
                </Table>

                {success ?
                    <Alert className="m-2 p-2 text-center w-50 mx-auto">Data Successfully Deleted!</Alert>
                    : ''}
            </Row>

            {/* notice table */}
            <Row className="pt-3">
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>চলমান নোটিশ</p>
                </Col>
                <div className="text-end">
                    <Button variant="success" className="rounded-3 px-2" onClick={() => setModalRunShow(true)} size="sm"><MdOutlineDashboardCustomize /> সংযুক্ত করুন</Button>
                </div>
            </Row>
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <Table className="table table-hover fs-6 text-center">
                    <thead>
                        <tr>
                            <th scope="col">টাইটেল</th>
                            <th scope="col">নটিশ</th>
                            <th scope="col">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            runData.map(data =>
                                <tr key={data._id}>
                                    <td>{data.title}</td>
                                    <td>{data.notice}</td>
                                    <td className='text-danger' style={{ cursor: 'pointer' }}><FiEdit className="mx-4" onClick={() => { setModalRunEdit(true); setModalRunId(data?._id) }} /> <RiDeleteBinLine onClick={() => handleRunDelete(data?._id)} /></td>
                                </tr>)
                        }
                    </tbody>
                </Table>

                {success ?
                    <Alert className="m-2 p-2 text-center w-50 mx-auto">Data Successfully Deleted!</Alert>
                    : ''}
            </Row>
        </Container>
    );
};

export default Notice;
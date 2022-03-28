import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Modal, } from 'react-bootstrap';

const ShowModal = (props) => {
    const id = props.id;

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/intro/${id}`)
            .then((data) => {
                setData(data.data);
            })
    }, [id])

    return (
        <Modal className="overflow-auto"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >
            <div key={data?._id}>
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">{data?.title}</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <Container className="text-center py-5 border-top" >
                        {data?.texts?.map(txt =>
                            <p className="fs-5">{txt?.serialNo}। {txt?.descText}</p>
                        )}
                    </Container>
                </Modal.Body>
            </div>
        </Modal >
    );
};

export default ShowModal;
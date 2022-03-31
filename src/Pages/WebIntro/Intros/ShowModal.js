import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Modal, } from 'react-bootstrap';

const ShowModal = (props) => {
    const { id } = props;

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
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">আবাসিক করদাতা</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5" >
                <Container className="text-center py-5 border-top" >
                    {data?.texts?.map(txt =>
                        <p key={txt?._id} className="fs-5">{txt?.serialNo}। {txt?.descText}</p>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default ShowModal;
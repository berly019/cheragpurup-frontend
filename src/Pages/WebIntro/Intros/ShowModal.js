// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { Container, Modal, Table, } from 'react-bootstrap';

const ShowModal = (props) => {
    const { id, data } = props;

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/intro/${id}`)
    //         .then((data) => {
    //             setData(data.data);
    //         })
    // }, [id])

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
                    <p className="text-success m-0 fs-4">{data?.title}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5" key={id}>
                <Container className="text-center py-5 border-top" >

                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>নাম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.texts?.map(txt =>
                                <tr key={txt?._id} >
                                    <td>{txt?.serialNo}</td>
                                    <td>{txt?.descText}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* {data?.texts?.map(txt =>
                        <p key={txt?._id} className="fs-5">{txt?.serialNo}। {txt?.descText}</p>
                    )} */}
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default ShowModal;
import { Container, Modal, } from 'react-bootstrap';

const ShowAbout = (props) => {

    const { data, title } = props;

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
                    <p className="text-success m-0 fs-3">{title}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5" >
                <Container className="text-center py-5 border-top" >
                    <p className='fs-5' style={{ textAlign: "justify" }}>
                        {data}
                    </p>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default ShowAbout;
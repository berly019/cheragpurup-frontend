import React, { useContext } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../../contexts/DataContext';

const CNModalEdit = ({ data }) => {

    const { updateCNagorik } = useContext(DataContext)

    const id  = data._id;

    const [memorandum_no, setMemorandum_no] = React.useState(data?.memorandum_no);
    const [nId_no, setNId_no] = React.useState(data?.nId_no);
    const [holding_no, setHolding_no] = React.useState(data?.holding_no);
    const [village, setVillage] = React.useState(data?.village);
    const [applicant_name, setApplicant_name] = React.useState(data?.applicant_name);
    const [post_office, setPost_office] = React.useState(data?.post_office);
    const [guardian_name, setGuardian_name] = React.useState(data?.guardian_name);
    const [word_no, setWord_no] = React.useState(data?.word_no);
    const [mother_name, setMother_name] = React.useState(data?.mother_name);
    const [marital_status, setSelectValue] = React.useState(data?.marital_status)


    const updatedCN = { id, memorandum_no, nId_no, holding_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status }

    const handleSubmit = (e) => {
        e.preventDefault();

        data.memorandum_no = memorandum_no
        data.nId_no = nId_no
        data.holding_no = holding_no
        data.village = village
        data.applicant_name = applicant_name
        data.post_office = post_office
        data.guardian_name = guardian_name
        data.word_no = word_no
        data.mother_name = mother_name
        data.marital_status = marital_status

        fetch(`${process.env.REACT_APP_BASE_URL}/up/citizen_certificate/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                res.json()
                // console.log(res);
                if (res.status === 200) {
                    updateCNagorik(id, updatedCN);
                }
            })
    }


    return (

        <Form className="py-5 border-top " onSubmit={handleSubmit}>
            <Row xs={1} lg={2} key={data?._id}>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ?????????????????? ?????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={memorandum_no} onChange={(e) => setMemorandum_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="5">
                        ??????????????? ??????????????????????????? ?????????
                    </Form.Label>
                    <Col sm="7">
                        <Form.Control type="number" defaultValue={nId_no} onChange={(e) => setNId_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ????????????????????? ?????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={holding_no} onChange={(e) => setHolding_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4" lg="4">
                        ??????????????????
                    </Form.Label>
                    <Col sm="8" lg="8">
                        <Form.Control type="text" defaultValue={village} onChange={(e) => setVillage(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ?????????????????????????????? ????????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={applicant_name} onChange={(e) => setApplicant_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ??????????????? ???????????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={post_office} onChange={(e) => setPost_office(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ????????????/????????????????????? ????????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={guardian_name} onChange={(e) => setGuardian_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ?????????????????? ?????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={word_no} onChange={(e) => setWord_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ??????????????? ????????????
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={mother_name} onChange={(e) => setMother_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ????????????????????? ??????????????????????????????
                    </Form.Label>
                    <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)}>
                        <option>????????????????????? ???????????? ({marital_status})</option>
                        <option value="?????????????????????">?????????????????????</option>
                        <option value="????????????????????????">????????????????????????</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
            </div>
        </Form>

    );
}

export default CNModalEdit;
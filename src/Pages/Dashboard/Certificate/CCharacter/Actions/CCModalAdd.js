import React, { useContext } from 'react';
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../../contexts/DataContext';

const CCModalAdd = () => {

    const { addCCharacter } = useContext(DataContext);

    const [memorandum_no, setMemorandum_no] = React.useState('');
    const [village, setVillage] = React.useState('');
    const [applicant_name, setApplicant_name] = React.useState('');
    const [post_office, setPost_office] = React.useState('');
    const [guardian_name, setGuardian_name] = React.useState('');
    const [word_no, setWord_no] = React.useState('');
    const [mother_name, setMother_name] = React.useState('');
    const [marital_status, setSelectValue] = React.useState(null)

    
    const [status, setStatus] = React.useState(false);

    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};

        data.memorandum_no = memorandum_no;
        data.village = village;
        data.applicant_name = applicant_name;
        data.post_office = post_office;
        data.guardian_name = guardian_name;
        data.word_no = word_no;
        data.mother_name = mother_name;
        data.marital_status = marital_status;

        if (marital_status === null) {
            setStatus(true)
        } else {

            fetch(`${process.env.REACT_APP_BASE_URL}/up/character_certificate`, {
                method: 'post',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    res.json()
                    if (res.status === 200) {
                        addCCharacter(memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status);
                    }
                })
        }
    }

    return (

        <Form className="py-5 border-top" onSubmit={handleSubmit}>
            <Row xs={1} lg={2}>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        স্মারক নংঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setMemorandum_no(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4" lg="4">
                        গ্রামঃ
                    </Form.Label>
                    <Col sm="8" lg="8">
                        <Form.Control type="text" onChange={(e) => setVillage(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        আবেদনকারীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setApplicant_name(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        পোস্ট অফিসঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setPost_office(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        পিতা/স্বামীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setGuardian_name(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ওয়ার্ড নংঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setWord_no(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        মাতার নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setMother_name(e.target.value)} required />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("marital_status", { required: true })} />
                            </Col>
                        </Form.Group> */}
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        বৈবাহিক স্ট্যাটাসঃ
                    </Form.Label>
                    <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)} required>
                        <option>সিলেক্ট করুন</option>
                        <option value="বিবাহিত">বিবাহিত</option>
                        <option value="অবিবাহিত">অবিবাহিত</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            {status === true ? <Alert className="m-2 p-2 text-center">বৈবাহিক স্ট্যাটাস Required!</Alert> : ''}
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
            </div>
        </Form>

    );
}
export default CCModalAdd;
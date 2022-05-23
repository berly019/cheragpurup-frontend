import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../contexts/DataContext';

const TLModalEdit = ({ data }) => {
    const id = data._id;

    const { updateTreadLicense } = useContext(DataContext)

    const [license_no, setLicense_no] = useState(data.license_no);
    const [institute_address, setInstitute_address] = useState(data.institute_address);
    const [institute_name, setInstitute_name] = useState(data.institute_name);
    const [profession_capital, setProfession_capital] = useState(data.profession_capital);
    const [owner_name, setOwner_name] = useState(data.owner_name);
    const [license_fee, setLicense_fee] = useState(data.license_fee);
    const [guardian_name, setGuardian_name] = useState(data.guardian_name);
    const [arrears, setArrears] = useState(data.arrears);
    const [mothers_name, setMothers_name] = useState(data.mothers_name);
    const [total, setTotal] = useState(data.total);
    const [address, setAddress] = useState(data.address);
    const [in_words, setIn_words] = useState(data.in_words);
    const [business_type, setBusiness_type] = useState(data.business_type);
    const [mobile_no, setMobile_no] = useState(data.mobile_no);

    const updatedTL = { id, license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no }


    const handleSubmit = (e) => {
        e.preventDefault();

        data.license_no = license_no;
        data.institute_address = institute_address;
        data.institute_name = institute_name;
        data.profession_capital = profession_capital;
        data.owner_name = owner_name;
        data.license_fee = license_fee;
        data.guardian_name = guardian_name;
        data.arrears = arrears;
        data.mothers_name = mothers_name;
        data.total = total;
        data.address = address;
        data.in_words = in_words;
        data.business_type = business_type;
        data.mobile_no = mobile_no;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/tread_license/${id}`, {
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
                    updateTreadLicense(id, updatedTL);
                }
            })
    }

    return (

        <Form key={id} className="py-5 border-top " onSubmit={handleSubmit}>
            <Row xs={1} md={2}>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্স নংঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={license_no} onChange={(e) => setLicense_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4" lg="4">
                        ব্যবসা প্রতিষ্ঠানের ঠিকানাঃ
                    </Form.Label>
                    <Col sm="8" lg="8">
                        <Form.Control type="text" defaultValue={institute_address} onChange={(e) => setInstitute_address(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ব্যবসা প্রতিষ্ঠানের নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={institute_name} onChange={(e) => setInstitute_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ব্যবসার/পেশার মূলধনঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={profession_capital} onChange={(e) => setProfession_capital(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্সধারীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={owner_name} onChange={(e) => setOwner_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্স ফি (+ভ্যাট)
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={license_fee} onChange={(e) => setLicense_fee(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        পিতা/স্বামীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={guardian_name} onChange={(e) => setGuardian_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        বকেয়াঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={arrears} onChange={(e) => setArrears(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        মাতার নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={mothers_name} onChange={(e) => setMothers_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        সর্বমোটঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={total} onChange={(e) => setTotal(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        ঠিকানাঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        কথায়ঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={in_words} onChange={(e) => setIn_words(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        ব্যবসার ধরনঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={business_type} onChange={(e) => setBusiness_type(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        মোবাইল নম্বরঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" defaultValue={mobile_no} onChange={(e) => setMobile_no(e.target.value)} />
                    </Col>
                </Form.Group>
            </Row>
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
            </div>
        </Form>

    );
}

export default TLModalEdit;
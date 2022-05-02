import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../contexts/DataContext';

const TLModalAdd = () => {

    const { addTreadLicense } = useContext(DataContext);

    const [license_no, setLicense_no] = useState('');
    const [institute_address, setInstitute_address] = useState('');
    const [institute_name, setInstitute_name] = useState('');
    const [profession_capital, setProfession_capital] = useState('');
    const [owner_name, setOwner_name] = useState('');
    const [license_fee, setLicense_fee] = useState('');
    const [guardian_name, setGuardian_name] = useState('');
    const [arrears, setArrears] = useState('');
    const [mothers_name, setMothers_name] = useState('');
    const [total, setTotal] = useState('');
    const [address, setAddress] = useState('');
    const [in_words, setIn_words] = useState('');
    const [business_type, setBusiness_type] = useState('');
    const [mobile_no, setMobile_no] = useState('');


    const token = JSON.parse(sessionStorage.getItem("user")).access_token;
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};

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

        fetch(`${process.env.REACT_APP_BASE_URL}/up/tread_license`, {
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
                    addTreadLicense(license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no);
                }
            })
    }

    // const onSubmit = data => {
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/up/tread_license`, (data), {
    //         headers: { Authorization: 'Bearer ' + token }
    //     })
    //         .then((res) => {
    //             // handle success
    //             if (res.data.affectedRows > 0) {
    //                 setSuccess(true);
    //             } else {
    //                 setWarn(res.data);
    //             }
    //             // console.log(res);
    //         });
    //     reset();
    // };



    return (

        <Form className="py-5 border-top " onSubmit={handleSubmit}>
            <Row xs={1} md={2}>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্স নংঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setLicense_no(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4" lg="4">
                        ব্যবসা প্রতিষ্ঠানের ঠিকানাঃ
                    </Form.Label>
                    <Col sm="8" lg="8">
                        <Form.Control type="text" onChange={(e) => setInstitute_address(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ব্যবসা প্রতিষ্ঠানের নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setInstitute_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ব্যবসার/পেশার মূলধনঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setProfession_capital(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্সধারীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setOwner_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        লাইসেন্স ফি (+ভ্যাট)
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setLicense_fee(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        পিতা/স্বামীর নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setGuardian_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        বকেয়াঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setArrears(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        মাতার নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setMothers_name(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        সর্বমোটঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setTotal(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        ঠিকানাঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        কথায়ঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setIn_words(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        ব্যবসার ধরনঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setBusiness_type(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                    <Form.Label column sm="4">
                        মোবাইল নম্বরঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" onChange={(e) => setMobile_no(e.target.value)} />
                    </Col>
                </Form.Group>
            </Row>
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
            </div>
        </Form>

    );
}

export default TLModalAdd;
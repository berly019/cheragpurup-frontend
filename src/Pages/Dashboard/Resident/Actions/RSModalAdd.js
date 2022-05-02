import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../contexts/DataContext';
import { useContext, useEffect, useState } from 'react';


const RSModalAdd = () => {
    const { addResident } = useContext(DataContext);

    const [holding_no, setHoldingNo] = useState('');
    const [payer_name, setPayerName] = useState('');
    const [guardian_name, setGuardianName] = useState('');
    const [word_no, setWordNo] = useState('');
    const [village, setVillage] = useState('');
    const [mobile_no, setMobileNo] = useState('');

    const [assign_tax, setAssignTax] = useState('');
    const [previes_areas_tax, setPAreasTax] = useState('');
    const [total_tax, setTotalTax] = useState('')
    const [areas_tax, setAreasTax] = useState('');
    const [collected_tax, setCollectedTax] = useState('');
    

    useEffect(() => {
        const aTotalTax = Number(assign_tax) + Number(previes_areas_tax);
        setTotalTax(aTotalTax);

        const areasTax = Number(aTotalTax) - Number(collected_tax);
        setAreasTax(areasTax);
    }, [assign_tax, previes_areas_tax, collected_tax])


    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {};

        data.holding_no = holding_no;
        data.payer_name = payer_name;
        data.guardian_name = guardian_name;
        data.word_no = word_no;
        data.village = village;
        data.mobile_no = mobile_no;

        data.sms = '';
        data.previes_areas_tax = previes_areas_tax;
        data.assign_tax = assign_tax;
        data.collected_tax = collected_tax;
        data.total_tax = total_tax;
        data.areas_tax = areas_tax;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/resident`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // setData(data?.data)
                addResident(holding_no, payer_name, guardian_name, word_no, village, previes_areas_tax, assign_tax, collected_tax, mobile_no, total_tax, areas_tax);
            })
    }


    return (

        <Form className="py-5 border-top " onSubmit={handleSubmit}>
            <Row xs={1} md={2}>
                <Col>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            হোল্ডিং নংঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" onChange={(e) => setHoldingNo(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            কর দাতার নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setPayerName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            পিতা/স্বামীর নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setGuardianName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            ওয়ার্ড নং
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" onChange={(e) => setWordNo(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            গ্রামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setVillage(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            মোবাইল নাম্বারঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" onChange={(e) => setMobileNo(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row"  >
                        <Form.Label column sm="4">
                            পূর্বের বকেয়া করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" onBlur={(e) => setPAreasTax(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4" lg="4">
                            ধার্যকৃত করঃ
                        </Form.Label>
                        <Col sm="8" lg="8">
                            <Form.Control type="number" onBlur={(e) => setAssignTax(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            মোট করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" value={total_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            আদায়কৃত করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" onBlur={(e) => setCollectedTax(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            বকেয়া করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" value={areas_tax} disabled />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
            </div>
        </Form>

    );
}


export default RSModalAdd;
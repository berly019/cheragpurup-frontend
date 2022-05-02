import React, { useContext } from 'react';
import { Button, Col, Form,  Row } from "react-bootstrap";
import { DataContext } from '../../../../../contexts/DataContext';

const COModalAdd = () => {

    const { addCOwarish } = useContext(DataContext);

    const [memorandum_no, setMemorandum_no] = React.useState('');
    const [village, setVillage] = React.useState('');
    const [applicant_name, setApplicant_name] = React.useState('');
    const [post_office, setPost_office] = React.useState('');
    const [guardian_name, setGuardian_name] = React.useState('');
    const [word_no, setWord_no] = React.useState('');
    const [mother_name, setMother_name] = React.useState('');
    const [marital_status, setSelectValue] = React.useState('');
    const [name1, setName1] = React.useState('');
    const [relation1, setRelation1] = React.useState('');
    const [name2, setName2] = React.useState('');
    const [relation2, setRelation2] = React.useState('');
    const [name3, setName3] = React.useState('');
    const [relation3, setRelation3] = React.useState('');
    const [name4, setName4] = React.useState('');
    const [relation4, setRelation4] = React.useState('');
    const [name5, setName5] = React.useState('');
    const [relation5, setRelation5] = React.useState('');
    const [name6, setName6] = React.useState('');
    const [relation6, setRelation6] = React.useState('');
    const [name7, setName7] = React.useState('');
    const [relation7, setRelation7] = React.useState('');
    const [name8, setName8] = React.useState('');
    const [relation8, setRelation8] = React.useState('');
    const [name9, setName9] = React.useState('');
    const [relation9, setRelation9] = React.useState('');
    const [name10, setName10] = React.useState('');
    const [relation10, setRelation10] = React.useState('');
    const [name11, setName11] = React.useState('');
    const [relation11, setRelation11] = React.useState('');
    const [name12, setName12] = React.useState('');
    const [relation12, setRelation12] = React.useState('');
    const [name13, setName13] = React.useState('');
    const [relation13, setRelation13] = React.useState('');
    const [name14, setName14] = React.useState('');
    const [relation14, setRelation14] = React.useState('');
    const [name15, setName15] = React.useState('');
    const [relation15, setRelation15] = React.useState('');


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

        data.name1 = name1;
        data.relation1 = relation1;
        data.name2 = name2;
        data.relation2 = relation2;
        data.name3 = name3;
        data.relation3 = relation3;
        data.name4 = name4;
        data.relation4 = relation4;
        data.name5 = name5;
        data.relation5 = relation5;
        data.name6 = name6;
        data.relation6 = relation6;
        data.name7 = name7;
        data.relation7 = relation7;
        data.name8 = name8;
        data.relation8 = relation8;
        data.name9 = name9;
        data.relation9 = relation9;
        data.name10 = name10;
        data.relation10 = relation10;
        data.name11 = name11;
        data.relation11 = relation11;
        data.name12 = name12;
        data.relation12 = relation12;
        data.name13 = name13;
        data.relation13 = relation13;
        data.name14 = name14;
        data.relation14 = relation14;
        data.name15 = name15;
        data.relation15 = relation15;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate`, {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                res.json()
                // console.log(res);
                if (res.status === 200) {
                    addCOwarish(memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, name1, relation1, name2, relation2, name3, relation3, name4, relation4, name5, relation5, name6, relation6, name7, relation7, name8, relation8, name9, relation9, name10, relation10, name11, relation11, name12, relation12, name13, relation13, name14, relation14, name15, relation15);
                }
            })
    }

    // const onSubmit = data => {
    //     // data.marital_status = maritalStatus;
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate`, (data), {
    //         headers: { Authorization: 'Bearer ' + token }
    //     })
    //         .then((res) => {
    //             // handle success
    //             if (res.data.affectedRows > 0) {
    //                 setSuccess(true)
    //             } else {
    //                 setWarn(res.data);
    //             }
    //             // console.log(res);
    //         });
    //     reset();
    // };

    // if (success || warn) {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1500);
    // }

    return (

        <Form className="py-5 border-top " onSubmit={handleSubmit}>
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
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        ইউপি সদস্যের নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" onChange={(e) => setSelectValue(e.target.value)} />
                    </Col>
                </Form.Group>
            </Row>

            <p className="fs-5 text-center pt-4">ওয়ারিশগন</p>
            <Row xs={1} className="align-items-baseline justify-content-center">
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName1(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation1(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>২।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName2(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation2(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৩।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName3(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation3(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৪।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName4(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation4(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৫।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName5(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation5(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৬।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName6(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation6(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৭।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName7(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation7(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৮।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName8(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation8(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>৯।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName9(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation9(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১০।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName10(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation10(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১১।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName11(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation11(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১২।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName12(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation12(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১৩।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName13(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation13(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১৪।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName14(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation14(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
                <div className="d-flex">
                    <Col className="mb-0" style={{ maxWidth: "50px" }}>১৫।</Col>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setName15(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" onChange={(e) => setRelation15(e.target.value)} />
                        </Col>
                    </Form.Group>
                </div>
            </Row>
            <div className="mt-4 text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
            </div>
        </Form>

    );
}
export default COModalAdd;
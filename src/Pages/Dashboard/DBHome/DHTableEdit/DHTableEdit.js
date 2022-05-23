import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from '../../../../contexts/DataContext';

const DHTableEdit = ({ modalData }) => {
    const id = modalData._id;
    const data = modalData;

    const { updateDataTable } = useContext(DataContext);

    const [word_no, setWordNo] = useState(modalData?.word_no);
    const [resident_thana, setResidentThana] = useState(modalData?.resident_thana);
    const [commerce_thana, setCommerceThana] = useState(modalData?.commerce_thana);
    const [resident_tax, setResidentTax] = useState(modalData?.resident_tax);
    const [commerce_tax, setCommerceTax] = useState(modalData?.commerce_tax);
    const [resident_collected_tax, setResidentCTax] = useState(modalData?.resident_collected_tax);
    const [resident_areas_tax, setResidentATax] = useState(modalData?.resident_areas_tax);
    const [commerce_collected_tax, setCommerceCTax] = useState(modalData?.commerce_collected_tax);
    const [commerce_areas_tax, setCommerceATax] = useState(modalData?.commerce_areas_tax);
    const [tread_license, setTlicense] = useState(modalData?.tread_license);
    const [character_certificate, setChCertificate] = useState(modalData?.character_certificate);
    const [citizen_certificate, setCiCertificate] = useState(modalData?.citizen_certificate);
    const [inheritance_certificate, setInCertificate] = useState(modalData?.inheritance_certificate);
    const [total, setTotal] = useState(modalData?.total);
    const [autism, setAutism] = useState(modalData?.autism);
    const [expatriate, setExpatriate] = useState(modalData?.expatriate);
    const [widow, setWidow] = useState(modalData?.widow);
    const [beggar, setBeggar] = useState(modalData?.beggar);
    const [freedom_fighters, setFFighters] = useState(modalData?.freedom_fighters);
    const [total_population, setTPopulation] = useState(modalData?.total_population);

    const updatedDataTable = { id, word_no, resident_thana, commerce_thana, resident_tax, commerce_tax, resident_collected_tax, resident_areas_tax, commerce_collected_tax, commerce_areas_tax, tread_license, character_certificate, citizen_certificate, inheritance_certificate, total, autism, expatriate, widow, beggar, freedom_fighters, total_population }

    // const { register, handleSubmit, reset } = useForm();
    // const onSubmit = data => {
    //     axios.put(`${process.env.REACT_APP_BASE_URL}/up/db_home/${id}`, (data))
    //         .then((res) => {
    //             // handle success
    //             console.log(res);
    //             updateDataTable(id, data._id, data.word_no, data.resident_thana, data.commerce_thana, data.resident_tax, data.commerce_tax, data.resident_collected_tax, data.commerce_collected_tax, data.resident_areas_tax, data.commerce_areas_tax, data.tread_license, data.character_certificate, data.citizen_certificate, data.inheritance_certificate, data.total, data.autism, data.expatriate, data.widow, data.beggar, data.freedom_fighters, data.total_population);
    //             if (res.data._id) {
    //             }
    //         });
    //     reset();
    //     // console.log(data)
    // };


    const handleSubmit = (e) => {
        e.preventDefault();

        data.resident_thana = resident_thana;
        data.commerce_thana = commerce_thana;
        data.resident_tax = resident_tax;
        data.commerce_tax = commerce_tax;
        data.resident_collected_tax = resident_collected_tax;
        data.resident_areas_tax = resident_areas_tax;
        data.commerce_collected_tax = commerce_collected_tax;
        data.commerce_areas_tax = commerce_areas_tax;
        data.tread_license = tread_license;
        data.character_certificate = character_certificate;
        data.citizen_certificate = citizen_certificate;
        data.inheritance_certificate = inheritance_certificate;
        data.total = total;
        data.autism = autism;
        data.expatriate = expatriate;
        data.widow = widow;
        data.beggar = beggar;
        data.freedom_fighters = freedom_fighters;
        data.total_population = total_population;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/db_home/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                updateDataTable(id, updatedDataTable);
            })
    };

    return (

        <Form className="py-5 overflow-auto" onSubmit={handleSubmit}>
            <Row xs={1} lg={2}>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        ওয়ার্ড নং
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={word_no} onChange={(e) => setWordNo(e.target.value)} disabled />
                        {/* <Form.Control type="text" defaultValue={data?.word_no}  {...register("word_no")} /> */}
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        আবাসিক খানা সংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={resident_thana} onChange={(e) => setResidentThana(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4" lg="4">
                        বাণিজ্যিক খানা সংখ্যা
                    </Form.Label>
                    <Col sm="8" lg="8">
                        <Form.Control type="text" defaultValue={commerce_thana} onChange={(e) => setCommerceThana(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        আবাসিক কর
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={resident_tax} onChange={(e) => setResidentTax(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        বাণিজ্যিক কর
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={commerce_tax} onChange={(e) => setCommerceTax(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <Form.Label column sm="4">
                        আবাসিক আদায়কৃত কর
                    </Form.Label>
                    <Col sm="7">
                        <Form.Control type="text" defaultValue={resident_collected_tax} onChange={(e) => setResidentCTax(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <Form.Label column sm="4">
                        বাণিজ্যিক আদায়কৃত কর
                    </Form.Label>
                    <Col sm="7">
                        <Form.Control type="text" defaultValue={commerce_collected_tax} onChange={(e) => setCommerceCTax(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <Form.Label column sm="4">
                        আবাসিক বকেয়া কর
                    </Form.Label>
                    <Col sm="7">
                        <Form.Control type="text" defaultValue={resident_areas_tax} onChange={(e) => setResidentATax(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <Form.Label column sm="4">
                        বাণিজ্যিক বকেয়া কর
                    </Form.Label>
                    <Col sm="7">
                        <Form.Control type="text" defaultValue={commerce_areas_tax} onChange={(e) => setCommerceATax(e.target.value)} />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক পুরুষ করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_male} {...register("resident_male")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক পুরুষ করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.commerce_male} {...register("commerce_male")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক মহিলা করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_female} {...register("resident_female")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক মহিলা করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.commerce_female} {...register("commerce_female")} />
                            </Col>
                        </Form.Group> */}
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        ট্রেড লাইসেন্স সংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={tread_license} onChange={(e) => setTlicense(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        চারিত্রিক সনদপত্র সংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={character_certificate} onChange={(e) => setChCertificate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        নাগরিক সনদপত্র সংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={citizen_certificate} onChange={(e) => setCiCertificate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        ওয়ারিশ সনদপত্র সংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={inheritance_certificate} onChange={(e) => setInCertificate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        সর্বমোট
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={total} onChange={(e) => setTotal(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        প্রতিবন্ধী
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={autism} onChange={(e) => setAutism(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        প্রবাসী
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={expatriate} onChange={(e) => setExpatriate(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        বিধবা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={widow} onChange={(e) => setWidow(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        ভিক্ষুক
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={beggar} onChange={(e) => setBeggar(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <Form.Label column sm="4">
                        মুক্তিযোদ্ধা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={freedom_fighters} onChange={(e) => setFFighters(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" >
                    <Form.Label column sm="4">
                        মোট জনসংখ্যা
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={total_population} onChange={(e) => setTPopulation(e.target.value)} />
                    </Col>
                </Form.Group>
            </Row>
            <div className="text-end">
                <Button type="submit" variant="danger" className='px-4' size="sm">আপডেট</Button>
                {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
            </div>
        </Form>

    );
}

export default DHTableEdit;
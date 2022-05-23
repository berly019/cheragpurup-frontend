import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from "../../../../contexts/DataContext";

const RSModalEdit = ({ modalData }) => {
  const { updateResident, f_year } = useContext(DataContext);
  console.log(f_year);

  const id = modalData._id;
  const data = modalData;

  const [holding_no, setHoldingNo] = useState(data?.holding_no);
  const [payer_name, setPayerName] = useState(data?.payer_name);
  const [guardian_name, setGuardianName] = useState(data?.guardian_name);
  const [word_no, setWordNo] = useState(data?.word_no);
  const [village, setVillage] = useState(data?.village);
  const [mobile_no, setMobileNo] = useState(data?.mobile_no);

  const [education, setEducationValue] = useState(data?.education);
  const [n_id, setNID] = useState(data?.n_id);
  const [birth_date, setBDate] = useState(data?.birth_date);
  const [religion, setReligionValue] = useState(data?.religion);
  const [gender, setGender] = useState(data?.gender);
  const [profession, setProfession] = useState(data?.profession);
  const [tubewell, setTubeWellValue] = useState(data?.tubewell);
  const [latrine, setLatrineValue] = useState(data?.latrine);
  const [home_type, setHomeTypeValue] = useState(data?.home_type);

  const [assign_tax, setAssignTax] = useState(data?.assign_tax);
  const [previes_areas_tax, setPAreasTax] = useState(data?.previes_areas_tax);
  const [total_tax, setTotalTax] = useState(data?.total_tax);
  const [areas_tax, setAreasTax] = useState(data?.areas_tax);
  const [collected_tax, setCollectedTax] = useState(data?.collected_tax);
  const [dTotalTax, setDTotalTax] = useState("");

  const updatedResident = {
    id,
    holding_no,
    payer_name,
    guardian_name,
    word_no,
    village,

    education,
    n_id,
    birth_date,
    religion,
    gender,
    profession,
    tubewell,
    latrine,
    home_type,

    mobile_no,
    assign_tax,
    previes_areas_tax,
    total_tax,
    areas_tax,
    collected_tax,
    dTotalTax,
  };
  // const [success, setSuccess] = React.useState(false);
  // const formRef = useRef();

  // console.log(data)
  // const [assignTax, setAssignTax] = useState('');
  // const [areasTax, setAreasTax] = useState('');
  // const [pAreasTax, setPAreasTax] = useState('');
  // const [collectedTax, setCollectedTax] = useState('');
  // const [totalTax, setTotalTax] = useState('');
  // const [pPAreasTax, setPPAreasTax] = useState('');

  const db_assign = data?.assign_tax;
  const db_pAreas = data?.previes_areas_tax;
  // console.log({ assignTax: assignTax, areasTax: areasTax, pAreasTax: pAreasTax, collectedTax: collectedTax, totalTax: totalTax });

  // calculate
  useEffect(() => {
    const aTotalTax =
      Number(assign_tax ? assign_tax : data?.assign_tax) +
      Number(previes_areas_tax ? previes_areas_tax : data?.previes_areas_tax);
    setTotalTax(aTotalTax);

    // console.log(aTotalTax);

    const areasTax =
      Number(total_tax) -
      Number(collected_tax ? collected_tax : data?.collected_tax);
    setAreasTax(areasTax);
    // console.log(areasTax);

    setDTotalTax(
      Number(assign_tax ? assign_tax : data?.assign_tax) +
        Number(previes_areas_tax ? previes_areas_tax : data?.previes_areas_tax)
    );
    // const pPAreasTax = Number(data?.areas_tax);
    // setPPAreasTax(pPAreasTax);
  }, [
    assign_tax,
    previes_areas_tax,
    collected_tax,
    total_tax,
    data?.previes_areas_tax,
    data?.assign_tax,
    areas_tax,
    data?.collected_tax,
  ]);

  // const [dAssignTax, setDAssignTax] = useState('');
  // const [dPAreasTax, setDPAreasTax] = useState('');
  // const [dCollectedTax, setDCollectedTax] = useState('');
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // const onSubmit = data => {
  //     data.assign_tax = assign_tax ? assign_tax : db_assign;
  //     data.total_tax = dTotalTax;
  //     data.collected_tax = collected_tax;
  //     data.areas_tax = areas_tax;
  //     data.previes_areas_tax = pAreasTax ? pAreasTax : db_pAreas;

  //     fetch(`${process.env.REACT_APP_BASE_URL}/resident/single/update/${id}`, {
  //         method: 'put',
  //         headers: {
  //             'Content-Type': "application/json"
  //         },
  //         body: JSON.stringify(data)
  //     })
  //         .then(res => res.json())
  //         .then(data => {
  //             // console.log(data)
  //             setData(data?.data)
  //             setSuccess(true);
  //             reset();
  //         })

  //     // console.log(data)
  // };

  const token = JSON.parse(sessionStorage.getItem("user")).access_token;

  const handleSubmit = (e) => {
    e.preventDefault();

    data.holding_no = holding_no;
    data.payer_name = payer_name;
    data.guardian_name = guardian_name;
    data.word_no = word_no;
    data.village = village;
    data.mobile_no = mobile_no;

    data.education = education;
    data.n_id = n_id;
    data.birth_date = birth_date;
    data.religion = religion;
    data.gender = gender;
    data.profession = profession;
    data.tubewell = tubewell;
    data.latrine = latrine;
    data.home_type = home_type;

    data.previes_areas_tax = previes_areas_tax ? previes_areas_tax : db_pAreas;
    data.assign_tax = assign_tax ? assign_tax : db_assign;
    data.collected_tax = collected_tax;
    data.total_tax = dTotalTax;
    data.areas_tax = areas_tax;

    fetch(
      `${process.env.REACT_APP_BASE_URL}/up/resident/${id}/year/${f_year}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        updateResident(id, updatedResident);
      });
  };

  return (
    <Form key={id} className="py-5 border-top" onSubmit={handleSubmit}>
      <Row xs={1} md={2}>
        <Col>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              হোল্ডিং নংঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                defaultValue={holding_no}
                onChange={(e) => setHoldingNo(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              কর দাতার নামঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={payer_name}
                onChange={(e) => setPayerName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              পিতা/স্বামীর নামঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={guardian_name}
                onChange={(e) => setGuardianName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              পেশাঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              নলকূপঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={tubewell}
              onChange={(e) => setTubeWellValue(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="হ্যাঁ">হ্যাঁ</option>
              <option value="না">না</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              ল্যাট্রিনঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={latrine}
              onChange={(e) => setLatrineValue(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="পাকা">পাকা</option>
              <option value="কাঁচা">কাঁচা</option>
              <option value="নাই">নাই</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              বাড়ীর ধরনঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={home_type}
              onChange={(e) => setHomeTypeValue(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="পাকা">পাকা</option>
              <option value="নাই">আধাপাকা</option>
              <option value="কাঁচা">কাঁচা</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              ওয়ার্ড নং
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                defaultValue={word_no}
                onChange={(e) => setWordNo(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              গ্রামঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={village}
                onChange={(e) => setVillage(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              মোবাইল নাম্বারঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                defaultValue={mobile_no}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              শিক্ষাগত যোগ্যতাঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={education}
              onChange={(e) => setEducationValue(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="পঞ্চম শ্রেণী পাশ">পঞ্চম শ্রেণী</option>
              <option value="এস এস সি পাশ">এস এস সি</option>
              <option value="এইচ এস সি পাশ">এইচ এস সি</option>
              <option value="বি এ পাশ">বি এ</option>
              <option value="এম এ পাশ">এম এ</option>
              <option value="নাই">নাই</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              জন্ম তারিখঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={birth_date}
                onChange={(e) => setBDate(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="5">
              জাতীয় পরিচয়পত্র নংঃ
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                defaultValue={n_id}
                onChange={(e) => setNID(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              লিঙ্গঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="পুরুষ">পুরুষ</option>
              <option value="মহিলা">মহিলা</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3 d-flex flex-column flex-sm-row"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              ধর্মঃ
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              sm="8"
              defaultValue={religion}
              onChange={(e) => setReligionValue(e.target.value)}
            >
              <option>সিলেক্ট করুন</option>
              <option value="ইসলাম">ইসলাম</option>
              <option value="সনাতন (হিন্দু)">সনাতন (হিন্দু)</option>
              <option value="খ্রিস্টান">খ্রিস্টান</option>
              <option value="বৌদ্ধ">বৌদ্ধ</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              পূর্বের বকেয়া করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                title={data?.previes_areas_tax}
                type="number"
                min="0"
                defaultValue={previes_areas_tax}
                onBlur={(e) => {
                  setPAreasTax(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4" lg="4">
              ধার্যকৃত করঃ
            </Form.Label>
            <Col sm="8" lg="8">
              <Form.Control
                type="number"
                min="0"
                title={data?.assign_tax}
                defaultValue={assign_tax}
                onBlur={(e) => {
                  setAssignTax(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              মোট করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                title={data?.total_tax}
                value={total_tax ? total_tax : data?.total_tax}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              আদায়কৃত করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                title={data?.collected_tax}
                defaultValue={collected_tax}
                onBlur={(e) => {
                  setCollectedTax(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              বকেয়া করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="0"
                title={data?.areas_tax}
                value={areas_tax ? areas_tax : data?.areas_tax}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-4 text-end">
        <Button type="submit" variant="danger" className="px-4" size="sm">
          Update
        </Button>
        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
      </div>
    </Form>
  );
};

export default RSModalEdit;

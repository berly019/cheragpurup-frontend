import { Button, Col, Form, Row } from "react-bootstrap";
import { DataContext } from "../../../../contexts/DataContext";
import { useContext, useEffect, useState } from "react";

const RSModalAdd = () => {
  const { addResident, f_year } = useContext(DataContext);

  const [holding_no, setHoldingNo] = useState("");
  const [payer_name, setPayerName] = useState("");
  const [guardian_name, setGuardianName] = useState("");
  const [word_no, setWordNo] = useState("");
  const [village, setVillage] = useState("");
  const [mobile_no, setMobileNo] = useState("");

  const [education, setEducationValue] = useState(null);
  const [n_id, setNID] = useState(null);
  const [birth_date, setBDate] = useState(null);
  const [religion, setReligionValue] = useState(null);
  const [gender, setGender] = useState(null);
  const [profession, setProfession] = useState(null);
  const [tubewell, setTubeWellValue] = useState(null);
  const [latrine, setLatrineValue] = useState(null);
  const [home_type, setHomeTypeValue] = useState(null);

  const [assign_tax, setAssignTax] = useState("");
  const [previes_areas_tax, setPAreasTax] = useState("");
  const [total_tax, setTotalTax] = useState("");
  const [areas_tax, setAreasTax] = useState("");
  const [collected_tax, setCollectedTax] = useState("");

  useEffect(() => {
    const aTotalTax = Number(assign_tax) + Number(previes_areas_tax);
    setTotalTax(aTotalTax);

    const areasTax = Number(aTotalTax) - Number(collected_tax);
    setAreasTax(areasTax);
  }, [assign_tax, previes_areas_tax, collected_tax]);

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

    data.education = education;
    data.n_id = n_id;
    data.birth_date = birth_date;
    data.religion = religion;
    data.gender = gender;
    data.profession = profession;
    data.tubewell = tubewell;
    data.latrine = latrine;
    data.home_type = home_type;

    data.sms = "";
    data.previes_areas_tax = previes_areas_tax;
    data.assign_tax = assign_tax;
    data.collected_tax = collected_tax;
    data.total_tax = total_tax;
    data.areas_tax = areas_tax;

    console.log(data);

    fetch(`${process.env.REACT_APP_BASE_URL}/up/resident/year/${f_year}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          addResident(
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

            previes_areas_tax,
            assign_tax,
            collected_tax,
            mobile_no,
            total_tax,
            areas_tax
          );

          setHoldingNo("");
          setPayerName("");
          setGuardianName("");
          setWordNo("");
          setVillage("");
          setMobileNo("");
          setEducationValue("");
          setNID("");
          setBDate("");
          setReligionValue("");
          setGender("");
          setProfession("");
          setTubeWellValue("");
          setLatrineValue("");
          setHomeTypeValue("");
          setAssignTax("");
          setPAreasTax("");
          setTotalTax("");
          setAreasTax("");
          setCollectedTax("");
        }
      });
  };

  return (
    <Form className="py-5 border-top " onSubmit={handleSubmit}>
      <Row xs={1} md={2}>
        <Col>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              হোল্ডিং নংঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                onChange={(e) => setHoldingNo(e.target.value)}
                value={holding_no}
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
                onChange={(e) => setPayerName(e.target.value)}
                value={payer_name}
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
                onChange={(e) => setGuardianName(e.target.value)}
                value={guardian_name}
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
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
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
              onChange={(e) => setTubeWellValue(e.target.value)}
              value={tubewell}
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
              onChange={(e) => setLatrineValue(e.target.value)}
              value={latrine}
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
              onChange={(e) => setHomeTypeValue(e.target.value)}
              value={home_type}
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
                onChange={(e) => setWordNo(e.target.value)}
                value={word_no}
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
                onChange={(e) => setVillage(e.target.value)}
                value={village}
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
                onChange={(e) => setMobileNo(e.target.value)}
                value={mobile_no}
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
              onChange={(e) => setEducationValue(e.target.value)}
              value={education}
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
                onChange={(e) => setBDate(e.target.value)}
                value={birth_date}
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
                onChange={(e) => setNID(e.target.value)}
                value={n_id}
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
              onChange={(e) => setGender(e.target.value)}
              value={gender}
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
              onChange={(e) => setReligionValue(e.target.value)}
              value={religion}
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
                type="number"
                onBlur={(e) => setPAreasTax(e.target.value)}
                defaultValue={previes_areas_tax}
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
                onBlur={(e) => setAssignTax(e.target.value)}
                defaultValue={assign_tax}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              মোট করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" value={total_tax} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              আদায়কৃত করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                onBlur={(e) => setCollectedTax(e.target.value)}
                defaultValue={collected_tax}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
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
        <Button type="submit" variant="danger" className="px-4" size="sm">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default RSModalAdd;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";

const CloneData = () => {
  const [selectValue, setSelectValue] = useState(null);
  const [selectValue1, setSelectValue1] = useState(null);
  const [selectValue2, setSelectValue2] = useState(null);

  const [message, setMessage] = useState(null);

  const [financial_year, setFinancial_year] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/up/financial_year/get`)
      .then((res) => setFinancial_year(res.data))
      .catch((err) => console.log(err));
  }, [selectValue1, selectValue2]);

  // console.log(financial_year);

  const handleFinanceYear = () => {
    if (selectValue === null) {
      setMessage("অনুগ্রহ করে সঠিক নাম লিখুন");
    } else {
      setMessage("");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/up/financial_year/create/${selectValue}`)
        .then((res) => {
          if (res.data._id) {
            setMessage("সফল ভাবে ডাটা সেভ হয়েছে");
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage("ERROR");
        });
    }
  };

  // console.log(selectValue1);
  const handleResidentDB = () => {
    if (
      selectValue1 === null ||
      selectValue1 === undefined ||
      selectValue1 === "ডাটাবেজ সিলেক্ট করুন"
    ) {
      setMessage("অনুগ্রহ করে ডাটাবেজ সিলেক্ট করুন");
    } else {
      setMessage("");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/up/resident/clone/${selectValue1}`)
        .then((res) => {
          if (res.data.data) {
            setMessage("সফল ভাবে ডাটা সেভ হয়েছে");
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage("Error while cloning");
        });
    }
  };

  // console.log(selectValue2);
  const handleCommerceDB = () => {
    if (
      selectValue2 === null ||
      selectValue2 === undefined ||
      selectValue2 === "ডাটাবেজ সিলেক্ট করুন"
    ) {
      setMessage("অনুগ্রহ করে ডাটাবেজ সিলেক্ট করুন");
    } else {
      setMessage("");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/up/commerce/clone/${selectValue2}`)
        .then((res) => {
          if (res.data.data) {
            setMessage("সফল ভাবে ডাটা সেভ হয়েছে");
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage("Error while cloning");
        });
    }
  };

  return (
    <Container className="w-50 m-auto">
      <Row className="mb-5">
        <div className="text-center">
          <p className="fs-4 border-bottom">
            <Badge bg="secondary">নতুন</Badge> ডাটাবেজ তৈরি করুন
          </p>
        </div>
        <FormControl
          placeholder="ডাটাবেজের নাম"
          aria-label="ডাটাবেজের নাম"
          aria-describedby="basic-addon2"
          onChange={(e) => setSelectValue(e.target.value)}
        />

        <Button
          variant="outline-success mt-3"
          id="button-addon2"
          onClick={handleFinanceYear}
        >
          তৈরি করুন
        </Button>
      </Row>
      <Row className="mt-5">
        {message && <Alert variant="success">{message}</Alert>}
      </Row>
      <Row className="mb-5">
        {/* <Form.Select
        aria-label="Default select example"
        className="bg-dark text-white"
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option>ওয়ার্ড সিলেক্ট করুন</option>
        input
        <option value="20to21">২০২০-২১ অর্থবছর</option>
        <option value="21to22">২০২১-২২ অর্থবছর</option>
        <option value="22to23">২০২২-২৩ অর্থবছর</option>
        <option value="23to24">২০২৩-২৪ অর্থবছর</option>
        <option value="24to25">২০২৪-২৫ অর্থবছর</option>
        <option value="25to26">২০২৫-২৬ অর্থবছর</option>
        <option value="26to27">২০২৬-২৭ অর্থবছর</option>
        <option value="27to28">২০২৭-২৮ অর্থবছর</option>
        <option value="28to29">২০২৮-২৯ অর্থবছর</option>
        <option value="29to30">২০২৯-৩০ অর্থবছর</option>
      </Form.Select> */}
        {/* <div className="mb-3"> */}
        {/* </div> */}

        <div className="text-center">
          <p className="fs-4 border-bottom">
            আবাসিক ডাটাবেজ <Badge bg="secondary">নতুন</Badge>
          </p>
        </div>
        {/* <FormControl
          placeholder="আবাসিক ডাটাবেজের নাম"
          aria-label="আবাসিক ডাটাবেজের নাম"
          aria-describedby="basic-addon2"
          onChange={(e) => setSelectValue(e.target.value)}
        /> */}
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSelectValue1(e.target.value)}
        >
          <option>ডাটাবেজ সিলেক্ট করুন</option>
          {financial_year?.map((year, i) => (
            <option value={year.dbName} key={i}>
              {year.dbName}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="outline-success mt-3"
          id="button-addon2"
          onClick={handleResidentDB}
        >
          তৈরি করুন
        </Button>

        {/* <input
          type="text"
          placeholder="2020-21"
          onBlur={(e) => setSelectValue(e.target.value)}
        />

        <Button
          className="mt-3 mt-sm-0 w-50"
          variant="success"
          className="mt-5"
          onClick={handleDataClone}
        >
          ডাটা ক্লোন করুন
        </Button> */}
      </Row>

      <Row className="mt-5">
        <div className="text-center">
          <p className="fs-4 border-bottom">
            বাণিজ্যিক ডাটাবেজ <Badge bg="secondary">নতুন</Badge>
          </p>
        </div>
        {/* <FormControl
          placeholder="বাণিজ্যিক ডাটাবেজের নাম"
          aria-label="বাণিজ্যিক ডাটাবেজের নাম"
          aria-describedby="basic-addon2"
          onChange={(e) => setSelectValue2(e.target.value)}
        /> */}
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSelectValue2(e.target.value)}
        >
          <option>ডাটাবেজ সিলেক্ট করুন</option>
          {financial_year?.map((year, i) => (
            <option value={year.dbName} key={i}>
              {year.dbName}
            </option>
          ))}
        </Form.Select>

        <Button
          variant="outline-success mt-3"
          id="button-addon2"
          onClick={handleCommerceDB}
        >
          তৈরি করুন
        </Button>
      </Row>
    </Container>
  );
};

export default CloneData;

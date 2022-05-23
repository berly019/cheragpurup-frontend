import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../Commerce.css";
import { DataContext } from "../../../../contexts/DataContext";

const CSModalEdit = ({ modalData }) => {
  const { updateCommerce, f_year } = useContext(DataContext);

  const id = modalData._id;
  const data = modalData;

  const [holdingNo, setHoldingNo] = useState(data?.holding_no);
  const [payerName, setPayerName] = useState(data?.payer_name);
  const [guardianName, setGuardianName] = useState(data?.guardian_name);
  const [businessOrg, setBusinessOrg] = useState(data?.business_org);
  const [wordNo, setWordNo] = useState(data?.word_no);
  const [village, setVillage] = useState(data?.village);

  const [pAreasTax, setPAreasTax] = useState(data?.previes_areas_tax);
  const [assignTax, setAssignTax] = useState(data?.assign_tax);

  const [collectedTax, setCollectedTax] = useState(data?.collected_tax);
  const [mobileNo, setMobileNo] = useState(data?.mobile_no);

  const [totalTax, setTotalTax] = useState(data?.total_tax);
  const [areasTax, setAreasTax] = useState(data?.areas_tax);
  const [dTotalTax, setDTotalTax] = useState("");

  const updatedCommerce = {
    id,
    holdingNo,
    payerName,
    guardianName,
    businessOrg,
    wordNo,
    village,
    pAreasTax,
    assignTax,
    collectedTax,
    mobileNo,
    totalTax,
    areasTax,
    dTotalTax,
  };

  // console.log(totalTax, areasTax, dTotalTax);

  const db_assign = data?.assign_tax;
  const db_pAreas = data?.previes_areas_tax;

  // calculate
  useEffect(() => {
    const aTotalTax =
      Number(assignTax ? assignTax : data?.assign_tax) +
      Number(pAreasTax ? pAreasTax : data?.previes_areas_tax);
    setTotalTax(aTotalTax);

    // console.log(aTotalTax);

    const areasTax =
      Number(totalTax) -
      Number(collectedTax ? collectedTax : data?.collected_tax);
    setAreasTax(areasTax);
    // console.log(areasTax);

    setDTotalTax(
      Number(assignTax ? assignTax : data?.assign_tax) +
        Number(pAreasTax ? pAreasTax : data?.previes_areas_tax)
    );
    // const pPAreasTax = Number(data?.areas_tax);
    // setPPAreasTax(pPAreasTax);
  }, [
    assignTax,
    pAreasTax,
    collectedTax,
    totalTax,
    data?.previes_areas_tax,
    data?.assign_tax,
    areasTax,
    data?.collected_tax,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    data.holding_no = holdingNo;
    data.payer_name = payerName;
    data.guardian_name = guardianName;
    data.business_org = businessOrg;
    data.word_no = wordNo;
    data.village = village;
    data.mobile_no = mobileNo;

    data.previes_areas_tax = pAreasTax ? pAreasTax : db_pAreas;
    data.assign_tax = assignTax ? assignTax : db_assign;
    data.collected_tax = collectedTax;
    data.total_tax = dTotalTax;
    data.areas_tax = areasTax;

    fetch(
      `${process.env.REACT_APP_BASE_URL}/commerce/${id}/year/${f_year}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // setData(data?.data)
        updateCommerce(id, updatedCommerce);
      });
  };

  return (
    <Form key={id} className="py-5 border-top" onSubmit={handleSubmit}>
      <Row xs={1} lg={2}>
        <Col>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              হোল্ডিং নংঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                defaultValue={holdingNo}
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
                defaultValue={payerName}
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
                defaultValue={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              ব্যাবসা প্রতিষ্ঠানঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                defaultValue={businessOrg}
                onChange={(e) => setBusinessOrg(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              ওয়ার্ড নং
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                defaultValue={wordNo}
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
        </Col>
        <Col>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              পূর্বের বকেয়া করঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                title={data?.previes_areas_tax}
                defaultValue={pAreasTax}
                onBlur={(e) => setPAreasTax(e.target.value)}
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
                title={data?.assign_tax}
                defaultValue={assignTax}
                onBlur={(e) => setAssignTax(e.target.value)}
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
                title={data?.total_tax}
                value={totalTax ? totalTax : data?.total_tax}
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
                title={data?.collected_tax}
                defaultValue={collectedTax}
                onBlur={(e) => setCollectedTax(e.target.value)}
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
                title={data?.areas_tax}
                value={areasTax ? areasTax : data?.areas_tax}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
            <Form.Label column sm="4">
              মোবাইল নাম্বারঃ
            </Form.Label>
            <Col sm="8">
              <Form.Control
                title="Type number without code 0"
                type="number"
                defaultValue={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-4 text-end">
        <Button type="submit" variant="danger" className="px-4" size="sm">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default CSModalEdit;

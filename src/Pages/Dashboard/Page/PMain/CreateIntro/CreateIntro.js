// import React, { useState } from 'react';
// import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

// const CreateNotice = props => {
//     const [success, setSuccess] = React.useState(false);
//     const [title, setTitle] = useState('');
//     const [image, setImage] = useState(null);
//     // inputs
//     const [text1, setText1] = useState('');
//     const [text2, setText2] = useState('');
//     const [text3, setText3] = useState('');
//     const [text4, setText4] = useState('');
//     const [text5, setText5] = useState('');
//     // const token = JSON.parse(sessionStorage.getItem("user")).access_token;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let formData = new FormData();
//         formData.append('title', title);
//         formData.append('image', image);
//         // inputs
//         formData.append('text1', text1);
//         formData.append('text2', text2);
//         formData.append('text3', text3);
//         formData.append('text4', text4);
//         formData.append('text5', text5);
//         // console.log(formData, inputList);

//         fetch('https://khadimpur-mongoose-backend.herokuapp.com/up/intro', {
//             method: 'POST',
//             // headers: {
//             //     'token': token
//             // },
//             body: formData
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data) {
//                     setSuccess(data)
//                 }
//             })
//             .catch(error => {
//                 setSuccess(error);
//             });
//     }


//     // get data
//     // axios.get("https://khadimpur-mongoose-backend.herokuapp.com/up/intro")
//     //     .then(data => console.log(data.data));

//     // new input list
//     // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

//     if (success) {
//         setTimeout(() => {
//             window.location.reload();
//         }, 1000);
//     }

//     return (
//         <Modal className="overflow-auto"
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             style={{ top: '55px', height: '90vh' }} scrollable="true"
//         >
//             <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
//                 <div className="text-center" style={{ width: "96%" }}>
//                     <p className="text-success m-0 fs-4">Create New</p>
//                 </div>
//             </Modal.Header>
//             <Modal.Body>
//                 <Container>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Title
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required={true} />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group as={Row} className="mb-5" controlId="formHorizontalPassword">
//                             <Form.Label column sm={2}>
//                                 Upload File
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required={true} />
//                             </Col>
//                         </Form.Group>

//                         {/* inputs */}
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Text 1
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setText1(e.target.value)} required={true} />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Text 2
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setText2(e.target.value)}
//                                 />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Text 3
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setText3(e.target.value)} />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Text 4
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setText4(e.target.value)} />
//                             </Col>
//                         </Form.Group>
//                         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
//                             <Form.Label column sm={2}>
//                                 Text 5
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Control type="text" onChange={(e) => setText5(e.target.value)} />
//                             </Col>
//                         </Form.Group>

//                         <div className="mt-4 text-end">
//                             <Button type="submit" variant="danger" className='px-4'>Save</Button>
//                         </div>
//                     </Form>

//                     {/* new fields */}
//                     {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
//                     {/* new fields */}

//                 </Container>
//             </Modal.Body>
//             {
//                 success ?
//                     <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert>
//                     : ''
//             }
//         </Modal >
//     );
// };

// export default CreateNotice;




















import React, { useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';

const CreateNotice = props => {
    const [success, setSuccess] = React.useState(false);
    const [title, setTitle] = useState('');
    const [inputList, setInputList] = useState([{ serialNo: '', descText: '' },]);
    const [image, setImage] = useState(null);
    // const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('texts', JSON.stringify(inputList));
        formData.append('image', image);
        // console.log(formData, inputList);

        fetch('https://khadimpur-mongoose-backend.herokuapp.com/up/intro/', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                res.json()
                console.log(res);
                if (res.statusText === "OK") {
                    setSuccess(true)
                }
            })

            .catch(error => {
                setSuccess(error);
            });
    }


    // get data
    // axios.get("https://khadimpur-mongoose-backend.herokuapp.com/up/intro")
    //     .then(data => console.log(data.data));

    // new input list
    // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { serialNo: '', descText: '' }]);
    };
    // new input list end

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <Modal className="overflow-auto"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">Create New</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Row xs={1}>
                    <Form onSubmit={handleSubmit} className="py-5 border-top">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required={true} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-5" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Upload File
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required={true} />
                            </Col>
                        </Form.Group>

                        {/* input lists */}
                        {inputList.map((x, i) => {
                            return (
                                <Row className="d-flex">
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                        <Form.Label column sm={2} md={2}>
                                            Serial No
                                        </Form.Label>
                                        <Col sm={10} md={4}>
                                            <Form.Control name="serialNo" type="text" value={x.serialNo} onChange={(e) => handleInputChange(e, i)} required={true} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                        <Form.Label column sm={2} md={2}>
                                            Text
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control name="descText" type="text" value={x.descText} onChange={(e) => handleInputChange(e, i)} required={true} />
                                        </Col>
                                    </Form.Group>

                                    {/* <div className="btn-box"> */}
                                    <Stack direction="horizontal" gap={3} className="mb-3">
                                        {inputList.length !== 1 && <Button
                                            variant="danger"
                                            className="mr-5"
                                            onClick={() => handleRemoveClick(i)}
                                            size="sm">Remove</Button>}
                                        {inputList.length - 1 === i && <Button
                                            variant="success"
                                            onClick={handleAddClick}
                                            size="sm">Add</Button>}
                                    </Stack>
                                    {/* </div> */}
                                </Row>
                            );
                        })}
                        {/* input lists end */}

                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4'>Save</Button>
                        </div>
                    </Form>

                    {/* new fields */}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                    {/* new fields */}

                </Row>
            </Modal.Body>
            {
                success ?
                    <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert>
                    : ''
            }
        </Modal >
    );
};

export default CreateNotice;
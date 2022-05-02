import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../../contexts/DataContext';

const CreateRunNotice = () => {

    const { addRunNotice } = useContext(DataContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);
        axios.post(`${process.env.REACT_APP_BASE_URL}/up/run_notice`, data)
            .then(res => {

                if (res.status === 200) {
                    // console.log(res);
                    addRunNotice(data.title, data.notice);
                }

            })
    }


    return (
        <Row xs={1}>
            <Form onSubmit={handleSubmit(onSubmit)} className="py-5 border-top">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" {...register("title", { required: true })} />
                    </Col>
                </Form.Group>
                {errors.title && <span className="text-danger">This field is required</span>}
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Notice
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" type="text" {...register("notice", { required: true })} />
                    </Col>
                    {errors.notice && <span className="text-danger">This field is required</span>}
                </Form.Group>

                {/* {error && <span>This field is required</span>} */}

                <div className="mt-4 text-end">
                    <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                </div>
            </Form>
        </Row>
    );
};

export default CreateRunNotice;
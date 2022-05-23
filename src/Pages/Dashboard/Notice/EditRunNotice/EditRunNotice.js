import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../../contexts/DataContext';

const EditRunNotice = ({ data }) => {
    const id = data._id;

    const { updateRunNotice } = useContext(DataContext);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        const { title, notice } = data;
        const updatedRN = { id, title, notice }

        axios.put(`${process.env.REACT_APP_BASE_URL}/up/run_notice/${id}`, data)
            .then(res => {
                if (res.status === 200) {
                    updateRunNotice(id, updatedRN);
                }
            })
    }


    return (
        <Row xs={1}>
            <Form onSubmit={handleSubmit(onSubmit)} key={data?._id} className="py-5 border-top">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={data?.title} {...register("title")} />
                    </Col>
                </Form.Group>
                {errors.title && <span className="text-danger">This field is </span>}
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Notice
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" defaultValue={data?.notice} type="text" {...register("notice")} />
                    </Col>
                    {errors.notice && <span className="text-danger">This field is </span>}
                </Form.Group>

                {/* {error && <span>This field is </span>} */}

                <div className="mt-4 text-end">
                    <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                </div>
            </Form>
        </Row>
    );
};

export default EditRunNotice;
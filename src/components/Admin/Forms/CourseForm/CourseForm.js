//Liberias
import { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';

import { addCourse, editCourse, getCoursesFromSchool } from '../../../../api/course';

//Estilos
import './CourseForm.scss';

export default function CourseForm(props) {
    const { Option } = Select;

    const { courses, setCourses, setModalVisible, school, edit, toEdit, setRowSel } = props;
    const [form] = Form.useForm();
    
    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const onFinish = values => {

        const course = { ...values, id_school: school }
        
        console.log(course);
        const updateCourses = () => getCoursesFromSchool(school).then(json => setCourses(json));
        
        if(edit) {
            editCourse(school, toEdit.code, course).then(updateCourses);
            setRowSel(null);
        }
        else addCourse(school, course).then(updateCourses);

        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { code, name, level, period, capacity } = toEdit;
            form.setFieldsValue({code, name, level, period, capacity});
        }
    }, []);

    return (
        <Form
            className="course-form"
            form={form}
            initialValues={{capacity: 20}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        name="code"
                        label="Código"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={8}>
                <Col span={9}>
                    <Form.Item
                        name="period"
                        label="Período"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        name="level"
                        label="Nivel"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Select>
                            <Option value="A1">A1</Option>
                            <Option value="A2">A2</Option>
                            <Option value="B1">B1</Option>
                            <Option value="B2">B2</Option>
                            <Option value="C1">C1</Option>
                            <Option value="C2">C2</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="capacity"
                        label="Capacidad"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <InputNumber min={3} max={20}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row
                className='course-form__options'
                justify='center'
                gutter={8}
            >
                <Col className="course-form__options__reset">
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>

                <Col className="course-form__options__submit">
                    <Form.Item>
                        <Button htmlType="submit">{edit?"Actualizar":"Finalizar"}</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

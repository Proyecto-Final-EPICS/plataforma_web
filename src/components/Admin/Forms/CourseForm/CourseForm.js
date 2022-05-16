//Liberias
import { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber } from 'antd';

//Estilos
import './CourseForm.scss';

export default function CourseForm(props) {
    const { Option } = Select;

    const { courses, setCourses, setModalVisible, edit, toEdit } = props;
    const [form] = Form.useForm();
    
    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const onFinish = course => {
        console.log(course);
        
        if(edit) {
            courses[courses.findIndex(c => c.code === toEdit.code)] = course;
            setCourses([...courses]);
        }else setCourses([...courses, course]);

        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { code, name, level, capacity } = toEdit;
            form.setFieldsValue({code, name, level, capacity});
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
                <Col span={10}>
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
                <Col span={14}>
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

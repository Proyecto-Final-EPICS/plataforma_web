//Liberias
import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Radio, Row, Col, Select, Steps, Divider } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';

import courseApi from '../../../../mock_data/collections/course.json'

//Estilos
import './StudentForm.scss';

export default function StudentForm(props) {
    const { Step } = Steps;
    const { Option } = Select;

    const { students, setStudents, setModalVisible, school, edit } = props;
    const [initialValues, setInitialValues] = useState({});
    const [gender, setGender] = useState(null);
    const [customGender, setCustomGender] = useState(null);
    // const [docType, setDocType] = useState('Tarjeta de identidad');
    const [form] = Form.useForm();
    const [step, setStep] = useState(1);
    const [fieldsScdPage, setFieldsScdPage] = useState({});

    const courses = courseApi.filter(c => c.school == school);

    const SelectDocType = (
        <Form.Item name="docType" noStyle>
            <Select
                id="docType-select"
                // value={docType}
                // onChange={val => setDocType(val)}
            >
                <Option key="0" value="Tarjeta de identidad">Tarjeta de identidad</Option>
                <Option key="1" value="Cédula de ciudadanía">Cédula de ciudadanía</Option>
            </Select>
        </Form.Item>
    );

    const SelectPhoneCountryCode = (
        <Form.Item name="repPhoneCountryCode" noStyle>
            <Select
                id="repPhoneCountryCode-select"
                // value={docType}
                // onChange={val => setDocType(val)}
            >
                <Option value="57">+57</Option>
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = values => {
        // console.log({...values, ...fieldsScdPage});
        form.validateFields()
            .then((res, rej) => {
                console.log(res, rej);
            })
        // form.
        // form.resetFields();
        // setModalVisible(false);

        // const { username, password, firstname, lastname, gender, identityDoc, docType, birthDate, email, 
        //     course, repFirstname, repLastname, phone, phoneCountryCode} = values;
        // values = {
        //     username, password, firstname, lastname, gender, identityDoc, docType, birthDate, email,
        //     course, repFirstname, repLastname, phone: { number: phone, countryCode: phoneCountryCode, 
        //     school };
        // }
        // if (edit) {
        //     students[students.findIndex(s => s.username === initialValues.username)] = values;
        //     setStudents([...students]);
        // } else setStudents([...students, values]);

        // form.resetFields();
    };

    const onFinishFailed = err => console.log(err);

    // const getInitialValues = () => {
    //     if (!edit) return { phoneCountryCode };
    //     const { birthDate, gender, email, firstname, lastname, identityDoc, username,
    //         phone: { number, countryCode } } = props.initialValues;

    //     return {
    //         email, firstname, lastname, identityDoc, username, gender,
    //         phone: number,
    //         phoneCountryCode: countryCode || phoneCountryCode,
    //         birthDate: moment(birthDate),
    //     };
    // }

    useEffect(() => {
        // form.resetFields();
        // const initialValues = getInitialValues();

        // const { gender } = initialValues;
        // setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
        // setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);

        // setInitialValues(initialValues);
    }, []);

    return (
        <Form
            className="student-form"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // initialValues={initialValues}
            initialValues={{
                docType: 'Tarjeta de identidad',
                repPhoneCountryCode: '57',
            }}
            layout="vertical"
        >
            <Steps current={step} className='student-form__steps'>
                <Step key={1} title="Paso 1"/>
                <Step key={2} title="Paso 2"/>
            </Steps>
            {step === 1 ?
                // STEP 1***************************************************************************************
                <>
                <Form.Item
                    name="username"
                    label="Usuario"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Contraseña"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                }
                            ]}
                        >
                            <Input type="password" prefix={<LockOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            required
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value)
                                            return Promise.resolve();

                                        return Promise.reject(new Error('Las contraseñas coinciden'));
                                    },
                                })
                            ]}
                        >
                            <Input type="password" prefix={<LockOutlined />} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    className="student-form__name"
                    name="name"
                    label="Nombre"
                    required
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="firstname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    }
                                ]}
                            >
                                <Input placeholder="Nombres" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="lastname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    }
                                ]}
                            >
                                <Input placeholder="Apellidos" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="identityDoc"
                    label="Documento de identidad"
                >
                    <Input addonBefore={SelectDocType} />
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Fecha de nacimiento"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <DatePicker placeholder="Seleccionar" />
                </Form.Item>

                <Form.Item
                    className="student-form__gender"
                    name="gender"
                    label="Género"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <Row>
                        <Col>
                            <Radio.Group
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            >
                                <Radio.Button value="Masculino">Masculino</Radio.Button>
                                <Radio.Button value="Femenino">Femenino</Radio.Button>
                                {gender !== 'Otro' ?
                                    <Radio.Button value={'Otro'}>Otro</Radio.Button>
                                    : null}
                            </Radio.Group>
                        </Col>

                        {gender === 'Otro' ?
                            <Col>
                                <Input
                                    id="custom-gender-input"
                                    placeholder="Género personalizado"
                                    value={customGender}
                                    onChange={e => setCustomGender(e.target.value)}
                                />
                            </Col>
                            : null}
                    </Row>
                </Form.Item>
                </>
            : 
            // STEP 2***************************************************************************************
                <>
                <Divider orientation="left" plain>Curso</Divider>
                <Form.Item
                    name="course"
                    label="Curso"
                >
                    <Select>
                        {courses.map((c, i) => (
                            <Option key={i} value={c.code}>{c.code}</Option>
                        ))}
                    </Select>
                </Form.Item>
                
                <Divider orientation="left" plain>Representante Legal</Divider>
                <Form.Item
                    className="student-form__repName"
                    name="repName"
                    label="Nombre"
                    required
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="repFirstname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    }
                                ]}
                            >
                                <Input placeholder="Nombres" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="repLastname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    }
                                ]}
                            >
                                <Input placeholder="Apellidos" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Row gutter={8}>
                    <Col>
                        <Form.Item
                            name="repIdentityDoc"
                            label="Cédula"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    
                    <Col>
                        <Form.Item
                            name="repPhone"
                            label="Teléfono"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                }
                            ]}
                        >
                                <Input addonBefore={SelectPhoneCountryCode} prefix={<PhoneOutlined/>}/>
                        </Form.Item>
                    </Col>
                </Row>
                </>
            }
            
            {/* Sección Final */}
                <Row
                    className='student-form__options'
                    justify='center'
                    gutter={8}
                >
                    <Col className="student-form__options__back">
                        <Button
                            id="student-form-back"
                            disabled={step == 1}
                            onClick={() => {
                                setFieldsScdPage(form.getFieldsValue());
                                setStep(step - 1);
                            }}
                        >Anterior</Button>
                    </Col>
                    
                    <Col className="student-form__options__end">
                        <Form.Item className="student-form__options__end__reset">
                            <Button onClick={() => form.resetFields()}>Limpiar campos</Button>
                        </Form.Item>
                        <Form.Item className="student-form__options__end__submit">
                            <Button htmlType="submit" >
                                {edit ? "Actualizar" : "Finalizar"}
                            </Button>
                        </Form.Item>
                    </Col>

                    <Col className="student-form__options__next">
                        <Button
                            id="student-form-next"
                            disabled={step == 2}
                            onClick={() => {
                                setFieldsScdPage(form.getFieldsValue());
                                setStep(step + 1);
                            }}
                        >Siguiente</Button>
                    </Col>
                    
                </Row>
        </Form>
    );
}

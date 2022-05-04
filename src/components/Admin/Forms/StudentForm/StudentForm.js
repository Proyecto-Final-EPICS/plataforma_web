//Liberias
import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Radio, Row, Col, Select, Divider, Tabs } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';

import courseApi from '../../../../mock_data/collections/course.json'

//Estilos
import './StudentForm.scss';

export default function StudentForm(props) {
    const { TabPane } = Tabs;
    const { Option } = Select;

    const { students, setStudents, setModalVisible, school, edit, toEdit } = props;
    const [gender, setGender] = useState(null);
    const [customGender, setCustomGender] = useState(null);
    const [form] = Form.useForm();

    const courses = courseApi.filter(c => c.school == school);

    const SelectDocType = (
        <Form.Item name="docType" noStyle>
            <Select>
                <Option key="0" value="Tarjeta de identidad">Tarjeta de identidad</Option>
                <Option key="1" value="Cédula de ciudadanía">Cédula de ciudadanía</Option>
            </Select>
        </Form.Item>
    );

    const SelectPhoneCountryCode = (
        <Form.Item name="repPhoneCountryCode" noStyle>
            <Select>
                <Option value="57">+57</Option>
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );

    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);

    const onFinish = values => {
        console.log(values);

        const { username, password, firstname, lastname, gender, identityDoc, docType, birthDate, course, 
            repFirstname, repLastname, repPhone, repPhoneCountryCode, repIdentityDoc } = values;
        
        const student = {
            username, password, firstname, lastname, gender, identityDoc, docType, birthDate, course, school, 
            representative: {
                firstname: repFirstname,
                lastname: repLastname,
                identityDoc: repIdentityDoc,
                phone: {
                    number: repPhone,
                    countryCode: repPhoneCountryCode,
                }
            }
        }
        if (edit) {
            students[students.findIndex(s => s.username === toEdit.username)] = student;
            setStudents([...students]);
        } else setStudents([...students, student]);
        
        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { username, firstname, lastname, gender, identityDoc, docType, birthDate, course, 
                representative: { firstname: repFirstname, lastname: repLastname, identityDoc: repIdentityDoc, 
                phone: { number: repPhone, countryCode: repPhoneCountryCode } } } = toEdit;
            // 
            setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
            setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);
            
            form.setFieldsValue({
                username, firstname, lastname, gender, identityDoc, docType, course, 
                repFirstname, repLastname, repIdentityDoc, repPhone, repPhoneCountryCode,
                birthDate: moment(birthDate)
            });
        }
    }, []);

    // form.setFieldsValue({
    //     "username": "p",
    //     "password": "p",
    //     "confirmPassword": "p",
    //     "firstname": "p",
    //     "lastname": "p",
    //     "name": "p",
    //     "docType": "Tarjeta de identidad",
    //     "identityDoc": "1",
    //     "birthDate": moment(),
    //     "gender": "Masculino",
    //     "course": "C03",
    //     "repFirstname": "a",
    //     "repLastname": "a",
    //     "repName": "a",
    //     "repPhoneCountryCode": "57",
    //     "repPhone": "123"
    // })

    return (
        <Form
            className="student-form"
            form={form}
            initialValues={{
                docType: 'Tarjeta de identidad',
                repPhoneCountryCode: '57',
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Tabs defaultActiveKey='0' tabPosition='left' centered>
                <TabPane key='0' tab='Datos Personales'>
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

                                            return Promise.reject(new Error('Las contraseñas no coinciden'));
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
                </TabPane>

                <TabPane key='1' tab='Datos Adicionales'>
                    <Divider orientation="left" plain>Curso</Divider>
                    <Form.Item
                        name="course"
                        label="Curso"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Select>
                            {courses.map((c, i) => (
                                <Option key={i} value={c.code}>{c.code}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <br></br>
                    
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
                </TabPane>
            </Tabs>
            
            {/* Sección Final *********************************************************************/}
            <Row
                className='student-form__options'
                justify='center'
                gutter={8}
            >
                <Col className="student-form__options__reset">
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>

                <Col className="student-form__options__submit">
                    <Form.Item>
                        <Button htmlType='submit'>{edit ? "Actualizar" : "Finalizar"}</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

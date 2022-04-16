//Liberias
import { useState } from 'react';
import {Form, Input, Button, DatePicker, Radio, Row, Col, Select, notification} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';

//Api
import {addProfessor, signinAPI} from '../../../../api/users'; 

//Utils
import {ACCESS_TOKEN} from '../../../../utils/constants';

//Estilos
import './RegisterDirectorForm.scss';

//...
const {Option} = Select;

export default function RegisterDirectorForm(props) {
    
    // const {setIsVisibleModal} = props;
    const [phoneCountryCode, setPhoneCountryCode] = useState('57');
    const [genderValue, setGenderValue] = useState(null);
    const [form] = Form.useForm();
    
    const onChangeGenderRadio = e => {
        setGenderValue(e.target.value==='other'?'':e.target.value);
    }

    const onChangeGenderInput = e => {
        setGenderValue(e.target.value);
    }

    const onChangePhoneAddonBefore = val => {
        setPhoneCountryCode(val);
    }

    const signup = values => {
        return addProfessor(values).then(response => {
            notification.success({ message: response });
            form.resetFields();
            return response;
        }).catch(err => {
            notification.error({ message: err });
        });
    }

    const login = async values => {
        if(!values.username || !values.password) return;
        const result = await signinAPI(values);
        const {token} = result;

        if (token === "none") {
            console.log("Login't");

        }else{
            localStorage.setItem(ACCESS_TOKEN, token);
            window.location.href= "/home";
        }
    }

    const onFinish = values => {
        console.log(values);
        const {username, password, firstname, lastname, gender, identityDoc, birthDate, email, 
            phone: number, phoneCountryCode: countryCode} = values;

        values = {
            username, password, firstname, lastname, gender, identityDoc, birthDate, email,
            phone: {number, countryCode}
        }

        signup(values).then(() => {
            login({username, password});
        });
    };

    const onFinishFailed = error => {
        console.log(error);
        // form.resetFields();
    };

    const phoneAddonBefore = (
        <Form.Item name="phoneCountryCode" noStyle>
            <Select value={phoneCountryCode} onChange={onChangePhoneAddonBefore}>
                <Option value="57">+57</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            className="signup-prof-form"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{phoneCountryCode}}
            layout="vertical"
        >
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
                {/* <Input placeholder="Usuario"/> */}
                <Input prefix={<UserOutlined/>}/>
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
                        {/* <Input type="password" placeholder="Contraseña"/> */}
                        <Input type="password" prefix={<LockOutlined/>}/>
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
                        {/* <Input type="password" placeholder="Contraseña"/> */}
                        <Input type="password" prefix={<LockOutlined/>}/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                className="signup-prof-form__name"
                name="name"
                label="Nombre"
                required
            >
            <Row gutter={8} className="signup-prof-form__name__row">
                <Col span={12} className="signup-prof-form__name__col">
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    {/* <Input placeholder="Nombres"/> */}
                    <Input placeholder="Nombres"/>
                </Form.Item>
                </Col>
                
                <Col span={12} className="signup-prof-form__name__col">
                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    {/* <Input placeholder="Apellidos"/> */}
                    <Input placeholder="Apellidos"/>
                </Form.Item>
                </Col>
            </Row>
            </Form.Item>

            <Row gutter={8}>
            <Col span={12}>
                <Form.Item
                    name="identityDoc"
                    label="Cédula"
                >
                    {/* <Input placeholder="Documento de Identidad"/> */}
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={12}>
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
                    <DatePicker placeholder="Seleccionar"/>
                </Form.Item>
            </Col>
            </Row>

            <Form.Item
                className="signup-prof-form__gender"
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
            {/* <Space direction="horizontal"> */}
                <Radio.Group
                    value={genderValue}
                    onChange={onChangeGenderRadio}
                >
                    <Radio.Button value="male">Masculino</Radio.Button>
                    <Radio.Button value="female">Femenino</Radio.Button>
                    {genderValue===null || genderValue==='male' || genderValue==='female'?
                    <Radio.Button value="other">Otro</Radio.Button>:
                    <Input
                        id="custom-gender-input" 
                        placeholder="Género personalizado" 
                        onChange={onChangeGenderInput}
                    />}
                </Radio.Group>
                
            {/* </Space> */}
            </Form.Item>

            <Row gutter={8}>
            <Col span={14}>
                <Form.Item
                    name="email"
                    label="Email"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    {/* <Input type="email" placeholder="Email"/> */}
                    <Input type="email" prefix={<MailOutlined/>}/>
                </Form.Item>
            </Col>
            <Col span={10}>
                <Form.Item
                    name="phone"
                    label="Teléfono"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    {/* <Input type="tel" placeholder="Teléfono"/> */}
                    <Input addonBefore={phoneAddonBefore} prefix={<PhoneOutlined/>}/>
                </Form.Item>
            </Col>
            </Row>
            <div className="signup-prof-form__submit">
            <Form.Item>
                <Button htmlType="submit">Registrarse</Button>
            </Form.Item>
            </div>
        </Form>
    );
}

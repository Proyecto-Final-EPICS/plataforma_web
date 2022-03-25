//Liberias
import { useState } from 'react';
import {Form, Input, Button, DatePicker, Radio, Space, Row, Col, Divider, Select, notification} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';

//Api
import {addProfessor, signinAPI} from '../../../../api/users'; 

//Utils
import {ACCESS_TOKEN} from '../../../../utils/constants';

//Estilos
import './SignUpProfessorForm.scss';

//...
const {Option} = Select;

export default function SignUpProfessorForm(props) {
    
    // const {setIsVisibleModal} = props;
    const [genderValue, setGenderValue] = useState(null);
    const [form] = Form.useForm();
    
    const phoneCountryCode = (
        <Form.Item name="phonecountrycode" noStyle>
            <Select defaultValue="57">
                <Option value="57">+57</Option>
            </Select>
        </Form.Item>
    );

    const onChangeGenderRadio = e => {
        // console.log(e.target.value);
        setGenderValue(e.target.value==='other'?'':e.target.value);
    }

    const onChangeGenderInput = e => {
        // console.log(e.target.value);
        setGenderValue(e.target.value);
    }

    const signup = values => {
        return addProfessor(values).then(response => {
            notification.success({ message: response });
            // form.resetFields();
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
        // const {birthdate, confirmpassword, email, firstname, indetityDoc, lastname, 
        //     password, phone, phoneCountryCode, username} = values;
        const {username, password, firstname, lastname, email} = values;
        values = {username, password, firstname, lastname, email};
        
        signup(values).then(() => {
            login({username, password});
        });
        // form.resetFields();
    };

    const onFinishFailed = error => {
        console.log(error);
        // form.resetFields();
    };

    return (
        <Form
            className="signup-prof-form"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{}}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="Usuario"
                required
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
                    >
                        {/* <Input type="password" placeholder="Contraseña"/> */}
                        <Input type="password" prefix={<LockOutlined/>}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmpassword"
                        label="Confirmar contraseña"
                        required
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
                >
                    {/* <Input placeholder="Nombres"/> */}
                    <Input placeholder="Nombres"/>
                </Form.Item>
                </Col>
                
                <Col span={12} className="signup-prof-form__name__col">
                <Form.Item
                    name="lastname"
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
                    name="identitydoc"
                    label="Cédula"
                >
                    {/* <Input placeholder="Documento de Identidad"/> */}
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="birthdate"
                    label="Fecha de nacimiento"
                    required
                >
                    <DatePicker placeholder="Seleccionar"/>
                </Form.Item>
            </Col>
            </Row>

            <Form.Item
                name="gender"
                label="Género"
                required
                className="signup-prof-form__gender"
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
                >
                    {/* <Input type="tel" placeholder="Teléfono"/> */}
                    <Input addonBefore={phoneCountryCode} prefix={<PhoneOutlined/>}/>
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

//Liberias
import { useState } from 'react';
import {Form, Input, Button, DatePicker, Radio, Space, Row, Col, Divider, Select, notification} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';

//Api
// ...

//Estilos
import './SignUpProfessorForm.scss';

//...
const {Option} = Select;

export default function SignUpProfessorForm(props) {
    
    // const {setIsVisibleModal} = props;
    const [genderValue, setGenderValue] = useState('male');
    const [form] = Form.useForm();
    
    const phoneCountryCode = (
    <Form.Item name="phonecountrycode" noStyle>
        <Select defaultValue="57">
            <Option value="57">+57</Option>
        </Select>
    </Form.Item>
    );

    const onChangeGender = e => {
        setGenderValue(e.target.value);
    }

    const onFinish = values => {
        console.log(values);
        console.log(genderValue);
        form.resetFields();
    };

    const onFinishFailed = error => {
        console.log(error);
        // form.resetFields();
    };

    return (
        <Form
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
                className="form__name"
                name="name"
                label="Nombre"
                required
            >
            <Row gutter={8} className="form__name__row">
                <Col span={12} className="form__name__col">
                <Form.Item
                    name="firstname"
                >
                    {/* <Input placeholder="Nombres"/> */}
                    <Input placeholder="Nombres"/>
                </Form.Item>
                </Col>
                
                <Col span={12} className="form__name__col">
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
                className="form__gender"
            >
            {/* <Space direction="horizontal"> */}
                <Radio.Group
                    value={genderValue}
                    onChange={onChangeGender}
                >
                    <Radio.Button value="male">Masculino</Radio.Button>
                    <Radio.Button value="female">Femenino</Radio.Button>
                    {genderValue==='male' || genderValue==='female'?
                    <Radio.Button value="other">Otro</Radio.Button>:
                    <Input id="custom-gender-input" placeholder="Género personalizado"/>}
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
            <div className="form__submit">
            <Form.Item>
                <Button htmlType="submit">Registrarse</Button>
            </Form.Item>
            </div>
        </Form>
    );
}

/*
        <Form className=""
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{}}
        >
            <Divider orientation="left" plain>Información de usuario</Divider>
            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca su nombre de usuario'
                        }
                    ]}
                >
                    <Input placeholder="Usuario"/>
                </Form.Item>
                </Col>

                <Col span={12}>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca una contraseña'
                        }
                    ]}
                >
                    <Input type="password" placeholder="Contraseña"/>
                </Form.Item>
                </Col>
            </Row>

            <Divider orientation="left" plain>Información personal</Divider>
            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item
                    name="firstname"
                >
                    <Input placeholder="Nombres"/>
                </Form.Item>
                </Col>

                <Col span={12}>
                <Form.Item
                    name="lastname"
                >
                    <Input placeholder="Apellidos"/>
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                <Form.Item
                    name="birthdate"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca su fecha de nacimiento'
                        }
                    ]}
                >
                    <DatePicker placeholder="Fecha de nacimiento"/>
                </Form.Item>
                </Col>

                <Col span={8}>
                <Form.Item name="gender">
                    <Input placeholder="Género"/>
                </Form.Item>
                </Col>

                <Col span={8}>
                <Form.Item
                    name="identitydoc"
                    rules={[
                        {
                            required: true,
                            message: 'Se requiere su documento de identidad'
                        }
                    ]}
                >
                    <Input placeholder="Documento de Identidad"/>
                </Form.Item>
                </Col>
            </Row>

            <Divider orientation="left" plain>Contacto</Divider>
            
            <Row gutter={24}>
                
                <Col span={12}>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Digite un teléfono'
                        }
                    ]}
                >
                    <Input type="tel" placeholder="Teléfono"/>
                </Form.Item>
                </Col>

                <Col span={12}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca el email'
                        }
                    ]}
                >
                    <Input type="email" placeholder="Email"/>
                </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit">Registrarse</Button>
            </Form.Item>
        </Form>
*/

/*
<Form.Item
                name="gender"
                label="Género"
                rules={[
                    {
                        required: true,
                        message: 'Campo requerido'
                    }
                ]}
            >
            <Space direction="horizontal">
                <Radio.Group>
                    <Radio.Button value="male">Masculino</Radio.Button>
                    <Radio.Button value="female">Femenino</Radio.Button>
                    <Radio.Button value="other">Otro</Radio.Button>
                </Radio.Group>
                
                <Form.Item
                    noStyle
                    shouldUpdate={shouldGenderUpdate}
                    >
                    {(formInfo) => isGenderOther(formInfo)?
                    <Form.Item
                    name="customgender"
                    rules={[
                        {
                            required: true,
                            message: "Campo requerido"
                        }
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                    :null}
                </Form.Item>

            </Space>
            </Form.Item>
*/
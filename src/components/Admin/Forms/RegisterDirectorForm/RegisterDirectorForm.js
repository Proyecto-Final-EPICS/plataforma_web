//Liberias
import { useState, useEffect } from 'react';
import {Form, Input, Button, DatePicker, Radio, Row, Col, Select, notification} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';
import moment from 'moment';

//Api
// import {addProfessor, signinAPI} from '../../../../api/users'; 

//Utils
// import {ACCESS_TOKEN} from '../../../../utils/constants';

//Estilos
import './RegisterDirectorForm.scss';

export default function RegisterDirectorForm(props) {
    const { Option } = Select;
    const { directors, setDirectors, modalVisible, setModalVisible, edit, initialValues } = props;
    const [phoneCountryCode, setPhoneCountryCode] = useState('57');
    const [gender, setGender] = useState(null);
    const [customGender, setCustomGender] = useState(null);
    const [loadInitialValues, setLoadInitialValues] = useState(true);
    const [form] = Form.useForm();
    
    const onChangePhoneAddonBefore = val => setPhoneCountryCode(val);

    // const signup = values => {
    //     return addProfessor(values).then(response => {
    //         notification.success({ message: response });
    //         form.resetFields();
    //         return response;
    //     }).catch(err => {
    //         notification.error({ message: err });
    //     });
    // }

    // const login = async values => {
    //     if(!values.username || !values.password) return;
    //     const result = await signinAPI(values);
    //     const {token} = result;

    //     if (token === "none") {
    //         console.log("Login't");

    //     }else{
    //         localStorage.setItem(ACCESS_TOKEN, token);
    //         window.location.href= "/home";
    //     }
    // }

    const onFinish = values => {
        setModalVisible(false);
        
        console.log(values);
        // console.log(JSON.stringify(values));
        const {username, password, firstname, lastname, gender, identityDoc, birthDate, email, 
            phone: number, phoneCountryCode: countryCode} = values;

        values = {
            username, password, firstname, lastname, gender, identityDoc, birthDate, email,
            phone: {number, countryCode}
        }

        // signup(values).then(() => {
        //     login({username, password});
        // });
        
        if(edit) {
            directors[directors.findIndex(d => d.username === initialValues.username)] = values;
            setDirectors([...directors]);
        }else setDirectors([...directors, values]);

        resetFields();
    };

    const onFinishFailed = err => {
        console.log(gender);
        console.log(customGender);
        console.log(err)
    };

    const phoneAddonBefore = (
        <Form.Item name="phoneCountryCode" noStyle>
            <Select value={phoneCountryCode} onChange={onChangePhoneAddonBefore}>
                <Option value="57">+57</Option>
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );

    const getInitialValues = () => {
        if(!edit) return {phoneCountryCode};

        const { birthDate, gender, email, firstname, lastname, identityDoc, username, 
            phone: { number, countryCode } } = initialValues;
        
        return {
            email, firstname, lastname, identityDoc, username, gender, 
            phone: number,
            phoneCountryCode: countryCode || phoneCountryCode,
            birthDate: moment(birthDate),
        };
    }

    const resetFields = () => {
        form.resetFields();
        setCustomGender(null);
        setGender(null);
    }

    // (() => {
    //     if(edit && loadInitialValues) {
    //         const initialValues = getInitialValues();
    //         const { gender } = initialValues;
    //         setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
    //         setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);
            
    //         form.setFieldsValue(initialValues);
    //         setLoadInitialValues(false);
    //     }
    // })();
    
    useEffect(() => {
        console.log('modalVisible: ', modalVisible);
        
        if(modalVisible) {
            console.log('cancel...');
            resetFields();
            setModalVisible(false);
        }
    }, [modalVisible]);

    // useEffect(() => {
    //     console.log('eff', modalVisible, edit);
    //     if(modalVisible && edit) {
    //         console.log('eff2');
    //         const initialValues = getInitialValues();
    //         const { gender } = initialValues;
    //         setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
    //         setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);
            
    //         form.setFieldsValue(initialValues);
    //     }
    // }, [modalVisible]);

    // useEffect(() => {
    //     console.log(modalVisible);
    // }, [modalVisible])

    useEffect(() => {
        if(edit) {
            const initialValues = getInitialValues();
            const { gender } = initialValues;
            setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
            setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);
            
            form.setFieldsValue(initialValues);
        }
    });

    return (
        <Form
            className="signup-prof-form"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // initialValues={initialValues}
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
            <Row>
                <Col>
                <Radio.Group
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                >
                    <Radio.Button value="Masculino">Masculino</Radio.Button>
                    <Radio.Button value="Femenino">Femenino</Radio.Button>
                    {gender !== 'Otro'?
                    <Radio.Button value={'Otro'}>Otro</Radio.Button>
                    :null}
                </Radio.Group>
                </Col>
                
                {gender === 'Otro'?
                <Col>
                    <Input
                        id="custom-gender-input" 
                        placeholder="Género personalizado" 
                        value={customGender}
                        onChange={e => setCustomGender(e.target.value)}
                    />
                </Col>
                :null}
            </Row>
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
            <Row
                className='signup-prof-form__end'
                justify='center'
                gutter={8}
            >
                <Col className="signup-prof-form__end__reset">
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>
                <Col className="signup-prof-form__end__submit">
                    <Form.Item>
                        <Button htmlType="submit">{edit?"Actualizar":"Registrarse"}</Button>
                    </Form.Item>
                </Col>

            </Row>
        </Form>
    );
}

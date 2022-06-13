//Liberias
import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Radio, Row, Col, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';

import { addDirector, editDirector, getDirectorsFromSchool } from '../../../../api/director';

//Estilos
import './DirectorForm.scss';

export default function DirectorForm(props) {
    const { Option } = Select;

    const { setDirectors, setModalVisible, school, edit, toEdit, setRowSel } = props;
    const [gender, setGender] = useState(null);
    const [customGender, setCustomGender] = useState(null);
    const [form] = Form.useForm();

    const SelectPhoneCountryCode = (
        <Form.Item name='phone_country_code' noStyle>
            <Select>
                <Option value='57'>+57</Option>
                <Option value='58'>+58</Option>
            </Select>
        </Form.Item>
    );

    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const onFinish = values => {
        const { username, password, firstname, lastname, gender, identity_doc, 
            birth_date, email, phone: number, phone_country_code: country_code } = values;
        
        const director = {
            username, password, firstname, lastname, gender, identity_doc, email, birth_date, 
            phone: { number, country_code },
            id_school: school
        }
        console.log(director);
        
        const updateDirectors = () => getDirectorsFromSchool(school).then(json => setDirectors(json));
        
        if(edit) {
            editDirector(toEdit.username, director).then(updateDirectors);
            setRowSel(null);
        }
        else addDirector(director).then(updateDirectors);

        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { username, firstname, lastname, gender, identity_doc, 
                birth_date: { $date }, email, 
                phone: { number: phone, country_code: phone_country_code } } = toEdit;
            // 
            setGender(gender == 'Masculino' || gender == 'Femenino' ? gender : 'Otro');
            setCustomGender(gender !== 'Masculino' && gender !== 'Femenino' ? gender : null);
            
            form.setFieldsValue({
                username, firstname, lastname, gender, identity_doc, email, 
                phone, phone_country_code,
                birth_date: moment($date)
            });
        }
    }, []);

    return (
        <Form
            className='dir-form'
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{phone_country_code: '57'}}
            layout='vertical'
        >
            <Form.Item
                name='username'
                label='Usuario'
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
                        name='password'
                        label='Contraseña'
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input type='password' prefix={<LockOutlined/>}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='confirm_password'
                        label='Confirmar contraseña'
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
                        <Input type='password' prefix={<LockOutlined/>}/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                className='dir-form__name'
                name='name'
                label='Nombre'
                required
            >
            <Row gutter={8} className='dir-form__name__row'>
                <Col span={12} className='dir-form__name__col'>
                <Form.Item
                    name='firstname'
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <Input placeholder='Nombres'/>
                </Form.Item>
                </Col>
                
                <Col span={12} className='dir-form__name__col'>
                <Form.Item
                    name='lastname'
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <Input placeholder='Apellidos'/>
                </Form.Item>
                </Col>
            </Row>
            </Form.Item>

            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        name='identity_doc'
                        label='Cédula'
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='birth_date'
                        label='Fecha de nacimiento'
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <DatePicker placeholder='Seleccionar'/>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                className='dir-form__gender'
                name='gender'
                label='Género'
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
                    <Radio.Button value='Masculino'>Masculino</Radio.Button>
                    <Radio.Button value='Femenino'>Femenino</Radio.Button>
                    {gender !== 'Otro'?
                    <Radio.Button value={'Otro'}>Otro</Radio.Button>
                    :null}
                </Radio.Group>
                </Col>
                
                {gender === 'Otro'?
                <Col>
                    <Input
                        id='custom-gender-input' 
                        placeholder='Género personalizado' 
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
                        name='email'
                        label='Email'
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input type='email' prefix={<MailOutlined/>}/>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name='phone'
                        label='Teléfono'
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
            
            <Row
                className='dir-form__options'
                justify='center'
                gutter={8}
            >
                <Col className='dir-form__options__reset'>
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>

                <Col className='dir-form__options__submit'>
                    <Form.Item>
                        <Button htmlType='submit'>{edit?'Actualizar':'Finalizar'}</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

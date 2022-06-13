//Liberias
import { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Tabs, InputNumber } from 'antd';
import moment from 'moment';

import { addGame, editGame, getGamesFromSchool } from '../../../../api/game';

//Estilos
import './GameForm.scss';
import { getSchools } from '../../../../api/school';

export default function GameForm(props) {
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    const { Option } = Select;

    const { setGames, setModalVisible, school, edit, toEdit, setRowSel } = props;
    const [numModules, setNumModules] = useState(1);
    const [numDevs, setNumDevs] = useState(1);
    const [schools, setSchools] = useState([]);
    const [form] = Form.useForm();
    
    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const onFinish = values => {
        
        const modules = Array(numModules)
        for(let i = 0; i < numModules; i++) {
            modules[i] = {
                'name': values[`mod_name${i}`],
                'num_questions': values[`mod_num_questions${i}`]
            }
        }
        const devs = Array(numDevs)
        for(let i = 0; i < numDevs; i++) {
            devs[i] = {
                'firstname': values[`dev_firstname${i}`],
                'lastname': values[`dev_lastname${i}`],
                'id_school': values[`dev_id_school${i}`]
            }
        }
        const { code, name, topic, level, launch_date, short_description, description } = values;
        const game = { code, name, topic, level, launch_date, short_description, description, 
            devs, modules, id_school: school }
        
        console.log(game);
        const updateGames = () => getGamesFromSchool(school).then(json => setGames(json));
        
        if(edit) {
            editGame(school, toEdit.code, game).then(updateGames);
            setRowSel(null);
        }
        else addGame(school, game).then(updateGames);

        setModalVisible(false);
    };

    useEffect(() => {
        getSchools().then(json => setSchools(json.map(s => s.id_school)));
        if(edit) {
            const { code, name, topic, level, launch_date: { $date }, short_description, 
                description, modules, devs } = toEdit;
            // 
            setNumModules(modules.length)
            setNumDevs(devs.length)

            const fieldsValue = {}
            modules.forEach(({ name, num_questions }, i) => {
                fieldsValue[`mod_name${i}`] = name;
                fieldsValue[`mod_num_questions${i}`] = num_questions;
            })
            devs.forEach(({ firstname, lastname, id_school }, i) => {
                fieldsValue[`dev_firstname${i}`] = firstname;
                fieldsValue[`dev_lastname${i}`] = lastname;
                fieldsValue[`dev_id_school${i}`] = id_school;
            })

            form.setFieldsValue({
                ...fieldsValue,
                code, name, topic, level, short_description, description, 
                launch_date: moment($date)
            });
        }
    }, []);

    return (
        <Form
            className="game-form"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Tabs defaultActiveKey='0' tabPosition='left' centered>
                <TabPane key='0' tab='Información General'>
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
                                name="topic"
                                label="Tópico"
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
                        <Col span={6}>
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
                        <Col span={9}>
                            <Form.Item
                                name="launch_date"
                                label="Fecha de Lanzamiento"
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
                        name="short_description"
                        label="Descripción Corta"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input maxLength={100}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Descripción"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <TextArea showCount maxLength={1000}/>
                    </Form.Item>
                </TabPane>
                <TabPane key='1' tab='Información Adicional' forceRender>
                    <Row gutter={8}>
                        <Col span={12}>
                            <div className='game-form__list'>
                            {[...Array(numModules).keys()].map(i => (
                                <Form.Item
                                    key={i}
                                    name={`module${i}`}
                                    label={`Módulo ${i+1}`}
                                    required
                                    className='game-form__list__item'
                                >
                                    <Form.Item
                                        name={`mod_name${i}`}
                                        className='game-form__list__item__input'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Campo requerido',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Nombre'/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`mod_num_questions${i}`}
                                        className='game-form__list__item__input'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Campo requerido',
                                            }
                                        ]}
                                    >
                                        <InputNumber 
                                            min={1} max={100} 
                                            placeholder='Número de preguntas'
                                            style={{'width': 'max-content'}}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            ))}
                            </div>
                            <div className='game-form__list-options'>
                                <Button onClick={() => (
                                    numModules > 1 && setNumModules(numModules - 1)
                                )}>-</Button>
                                <Button onClick={() => (
                                    setNumModules(numModules + 1)
                                )}>+</Button>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div className='game-form__list'>
                            {[...Array(numDevs).keys()].map(i => (
                                <Form.Item
                                    key={i}
                                    name={`dev${i}`}
                                    label={`Desarrollador ${i+1}`}
                                    required
                                    className='game-form__list__item'
                                >
                                    <Form.Item
                                        name={`dev_firstname${i}`}
                                        className='game-form__list__item__input'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Campo requerido',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Nombres'/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`dev_lastname${i}`}
                                        className='game-form__list__item__input'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Campo requerido',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Apellidos'/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`dev_id_school${i}`}
                                        label='ID Colegio'
                                        className='game-form__list__item__input game-form__dev_id_school'
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Campo requerido',
                                        //     }
                                        // ]}
                                    >
                                        <Select className='game-form__list__item__input__select' allowClear>
                                            {schools.map((s, i) => (
                                                <Option key={i} value={s}>{s}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Form.Item>
                            ))}
                            </div>
                            <div className='game-form__list-options'>
                                <Button onClick={() => (
                                    numDevs > 1 && setNumDevs(numDevs - 1)
                                )}>-</Button>
                                <Button onClick={() => (
                                    setNumDevs(numDevs + 1)
                                )}>+</Button>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>

            <Row
                className='game-form__options'
                justify='center'
                gutter={8}
            >
                <Col className="game-form__options__reset">
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>

                <Col className="game-form__options__submit">
                    <Form.Item>
                        <Button htmlType="submit">{edit?"Actualizar":"Finalizar"}</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

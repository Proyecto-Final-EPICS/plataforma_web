
import { Button, Layout, Input } from 'antd';

import './MenuTop.scss';

import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'; 

export default function MenuTop(props) {
    const {Header} = Layout;
    const {rowSel, setRowSel, setSearch, optionsAvailable} = props;

    const someRowSel = () => rowSel !== -1;

    return (
        <Header className='admin-top'>

            <div className='admin-top__section'>
            <h1 className='admin-top__section'>Interfaz de Administrador</h1>
            </div>
            
            <div className='admin-top__section admin-top__options'>
                <div className='admin-top__options__reg'>
                    <Button icon={<PlusCircleOutlined/>} disabled={!optionsAvailable}/>
                    <Button icon={<EditOutlined/>} disabled={!optionsAvailable || !someRowSel()}/>
                    <Button icon={<DeleteOutlined/>} disabled={!optionsAvailable || !someRowSel()}/>
                </div>
                <div className='admin-top__options__search'>
                <Input
                    className='admin-top__options__search__input'
                    placeholder="Buscar"
                    prefix={<SearchOutlined/>}
                    onPressEnter={e => setSearch(e.target.value)}
                />
                </div>
            </div>
        </Header>
    )
}
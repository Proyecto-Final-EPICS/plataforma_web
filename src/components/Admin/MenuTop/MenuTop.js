
import { Button, Layout, Input } from 'antd';

import './MenuTop.scss';

import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'; 

export default function MenuTop(props) {
    const {rowSel, setRowSel, setSearch, collectionSelected} = props;

    const someRowSel = () => rowSel !== -1;

    return (
        <div className='admin-top-menu'>
            <div className='admin-top-menu__section'>
            <h1 className='admin-top-menu__section'>Interfaz de Administrador</h1>
            </div>
            
            <div className='admin-top-menu__section admin-top-menu__options'>
                <div className='admin-top-menu__options__reg'>
                    <Button icon={<PlusCircleOutlined/>} disabled={!collectionSelected}/>
                    <Button icon={<EditOutlined/>} disabled={!collectionSelected || !someRowSel()}/>
                    <Button icon={<DeleteOutlined/>} disabled={!collectionSelected || !someRowSel()}/>
                </div>
                <div className='admin-top-menu__options__search'>
                <Input
                    className='admin-top-menu__options__search__input'
                    placeholder="Buscar"
                    prefix={<SearchOutlined/>}
                    onPressEnter={e => setSearch(e.target.value)}
                />
                </div>
            </div>
        </div>
    )
}
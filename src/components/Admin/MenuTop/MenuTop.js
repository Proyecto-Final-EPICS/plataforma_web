import { useContext }  from 'react';
import { Button, Input } from 'antd';

import AdminContext from '../AdminContext';

import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'; 

import './MenuTop.scss';

export default function MenuTop(props) {
    const {collectionSelected} = props;
    const { rowSel, setSearch, setAddRow, setEditRow, setDeleteRow } = useContext(AdminContext);

    const someRowSel = () => rowSel !== null;

    return (
        <div className='admin-top-menu'>
            <div className='admin-top-menu__section'>
            <h1 className='admin-top-menu__section'>Interfaz de Administrador</h1>
            </div>
            
            <div className='admin-top-menu__section admin-top-menu__options'>
                <div className='admin-top-menu__options__reg'>
                    <Button 
                        icon={<PlusCircleOutlined/>}
                        disabled={!collectionSelected}
                        onClick={() => setAddRow(true)}
                    />
                    <Button 
                        icon={<EditOutlined/>}
                        disabled={!collectionSelected || !someRowSel()}
                        onClick={() => setEditRow(true)}
                    />
                    <Button 
                        icon={<DeleteOutlined/>}
                        disabled={!collectionSelected || !someRowSel()}
                        onClick={() => setDeleteRow(true)}
                    />
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
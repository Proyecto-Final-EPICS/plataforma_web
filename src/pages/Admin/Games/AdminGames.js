import { useState, useEffect, useContext } from 'react';
import TableGames from '../../../components/Admin/Tables/TableGames';
import GameForm from '../../../components/Admin/Forms/GameForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delGame, getGamesFromSchool } from '../../../api/game';

import './AdminGames.scss';

export default function AdminGames(props) {
    const [games, setGames] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <GameForm
                    setGames={setGames} 
                    setModalVisible={setModalVisible}
                    school={school}
                />
            )
            setModalTitle('Registrar Juego');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            setModalContent(
                <GameForm
                    setGames={setGames} 
                    setModalVisible={setModalVisible}
                    school={school}
                    edit
                    toEdit={games.find(g => g.code === rowSel.code)}
                    setRowSel={setRowSel}
                />
            );
            setModalTitle('Actualizar Juego');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            delGame(school, rowSel.code).then(() => (
                getGamesFromSchool(school).then(json => {
                    setGames(json);
                    setRowSel(null);
                })
            ));
            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getGamesFromSchool(school).then(json => setGames(json))
    ), []);

    return (
        <div className='admin-games'>
            <TableGames games={games}/>
        </div>
    )
}

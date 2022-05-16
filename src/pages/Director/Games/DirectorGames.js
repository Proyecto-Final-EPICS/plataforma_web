//Liberias
import { useState, useEffect } from 'react';

//Componentes
import TableGames from '../../../components/Director/TableGames';

//API
import gameApi from '../../../mock_data/collections/game.json';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './DirectorGames.scss'

export default function DirectorGames() {
    const [games, setGames] = useState([]);
    const { school } = useAuth();

    useEffect(() => {
        setGames(gameApi.filter(g => g.school == school));
    }, []);
    
    return (
        <div className='director-games'>
            <div className='director-games__title'>Juegos</div>
            <TableGames games={games} />
        </div>
    );
}

//Liberias
import { useState, useEffect } from 'react';

//Componentes
import TableGames from '../../../components/Director/TableGames';

//API
import { getGamesFromSchool } from '../../../api/game';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './DirectorGames.scss'

export default function DirectorGames() {
    const [games, setGames] = useState([]);
    const { id_school } = useAuth();

    useEffect(() => {
        getGamesFromSchool(id_school).then(json => setGames(json));
    }, []);
    
    return (
        <div className='director-games'>
            <div className='director-games__title'>Juegos</div>
            <TableGames games={games} />
        </div>
    );
}

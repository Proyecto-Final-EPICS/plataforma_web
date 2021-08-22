//Liberias
import React,{useState,useEffect} from 'react';
import {Select,Button} from 'antd';
import {Link} from 'react-router-dom';

//Api
import {getLevelsPlayed} from '../../../api/sessions';

export default function SelectLevel(props){
    const {colegio,estudiante,username,game} = props;
    const [levels,setLevels] = useState([]);
    const [option,setOption] = useState("1");
    const {Option} = Select;


    useEffect(()=>{
        let isMounted = true;
        getLevelsPlayed(username,game).then(response =>{
           const aux = [];
           response.forEach(res =>{
               aux.push(res[0].level);
           });
           const aux2 = new Set(aux);
           let result = [...aux2];
           setLevels(result);
        })
        return () =>{isMounted = false};
    },[])


 


    const handleChange = (value) =>{
        setOption(value);
    }

    const renderOptions = levels.map((l )=> {
        return (<Option key={l}> Nivel {l}</Option>)
    });

    return(
        <div>
            <Select style={{ width: 120}} onSelect={handleChange} defaultValue="1">
             {renderOptions}
            </Select>

            <Link to={`/home/colegios/${colegio}/estudiantes/${estudiante}-${username}/${game}/nivel-${option}`}>
                <Button type="primary">
                    Ir
                </Button>
            </Link>
        </div>
        
    );
}
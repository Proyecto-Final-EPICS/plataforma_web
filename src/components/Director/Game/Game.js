import { Row, Col } from "antd";

import './Game.scss';

export default function Game(props) {
    const { game: { logo, name, devs, code, topics, level, skills, modules, description } } = props;

    return (
        <div className='game'>
            <Row gutter={32}>
                <Col span={14}>
                    <div className='game__summ'>
                        <div className='game__summ__logo'>
                            <img
                                src={logo}
                                alt={`Logo de ${name}`}
                                width={300}
                            />
                        </div>
                        <div className='game__summ__info'>
                            <div className='game__h1'>{name}</div>

                            <div className='game__summ__info__devs'>
                                <div className='game__h2'>
                                    <b>Por: </b>
                                    {devs.map(d => (
                                        d.type == 'student' ? `${d.firstname} ${d.lastname}`: d.name
                                    )).join(', ')}
                                </div>
                            </div>
                            <div className='game__summ__info__det'>
                                <div className='game__h2'>
                                    <b>Código: </b>{code}
                                </div>
                                <div className='game__h2'>
                                    <b>Tópicos: </b>{topics.join(', ')}
                                </div>
                                <div className='game__h2'>
                                    <b>Nivel: </b>{level}
                                </div>
                                <div className='game__h2'>
                                    <b>Skills: </b>{skills.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div classame='game__mod'>
                        <GameModules modules={modules} />
                    </div>
                </Col>
            </Row>
            <div className='game__desc'>
                <div>
                    <h1 className='game__desc__title'>Descripción</h1>
                    <p className='game__desc__text'>{description}</p>
                </div>
            </div>
        </div>
    );
}

function GameModules(props) {
    const { modules } = props;
  
    return (
      <div className='game-modules'>
        <div className='game-modules__title'>Módulos</div>
        <ul className='game-modules__content'>
            {modules.map(({code, name, img}) => (
              <li key={code}>
                <img 
                  src={img} 
                  alt={`Logo de módulo ${name}`}
                  width={100}
                />
                {name}
              </li>
            ))}
        </ul>
      </div>
    )
  }

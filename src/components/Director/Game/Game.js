import { Row, Col } from "antd";

import { parseName } from '../../../libraries/General/utils';

import './Game.scss';

export default function Game(props) {
    const { game: { logo, name, devs, code, topic, level, modules, description } } = props;

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
                                    {devs.map(({ firstname, lastname }) => (
                                        parseName(firstname, lastname)
                                    )).join(', ')}
                                </div>
                            </div>
                            <div className='game__summ__info__det'>
                                <div className='game__h2'>
                                    <b>Código: </b>{code}
                                </div>
                                <div className='game__h2'>
                                    <b>Tópico: </b>{topic}
                                </div>
                                <div className='game__h2'>
                                    <b>Nivel: </b>{level}
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
            {modules.map(({ name }, i) => (
              <li key={i}>
                <img 
                  src={'https://cdn.pixabay.com/photo/2017/01/13/01/22/rocket-1976107_960_720.png'} 
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

import {Layout} from 'antd'
import ListStudents from '../Students/ListStudents';

const {Header, Content} = Layout;

export default function Registers(props) {
    return(
        <Layout className="contenido">
            <Header className="contenido__header">
                
                <div className="contenido__header__col">
                    <h1>Campo1</h1>
                </div>

                <div className="contenido__header__col">
                    <h1>Campo2</h1>
                </div>     

                <div className="contenido__header__col">
                    <h1>Campo3</h1>
                </div>  

                <div className="contenido__header__col">
                    <h1>Campo4</h1>
                </div>

                <div className="contenido__header__col">
                    <h1>Campo5</h1>
                </div>

                <div className="contenido__header__col">
                    <h1>Campo6</h1>
                </div>
            </Header>
            <Content className="contenido__content"> 
                <ListStudents students={[]}/>
            </Content>

        </Layout>
    );
}
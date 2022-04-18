import { Modal as ModalAntd } from 'antd';

export default function Modal(props) {
    const { children, title, isVisible, setIsVisible } = props;

    return (
        <ModalAntd
            title={title}
            centered
            visible={isVisible}
            onCancel={()=> {
                console.log('cancel');
                setIsVisible(false);
            }}
            footer={false}
        >
            {children}
        </ModalAntd>
    );
}

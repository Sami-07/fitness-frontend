import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
const MyModal = ({ isOpen, onClose, content }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius : "10px",
            // padding : "20px"
        },
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <div>{content}</div>
            <button onClick={onClose} className='absolute top-1 right-1'><IoClose className='text-2xl' /></button>
        </Modal>
    );
};
export default MyModal;
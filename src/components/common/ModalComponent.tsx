import Modal from 'react-modal';

Modal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentLabel: string;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  contentLabel,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel={contentLabel}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '480px',
    height: 'max-content',
    maxHeight: '90%',
    padding: 0,
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    zIndex: 1000,
  },
};

import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashLoader } from 'react-spinners';
import CustomMessageBox from '~/components/CustomMessageBox';
function CustomLayout({ children }) {
  const isLoading = useSelector((state) => state.globalApp.loading);
  const messageBox = useSelector((state) => state.globalApp.messageBox);

  return (
    <div>
      {messageBox.isShow && (
        <CustomMessageBox
          title={messageBox.title}
          content={messageBox.content}
          contentOK={messageBox.contentOK}
          contentCancel={messageBox.contentCancel}
        />
      )}
      <HashLoader
        color={'#5dd5ab'}
        loading={isLoading}
        size={100}
        speedMultiplier={1}
        cssOverride={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          backgroundColor: 'rgba(0,0,0,0.05)',
          zIndex: '999999',
        }}
      />
      {children}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={true} theme={'light'} draggable={false} />
    </div>
  );
}

export default CustomLayout;

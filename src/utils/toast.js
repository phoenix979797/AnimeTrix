import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const showErrorToast = (errorMessage) => {
    toast(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
  };
  
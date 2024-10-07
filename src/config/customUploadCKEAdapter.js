import axios from 'axios';
import baseURL from '~/utils/baseURL';
export default class CustomUploadCKEAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // upload image server
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            let result = reader.result;
            axios
              .patch(`${baseURL}/campaign/CKEUpload`, { file: result })
              .then((res) => {
                resolve({
                  default: res.data.url,
                });
              })
              .catch((err) => {
                reject(err);
              });
          };
        }),
    );
  };
}

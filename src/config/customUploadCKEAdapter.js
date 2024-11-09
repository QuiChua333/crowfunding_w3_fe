import baseURL from '~/utils/baseURL';
import CustomAxios from './axios-interceptors';
export default class CustomUploadCKEAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // upload image server
          const formData = new FormData();
          formData.append('file', file);
          CustomAxios.post(`${baseURL}/campaign/CKEUpload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((res) => {
              resolve({
                default: res.data.url,
              });
            })
            .catch((err) => {
              reject(err);
            });
        }),
    );
  };
}

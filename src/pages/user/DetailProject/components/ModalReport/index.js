import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalReport.module.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import baseURL from '~/utils/baseURL';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMessageBox } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';

const cx = classNames.bind(styles);

function ModalReport({ setIsOpenModalReport }) {
  const dispatch = useDispatch();
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const [topic, setTopic] = useState('');
  const [textContent, setTextContent] = useState('');
  const [images, setImages] = useState([]);
  const [textValidate, setTextValidate] = useState('');
  const [showTextValidate, setShowTextValidate] = useState(false);
  const fileInputRef = useRef(null);
  const idCampaign = useParams();
  function selectFiles() {
    fileInputRef.current.click();
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }
  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
              imageBase64: reader.result,
            },
          ]);
        };
      }
    }
  }
  const handleOnChangeTopic = (e) => {
    setTopic(e.target.value);
  };
  const handleClose = () => {
    setIsOpenModalReport(false);
  };
  const handleSendReport = async () => {
    if (topic.trim().length === 0 || (textContent.trim().length === 0 && images.length === 0)) {
      setTextValidate('Vui lòng nhập đầy đủ thông tin để báo cáo vi phạm !');
      setShowTextValidate(true);
    } else {
      setTextValidate('');
      setShowTextValidate(false);
      // Xử lý ở đây
      dispatch(setLoading(true));
      try {
        const newListImage = images.map((itemp) => {
          return itemp.imageBase64;
        });
        const data = {
          title: topic.toUpperCase(),
          content: textContent,
          images: [...newListImage],
        };
        const url = `${baseURL}/report/reportCampaign/${idCampaign.id}`;
        const res = await CustomAxios.post(url, data);
        console.log(res);
        if (res.data.data) {
          dispatch(setLoading(false));
          setIsOpenModalReport(false);
          dispatch(
            setMessageBox({
              title: 'Thông báo',
              content:
                'Báo cáo của bạn đã được gửi đến chung tôi, chúng tôi sẽ phản hồi báo cáo của bạn sớm nhất thông qua email!',
              contentOK: 'OK',
              isShow: true,
              type: `report${idCampaign.id}`,
            }),
          );
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === `report${idCampaign.id}`) {
        if (messageBox.result === true) {
          dispatch(setMessageBox({ result: null, isShow: false }));
        }
      }
    }
  }, [messageBox.result]);

  return (
    <div className={cx('wrapper')} onClick={handleClose}>
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('header')}>
          <span className={cx('title-modal')}>Báo cáo vi phạm chiến dịch này</span>
          <span className={cx('close')} onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className={cx('separate')}></div>
        <div className={cx('body-modal')}>
          <div className={cx('container-topic')}>
            <span>
              Tiêu đề <span style={{ color: 'red' }}>*</span>
            </span>
            <input className={cx('input-topic')} onChange={handleOnChangeTopic} type="text" />
          </div>
          <span style={{ fontStyle: 'italic' }}>
            Nội dung <span style={{ color: 'red' }}>*</span>
          </span>
          <div className={cx('content-body')}>
            <div className={cx('content-report')}>
              {images.map((item, index) => {
                return (
                  <div className={cx('list-images')} key={index}>
                    <img src={item.url} alt={item.name} />
                    <AiFillCloseCircle className={cx('delete-img')} onClick={() => deleteImage(index)} />
                  </div>
                );
              })}
              <TextareaAutosize
                className={cx('input-text')}
                placeholder="Nhập nội dung..."
                onChange={(e) => setTextContent(e.target.value)}
                value={textContent}
              />
            </div>

            <div className={cx('container-button-img')}>
              <div className={cx('button-img')} onClick={selectFiles}>
                <RiImageAddFill className={cx('choose-images')} />
              </div>
              <input type="file" name="file" multiple hidden ref={fileInputRef} onChange={onFileSelect} />
              <span onClick={selectFiles}>Thêm ảnh</span>
            </div>
          </div>
          {showTextValidate && <span className={cx('text-validate')}>{textValidate}</span>}
        </div>
        <div className={cx('button-send')} onClick={handleSendReport}>
          BÁO CÁO VI PHẠM CHIẾN DỊCH NÀY
        </div>
      </div>
    </div>
  );
}

export default ModalReport;

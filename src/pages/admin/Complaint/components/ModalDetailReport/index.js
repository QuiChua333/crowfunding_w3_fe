import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalDetailReport.module.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { BsFillSendFill } from 'react-icons/bs';
import baseURL from '~/utils/baseURL';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import { CustomAxios } from '~/config';
import { convertDateFromString } from '~/utils';

const cx = classNames.bind(styles);

function ModalDetailReport({ getAllReports, setIsOpenModalSeeDetail, report }) {
  const dispatch = useDispatch();
  const [textValidate, setTextValidate] = useState('');
  const [showTextValidate, setShowTextValidate] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
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

  const handleCloseModal = () => {
    setIsOpenModalSeeDetail(false);
  };
  const handleSend = async () => {
    if (textContent.trim().length === 0 && images.length === 0) {
      setTextValidate('Vui lòng nhập đầy thông tin để phản hồi.');
      setShowTextValidate(true);
    } else {
      setTextValidate('');
      setShowTextValidate(false);
      // Xử lý send
      dispatch(setLoading(true));
      try {
        const newListImage = images.map((itemp) => {
          return itemp.imageBase64;
        });

        const data = {
          id: report._id,
          content: textContent,
          images: newListImage,
          emailUser: report.userInfo.email,
          title: report.title,
        };

        const url = `${baseURL}/report/responseReport/${report._id}`;
        const res = await CustomAxios.patch(url, data);
        getAllReports();
        if (res.data) {
          dispatch(setLoading(false));
          setIsOpenModalSeeDetail(false);
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error.message);
      }
    }
  };

  return (
    <div className={cx('wrapper')} onClick={handleCloseModal}>
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('header')}>
          <div className={cx('info-user')}>
            <img src={report.userInfo.avatar.url} alt="img" />
            <div className={cx('info-detail')}>
              <a href={`/individuals/${report.userInfo._id}/profile`} className={cx('name')}>
                {report.userInfo.fullName}
              </a>
              <a href={`mailto:${report.userInfo.email}`} className={cx('email')}>
                {report.userInfo.email}
              </a>
            </div>
          </div>
          <span className={cx('close')} onClick={handleCloseModal}>
            &times;
          </span>
        </div>

        <div className={cx('container-body')}>
          <div className={cx('container-report')}>
            <div>
              <span className={cx('topic')}>{report.title}</span>
            </div>
            <div className={cx('separate-topic')}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontStyle: 'italic', fontSize: '13px' }}>** Nội dung báo cáo vi phạm</span>
              <a href={`/project/${report.campaignInfo._id}/detail`} className={cx('btn-goto-campaign')}>
                Đi đến chiến dịch này
              </a>
            </div>
            <div className={cx('content-report')}>
              <div className={cx('list-image-report')}>
                {report.images.map((item) => {
                  return <img src={item} alt="img" />;
                })}
              </div>
              <div className={cx('text-report')}>{report.content}</div>
              <span className={cx('date-report')}>{convertDateFromString(report.date)}</span>
            </div>
          </div>

          {report.isResponsed && (
            <div className={cx('container-response')}>
              <span style={{ fontStyle: 'italic', fontSize: '13px', textAlign: 'right', width: '100%' }}>
                ** Nội dung phản hồi
              </span>
              <div className={cx('content-response')}>
                <div className={cx('list-image-response')}>
                  {report.responsed.images.map((item) => {
                    return <img src={item} alt="img" />;
                  })}
                </div>
                <div className={cx('text-response')}>{report.responsed.content}</div>
                <span className={cx('date-response')}>{convertDateFromString(report.responsed.date)}</span>
              </div>
            </div>
          )}
        </div>
        {showTextValidate && <span className={cx('text-validate')}>{textValidate}</span>}

        {report.isResponsed === false && (
          <div style={{ marginBottom: '40px' }}>
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

              <div className={cx('button-img')} onClick={selectFiles}>
                <RiImageAddFill className={cx('choose-images')} />
              </div>
              <input type="file" name="file" multiple hidden ref={fileInputRef} onChange={onFileSelect} />
              <div className={cx('button-img')} onClick={handleSend}>
                <BsFillSendFill size={24} />
              </div>
            </div>
          </div>
        )}

        {report.isResponsed && <div className={cx('btn-res')}>ĐÃ PHẢN HỒI</div>}
      </div>
    </div>
  );
}

export default ModalDetailReport;

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
import { convertDateFromString } from '~/utils';
import { useReplyComplaintMutation } from '~/hooks/api/mutations/admin/admin.complaint.mutation';
import { defaultAvt } from '~/assets/images';

const cx = classNames.bind(styles);

function ModalDetailReport({ getAllReports, setIsOpenModalSeeDetail, report }) {
  const dispatch = useDispatch();
  const [textValidate, setTextValidate] = useState('');
  const [showTextValidate, setShowTextValidate] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleCloseModal = () => {
    setIsOpenModalSeeDetail(false);
  };

  return (
    <div className={cx('wrapper')} onClick={handleCloseModal}>
      <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('header')}>
          <div className={cx('info-user')}>
            <img src={report.reportBy?.avatar || defaultAvt} alt="img" />
            <div className={cx('info-detail')}>
              <a href={`/individuals/${report.reportBy?.id}/profile`} className={cx('name')}>
                {report.reportBy?.fullName}
              </a>
              <a href={`mailto:${report.reportBy?.email}`} className={cx('email')}>
                {report.reportBy?.email}
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
              <a href={`/project/${report.campaign.id}/detail`} className={cx('btn-goto-campaign')}>
                Đi đến chiến dịch này
              </a>
            </div>
            <div className={cx('content-report')}>
              <div className={cx('list-image-report')}>
                {report.images?.split('|')?.map((item) => {
                  return <img src={item} alt="img" />;
                })}
              </div>
              <div className={cx('text-report')}>{report.content}</div>
              <span className={cx('date-report')}>{convertDateFromString(report.date)}</span>
            </div>
          </div>

          {report.reportResponse && (
            <div className={cx('container-response')}>
              <span style={{ fontStyle: 'italic', fontSize: '13px', textAlign: 'right', width: '100%' }}>
                ** Nội dung phản hồi
              </span>
              <div className={cx('content-response')}>
                {report.reportResponse && report.reportResponse?.images?.length > 0 && (
                  <div className={cx('list-image-response')}>
                    {report.reportResponse?.images?.split('|')?.map((item) => {
                      return <img src={item} alt="img" />;
                    })}
                  </div>
                )}
                <div className={cx('text-response')}>{report.reportResponse.content}</div>
                <span className={cx('date-response')}>{convertDateFromString(report.reportResponse.date)}</span>
              </div>
            </div>
          )}
        </div>
        {showTextValidate && <span className={cx('text-validate')}>{textValidate}</span>}

        {report.reportResponse && <div className={cx('btn-res')}>ĐÃ PHẢN HỒI</div>}
      </div>
    </div>
  );
}

export default ModalDetailReport;

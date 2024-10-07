import classNames from 'classnames/bind';
import { IoCloseSharp } from 'react-icons/io5';

import { useEffect, useState } from 'react';
import styles from '../../../CampaignStyle.module.scss';

const cx = classNames.bind(styles);

function FAQ({ isShowClose, index, removeFAQ, handleChangeFAQ, item, isClicked, setIsClicked, setFlagFaqs }) {
  const handleChange = (e, type) => {
    const newItem = {
      ...item,
      [type]: e.target.value,
    };
    handleChangeFAQ(newItem, index);
  };
  const handleClickClose = () => {
    removeFAQ(index);
  };
  const [textValidateQuestion, setTextValidateQuestion] = useState('');
  const validateQuestion = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateQuestion('* Vui lòng nhập nội dung câu hỏi');
      return false;
    } else {
      setTextValidateQuestion('');
      return true;
    }
  };
  const [textValidateAnswer, setTextValidateAnswer] = useState('');
  const validateAnswer = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateAnswer('* Vui lòng nhập câu trả lời cho câu hỏi');
      return false;
    } else {
      setTextValidateAnswer('');
      return true;
    }
  };

  useEffect(() => {
    if (isClicked) {
      let flagQuestion = validateQuestion(item.question);
      let flagAnswer = validateAnswer(item.answer);
      setIsClicked(false);
      setFlagFaqs(flagQuestion && flagAnswer);
    }
  }, [isClicked]);

  return (
    <div className={cx('wrapper')}>
      <div style={{ flex: 1 }}>
        <div className={cx('row')}>
          <div className={cx('title')}>Câu hỏi</div>
          <input
            onChange={(e) => handleChange(e, 'question')}
            value={item.question}
            type="text"
            className={cx('itext-field')}
          />
          <span className={cx('entreField-validationLabel')}>{textValidateQuestion}</span>
        </div>

        <div className={cx('row')}>
          <div className={cx('title')}>Trả lời</div>
          <textarea
            onChange={(e) => handleChange(e, 'answer')}
            value={item.answer}
            className={cx('itext-field')}
            style={{ minHeight: '60px', paddingTop: '10px' }}
          ></textarea>
          <span className={cx('entreField-validationLabel')}>{textValidateAnswer}</span>
        </div>
      </div>
      {isShowClose && (
        <div onClick={handleClickClose} style={{ cursor: 'pointer', marginTop: '40px' }}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30px',
              height: '30px',
              background: '#eee5f2',
              color: '#7a69b3',
              borderRadius: '50%',
              marginLeft: '12px',
            }}
          >
            <IoCloseSharp />
          </span>
        </div>
      )}
    </div>
  );
}

export default FAQ;

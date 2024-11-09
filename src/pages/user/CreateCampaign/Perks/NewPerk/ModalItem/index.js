import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from '../NewPerk.module.scss';

const cx = classNames.bind(styles);

function ModalItem({ setShowModal, addNewItem, optionEdit, updateItem }) {
  const [itemName, setItemName] = useState('');
  const [chooseOption, setChooseOption] = useState(false);
  const [listOption, setListOption] = useState([]);
  const [showBtnAddOption, setShowBtnAddOption] = useState(true);
  const noCheckOptionElement = useRef(null);
  const handleClickOption = () => {
    setChooseOption(true);
    setListOption([{ name: '', values: [] }]);
  };

  const handleClickNoOption = () => {
    setChooseOption(false);
    setListOption([]);
  };
  const handleClickAddOption = () => {
    setListOption((prev) => [...prev, { name: '', values: [] }]);
  };

  const handleClickClose = (index) => {
    setListOption((prev) => {
      const nextState = [...prev];
      nextState.splice(index, 1);
      return nextState;
    });
  };

  const handleClickRemoveMiniValue = (indexA, indexB) => {
    setListOption((prev) => {
      const nextState = prev.map((item, index) => {
        if (index === indexA) {
          // item.value.splice(indexB,1);
          return {
            ...item,
            values: item.values.filter((item, index2) => {
              return index2 !== indexB;
            }),
          };
        } else return item;
      });
      return nextState;
    });
  };

  const handleKeyUpInputTag = (e, indexChange) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        const newValue = e.target.value;
        setListOption((prev) => {
          const nextState = prev.map((item, index) => {
            if (index === indexChange) {
              return { ...item, values: [...item.values, newValue] };
            } else return item;
          });
          e.target.value = '';
          return nextState;
        });
      }
    }
  };

  const handleChangeInputTagName = (e, indexChange) => {
    const name = e.target.value;
    setListOption((prev) => {
      const nextState = prev.map((item, index) => {
        if (index === indexChange) {
          return { ...item, name: name };
        } else return item;
      });
      return nextState;
    });
  };

  const handleClickSaveItem = () => {
    const newItem = { name: itemName, options: listOption, isHasOption: chooseOption };
    if (optionEdit.type === 'add') {
      addNewItem(newItem);
    } else if (optionEdit.type === 'update') {
      updateItem(newItem, optionEdit.index);
    }
  };
  useEffect(() => {
    noCheckOptionElement.current.checked = true;
  }, []);
  useEffect(() => {
    if (listOption?.length === 3) {
      setShowBtnAddOption(false);
    } else if (listOption?.length < 3) {
      setShowBtnAddOption(true);
    }
  }, [listOption]);
  return (
    <div className={cx('modal-wrapper')}>
      <div className={cx('modal-container')}>
        <div className={cx('modal-content')}>
          <div className={cx('modalContent-body')}>
            <label className={cx('entreField-label')} style={{ fontSize: '24px', marginBottom: '0px' }}>
              Vật phẩm
            </label>

            <div className={cx('entreField')}>
              <label className={cx('entreField-label')}>
                Tên vật phẩm<span className={cx('entreField-required')}>*</span>
              </label>
              <div className={cx('entreField-subLabel')}>Sử dụng tên ngắn gọn và rõ ràng cho vật phẩm.</div>
              <input
                onChange={(e) => setItemName(e.target.value)}
                type="text"
                className={cx('itext-field')}
                value={itemName}
              />
              <div className={cx('entreField-validationLabel')}>30</div>
            </div>

            <div className={cx('entreField')} style={{ marginTop: '60px' }}>
              <label className={cx('entreField-label')}>Tùy chọn</label>
              <div className={cx('entreField-subLabel')}>
                Bạn có các tùy chọn mà người ủng hộ có thể chọn cho vật phẩm này không. Ví dụ: màu sắc, kích thước, ...?
              </div>
              <div style={{ marginTop: '32px' }}>
                <label className={cx('inputRadioGroup-radio')}>
                  <input
                    onClick={handleClickNoOption}
                    type="radio"
                    value={'VSBL'}
                    name="itemOptions"
                    ref={noCheckOptionElement}
                  />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Không, tôi không cung cấp các lựa chọn cho mặt hàng này.</span>
                  </span>
                </label>

                <label onClick={handleClickOption} className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'INVS'} name="itemOptions" />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Có, tôi đang cung cấp các lựa chọn cho mặt hàng này.</span>
                  </span>
                </label>
              </div>
            </div>
            {chooseOption && (
              <>
                <div className={cx('entreField')}>
                  <div className={cx('inputDoubleField-headers')} style={{ display: 'flex' }}>
                    <div style={{ padding: '6px' }} class="col-4">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Tên tùy chọn
                      </label>
                    </div>
                    <div style={{ padding: '6px' }} class="col-8">
                      <label className={cx('entreField-label')} style={{ marginBottom: '0px' }}>
                        Giá trị tùy chọn
                      </label>
                    </div>
                  </div>
                  {listOption.map((itemA, indexA) => {
                    return (
                      <div key={indexA} style={{ display: 'flex', marginTop: '8px' }}>
                        <div class="col-4" style={{ padding: '6px' }}>
                          <input
                            onChange={(e) => handleChangeInputTagName(e, indexA)}
                            type="text"
                            className={cx('itext-field')}
                            placeholder="Size"
                          />
                        </div>
                        <div class="col-7" style={{ padding: '6px' }}>
                          <div className={cx('inputTags')}>
                            {listOption[indexA].values.map((itemB, indexB) => {
                              return (
                                <span key={indexB} className={cx('inputTags-tag')}>
                                  {itemB}
                                  <span
                                    onClick={() => handleClickRemoveMiniValue(indexA, indexB)}
                                    style={{
                                      color: '#7a69b3',
                                      marginLeft: '8px',
                                      cursor: 'pointer',
                                      fontSize: '16px',
                                      marginTop: '-2px',
                                    }}
                                  >
                                    <IoCloseSharp />
                                  </span>
                                </span>
                              );
                            })}

                            <input
                              onKeyUp={(e) => handleKeyUpInputTag(e, indexA)}
                              onFocus={(e) => (e.target.parentElement.style.border = '1px solid #000')}
                              onBlur={(e) => (e.target.parentElement.style.border = '1px solid #ddd')}
                              placeholder={itemA.values.length === 0 && 'Small, Medium, Large'}
                              maxlength="30"
                              className={cx('input-value-option')}
                            />
                          </div>
                        </div>
                        {listOption?.length > 1 && (
                          <div class="col">
                            <div
                              onClick={() => handleClickClose(indexA)}
                              style={{ cursor: 'pointer', marginTop: '12px' }}
                            >
                              <span
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: '#eee5f2',
                                  color: '#7a69b3',
                                  borderRadius: '50%',
                                  marginLeft: '12px',
                                }}
                              >
                                <IoCloseSharp />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {showBtnAddOption && (
                  <div
                    onClick={handleClickAddOption}
                    style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <span
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#eee5f2',
                        color: '#7a69b3',
                        borderRadius: '50%',
                        marginRight: '12px',
                        fontSize: '16px',
                      }}
                    >
                      <AiOutlinePlus />
                    </span>
                    <span style={{ color: '#7a69b3', fontWeight: '600' }}>THÊM TÙY CHỌN</span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={cx('modalContent-footer')}>
            <div className={cx('controlBar-controls')}>
              <span onClick={() => setShowModal(false)} className={cx('btn', 'btn-cancel')}>
                HỦY
              </span>
              <span onClick={handleClickSaveItem} className={cx('btn', 'btn-ok')}>
                LƯU VẬT PHẨM
              </span>
              {/* <a href="#" className={cx('btn','btn-ok')}>SAVE ITEM</a> */}
            </div>
          </div>

          <div className={cx('button-close')} onClick={() => setShowModal(false)}>
            <GrFormClose className={cx('icon-close')} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalItem;

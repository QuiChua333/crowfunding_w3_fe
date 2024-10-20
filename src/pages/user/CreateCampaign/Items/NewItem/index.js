import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { TiCancel } from 'react-icons/ti';

import styles from './NewItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageBox } from '~/redux/slides/GlobalApp';
import {
  useAddItemMutation,
  useDeleteItemMutation,
  useEditItemMutation,
} from '~/hooks/api/mutations/user/item.mutation';
import { useGetItemContainPerks } from '~/hooks/api/queries/user/item.query';
import { setContentError } from '~/redux/slides/UserCampaign';

const cx = classNames.bind(styles);

function NewItem() {
  const { id, idItem } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemState, setItemState] = useState({});
  const [item, setItem] = useState({});
  const [chooseOption, setChooseOption] = useState(null);
  const [listOption, setListOption] = useState(null);
  const [showBtnAddOption, setShowBtnAddOption] = useState(true);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const messageBox = useSelector((state) => state.globalApp.messageBox);
  const contentError = useSelector((state) => state.userCampaign.contentError);
  const handleClickOption = () => {
    setChooseOption(true);
    if (idItem === 'new') {
      setItemState((prev) => ({ ...prev, options: [{ name: '', values: [] }], isHasOption: true }));
    } else {
      if (!item.isHasOption) {
        setItemState((prev) => ({ ...prev, options: [{ name: '', values: [] }], isHasOption: true }));
      }
    }
  };

  const handleClickNoOption = () => {
    setChooseOption(false);
    if (idItem === 'new') {
      setItemState((prev) => ({ ...prev, options: [], isHasOption: false }));
    } else {
      setItemState((prev) => ({ ...prev, options: [...item.options], isHasOption: false }));
    }
  };
  const handleClickAddOption = () => {
    setItemState((prev) => ({ ...prev, options: [...prev.options, { name: '', values: [] }] }));
  };

  const handleClickClose = (index) => {
    setItemState((prev) => ({ ...prev, options: [...prev.options].filter((item, index2) => index2 !== index) }));
  };

  const handleClickRemoveMiniValue = (indexA, indexB) => {
    setItemState((prev) => {
      return {
        ...prev,
        options: [...prev.options].map((item, index) => {
          if (index === indexA) {
            return {
              ...item,
              values: item.values.filter((item, index2) => {
                return index2 !== indexB;
              }),
            };
          } else return item;
        }),
      };
    });
  };

  const handleKeyUpInputTag = (e, indexChange) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        const newValue = e.target.value;
        setItemState((prev) => {
          e.target.value = '';
          return {
            ...prev,
            options: [...prev.options].map((item, index) => {
              if (index === indexChange) {
                return { ...item, values: [...item.values, newValue] };
              } else return item;
            }),
          };
        });
      }
    }
  };

  const handleChangeInputTagName = (e, indexChange) => {
    const name = e.target.value;
    setItemState((prev) => {
      return {
        ...prev,
        options: [...prev.options].map((item, index) => {
          if (index === indexChange) {
            return { ...item, name: name };
          } else return item;
        }),
      };
    });
  };
  const addItemMutation = useAddItemMutation();
  const editItemMutation = useEditItemMutation();
  const handleClickSaveItem = async () => {
    if (idItem === 'new') {
      addItemMutation.mutate(
        { ...itemState, campaign: id },
        {
          onSuccess() {
            navigate(`/campaigns/${id}/edit/items/table`);
          },
          onError(error) {
            console.log(error);
          },
        },
      );
    } else {
      editItemMutation.mutate(
        {
          id: itemState.id,
          item: { ...itemState },
        },
        {
          onSuccess() {
            navigate(`/campaigns/${id}/edit/items/table`);
          },
          onError(error) {
            console.log(error);
          },
        },
      );
    }
  };
  const handleClickDeleteItem = () => {
    dispatch(
      setMessageBox({
        title: 'Xóa vật phẩm?',
        content: 'Thao tác này sẽ xóa hoàn toàn mục này khỏi chiến dịch của bạn và không thể hoàn tác được.',
        contentOK: 'XÁC NHẬN',
        contentCancel: 'HỦY',
        isShow: true,
        type: 'deleteItem',
      }),
    );
  };

  const deleteItemMutation = useDeleteItemMutation();
  const deleteItem = async () => {
    deleteItemMutation.mutate(itemState.id, {
      onSuccess() {
        navigate(`/campaigns/${id}/edit/items/table`);
      },
      onError(error) {
        console.log(error.message);
      },
    });
  };
  useEffect(() => {
    if (messageBox.result) {
      if (messageBox.type === 'deleteItem') {
        if (messageBox.result === true) {
          if (itemState.isHasAssociatedPerks) {
            dispatch(setContentError('Bạn không thể xóa vật phẩm này vì nó được bao gồm trong một đặc quyền'));
            dispatch(setShowErrorDelete(true));

            dispatch(setMessageBox({ result: null, isShow: false }));
            return;
          } else {
            deleteItem();
          }
        }
      }
    }
  }, [messageBox.result]);
  const handleChangeInputItemName = (e) => {
    setItemState((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  useEffect(() => {
    console.log(listOption);
    if (listOption?.length === 3) {
      setShowBtnAddOption(false);
    } else if (listOption?.length < 3) {
      setShowBtnAddOption(true);
    }
  }, [listOption]);
  const { data: response } = useGetItemContainPerks({ itemId: idItem, campaignId: id }, idItem !== 'new');
  useEffect(() => {
    if (response) {
      setItemState({
        id: response.data._id,
        name: response.data.name || '',
        options: response.data.options || [],
        isHasOption: response.data.isHasOption || false,
        isHasAssociatedPerks: response.data.isHasAssociatedPerks || false,
      });
      setItem({
        id: response.data._id,
        name: response.data.name || '',
        options: response.data.options || [],
        isHasOption: response.data.isHasOption || false,
        isHasAssociatedPerks: response.data.isHasAssociatedPerks || false,
      });
      setChooseOption(response.data.isHasOption);
    } else {
      setItemState({
        name: '',
        options: [],
      });
      setChooseOption(false);
    }
  }, [response]);

  return (
    <>
      <div className={cx('controlBar')}>
        <div className={cx('controlBar-container')}>
          <div className={cx('controlBar-content')}>Vật phẩm / {idItem === 'new' ? 'Tạo mới vật phẩm' : item.name}</div>
          <div className={cx('controlBar-controls')}>
            {idItem !== 'new' && (
              <a onClick={handleClickDeleteItem} className={cx('btn', 'btn-cancel')}>
                Xóa
              </a>
            )}
            <Link to={`/campaigns/${id}/edit/items/table`} className={cx('btn', 'btn-cancel')}>
              Hủy
            </Link>
            <a onClick={handleClickSaveItem} className={cx('btn', 'btn-ok')}>
              Lưu
            </a>
          </div>
        </div>
        {showErrorDelete && (
          <div className={cx('container-error')}>
            <TiCancel className={cx('icon-error')} />
            <span>{contentError}</span>
          </div>
        )}
      </div>
      <div className={cx('body')}>
        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Chi tiết vật phẩm</div>
          <div className={cx('entreField-subHeader')}>
            Bạn quyết định những mặt hàng nào bạn muốn cung cấp cho mỗi đặc quyền trong chiến dịch của mình. Bạn sẽ có
            thể theo dõi đơn hàng và quản lý việc thực hiện cho từng mặt hàng.
          </div>

          <div className={cx('entreField')}>
            <label className={cx('entreField-label')}>
              Tên vật phẩm <span className={cx('entreField-required')}>*</span>
            </label>
            <div className={cx('entreField-subLabel')}>
              Đặt tên cho mục này. Tên mặt hàng sẽ hiển thị với những người ủng hộ, vì vậy hãy đặt tên đó một cách rõ
              ràng.
            </div>
            <input
              type="text"
              className={cx('itext-field')}
              value={itemState?.name}
              onChange={handleChangeInputItemName}
            />
          </div>

          <div style={{ marginTop: '60px', borderTop: '1px solid #C8C8C8', textAlign: 'right' }}></div>
        </div>

        <div className={cx('entreSection')}>
          <div className={cx('entreField-header')}>Tùy chọn</div>
          <div className={cx('entreField-subHeader')}>
            Bạn có muốn cung cấp các tùy chọn cho mặt hàng không (tức là người ủng hộ có được chọn màu sắc, kích thước
            cụ thể, v.v.) không?
          </div>

          <div className={cx('entreField')}>
            <div style={{ marginTop: '32px' }}>
              <label className={cx('inputRadioGroup-radio')}>
                <input
                  onClick={handleClickNoOption}
                  type="radio"
                  value={'VSBL'}
                  name="itemOptions"
                  checked={!chooseOption}
                />
                <span className={cx('inputRadioGroup-radio-button')}></span>
                <span className={cx('inputRadioGroup-radio-label')}>
                  <span>Không, tôi không cung cấp các lựa chọn cho mặt hàng này.</span>
                </span>
              </label>

              <label onClick={handleClickOption} className={cx('inputRadioGroup-radio')}>
                <input type="radio" value={'INVS'} name="itemOptions" checked={chooseOption} />
                <span className={cx('inputRadioGroup-radio-button')}></span>
                <span className={cx('inputRadioGroup-radio-label')}>
                  <span>Có, tôi đang cung cấp các lựa chọn cho mặt hàng này.</span>
                </span>
              </label>
            </div>
          </div>
          {chooseOption === true && (
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
                {itemState.options?.map((itemA, indexA) => {
                  return (
                    <div key={indexA} style={{ display: 'flex', marginTop: '8px' }}>
                      <div class="col-4" style={{ padding: '6px' }}>
                        <input
                          onChange={(e) => handleChangeInputTagName(e, indexA)}
                          value={itemA.name}
                          type="text"
                          className={cx('itext-field')}
                          placeholder="Size"
                        />
                      </div>
                      <div class="col-7" style={{ padding: '6px' }}>
                        <div className={cx('inputTags')}>
                          {itemA.values.map((itemB, indexB) => {
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
                      {itemState.options?.length > 1 && (
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
      </div>
    </>
  );
}

export default NewItem;

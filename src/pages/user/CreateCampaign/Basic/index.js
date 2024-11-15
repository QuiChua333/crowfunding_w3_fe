import classNames from 'classnames/bind';
import { HiCamera } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useRef, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useState } from 'react';
import styles from './Basic.module.scss';
import MenuDropDown from './components/MenuDropDown';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch, useSelector } from 'react-redux';
import { useEditCampaignByIdMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { setEditComponent, setTab } from '~/redux/slides/UserCampaign';
import { useGetFieldGroupByCategoryQuery } from '~/hooks/api/queries/user/field.query';
import { useQueryClient } from '@tanstack/react-query';

const cx = classNames.bind(styles);
function BasicCampaign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileId, setFiledId] = useState('');
  const [file, setFile] = useState();
  const [campaginState, setCampaignState] = useState({});
  const [campagin, setCampaign] = useState({});
  const [listFieldGrouByCategory, setListFieldGrouByCategory] = useState([]);
  const inputImage = useRef();
  const [showCategory, setshowCategory] = useState(false);
  const handleClickCategorySelector = function () {
    setshowCategory(!showCategory);
  };

  const handleChangeCardImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setCampaignState((prev) => {
          return { ...prev, cardImage: res };
        });
      };
    }
  };
  const handleRemoveCardImage = () => {
    setCampaignState((prev) => {
      return { ...prev, cardImage: '' };
    });
    setFile(null);
  };

  const elementCategory = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (elementCategory.current && !elementCategory.current.contains(event.target)) {
        setshowCategory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementCategory]);
  const { data: dataField } = useGetFieldGroupByCategoryQuery(id);
  useEffect(() => {
    if (dataField) {
      setListFieldGrouByCategory(dataField);
    }
  }, [dataField]);
  const campaign = useSelector((state) => state.userCampaign.campaign);
  useEffect(() => {
    if (campaign) {
      let infoBasic = {
        id: campaign.id,
        title: campaign.title || '',
        tagline: campaign.tagline || '',
        cardImage: campaign.cardImage || '',
        location: campaign.location || '',
        field: campaign.field?.name || '',
        duration: campaign.duration || '',
      };
      setCampaignState({ ...infoBasic });
      setCampaign({ ...infoBasic });
    }
  }, [campaign]);

  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCampaignState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleChangeField = (fieldId, fieldName) => {
    setCampaignState((prev) => {
      return { ...prev, field: fieldName };
    });
    setFiledId(fieldId);
  };

  useEffect(() => {
    dispatch(
      setTab({
        number: 1,
        content: 'Cơ bản',
      }),
    );
  }, []);

  // validate
  const [textValidateTitle, setTextValidateTitle] = useState('');
  const validateTitle = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateTitle('* Vui lòng nhập tiêu đề của chiên dịch');
      return false;
    } else {
      setTextValidateTitle('');
      return true;
    }
  };
  const [textValidateTagline, setTextValidateTagline] = useState('');
  const validateTagline = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateTagline('* Vui lòng nhập thông tin mô tả giới thiệu của chiên dịch');
      return false;
    } else {
      setTextValidateTagline('');
      return true;
    }
  };
  const [textValidateCardImage, setTextValidateCardImage] = useState('');
  const validateCardImage = (value) => {
    if (value?.trim() === '') {
      setTextValidateCardImage('* Vui lòng chọn ảnh thẻ cho chiến dịch');
      return false;
    } else {
      setTextValidateCardImage('');
      return true;
    }
  };
  const [textValidateCountry, setTextValidateCountry] = useState('');
  const validateCountry = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateCountry('* Vui lòng nhập địa điểm triển khai chiến dịch');
      return false;
    } else {
      setTextValidateCountry('');
      return true;
    }
  };

  const [textValidateField, setTextValidateField] = useState('');
  const validateField = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateField('* Vui lòng chọn lĩnh vực của chiến dịch');
      return false;
    } else {
      setTextValidateField('');
      return true;
    }
  };
  const [textValidateDuration, setTextValidateDuration] = useState('');
  const validateDuration = (value) => {
    if (value?.trim().length === 0 || value?.trim() === '') {
      setTextValidateDuration('* Vui lòng nhập thời hạn của chiến dịch');
      return false;
    } else {
      if (!/^\d+$/.test(value)) {
        if (value[0] === '-' && /^\d+$/.test(value.split('-').join(''))) {
          setTextValidateDuration('* Thời hạn phải là một số nguyên lớn hơn 0');
          return false;
        } else {
          setTextValidateDuration('* Thời hạn phải là một số nguyên');
          return false;
        }
      } else {
        if (value <= 0) {
          setTextValidateDuration('* Thời hạn phải là một số nguyên lớn hơn 0');
          return false;
        } else if (Number(value) > 60) {
          setTextValidateDuration('* Thời hạn gây quỹ của một chiến dịch không vượt quá 60 ngày');
          return false;
        } else {
          setTextValidateDuration('');
          return true;
        }
      }
    }
  };
  const editCampaignByIdMutation = useEditCampaignByIdMutation();
  const queryClient = useQueryClient();
  const handleClickSaveContinue = async () => {
    const body = { ...campaginState };
    let flagTitle = validateTitle(body.title);
    let flagTagline = validateTagline(body.tagline);
    let flagImage = validateCardImage(body.cardImage);
    let flagCountry = validateCountry(body.location);
    let flagField = validateField(body.field);
    let flagDuartion = validateDuration(`${body.duration}`);

    if (flagTitle && flagTagline && flagImage && flagCountry && flagField && flagDuartion) {
      dispatch(setLoading(true));
      const id = body.id;
      delete body.cardImage;
      delete body.field;
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        formData.append('imageTypeName', 'cardImage');
      }

      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (fileId) {
        formData.append('fieldId', fileId);
      }
      editCampaignByIdMutation.mutate(
        {
          id,
          formData,
        },
        {
          onSuccess(data) {
            queryClient.invalidateQueries([`getCampaignById`, id]);
            navigate(`/campaigns/${id}/edit/story`);
          },
          onError(error) {
            console.log(error.message);
          },
          onSettled() {
            dispatch(setLoading(false));
          },
        },
      );
    }
  };

  const isEditComponent = useSelector((state) => state.userCampaign.isEditComponent);
  useEffect(() => {
    if (JSON.stringify(campagin) !== '{}') {
      if (campagin.status === 'Đang gây quỹ') {
        dispatch(setEditComponent(false));
      }
    }
  }, [campagin]);

  return (
    <div className={cx('body')}>
      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>Cơ bản</div>
        <div className={cx('entreField-subHeader')}>
          Tạo ấn tượng tốt đầu tiên: giới thiệu mục tiêu chiến dịch của bạn và lôi kéo mọi người tìm hiểu thêm. Thông
          tin cơ bản này sẽ đại diện cho chiến dịch của bạn trên trang chiến dịch, trên thẻ chiến dịch và trong các tìm
          kiếm.
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Tiêu đề <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>Tiêu đề chiến dịch của bạn là gì?</div>
          <input
            type="text"
            className={cx('itext-field')}
            name="title"
            value={campaginState.title}
            onChange={handleChangeInputText}
            disabled={!isEditComponent}
          />
          <span className={cx('entreField-validationLabel')}>{textValidateTitle}</span>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Dòng giới thiệu <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>
            Cung cấp ngắn mô tả đúng nhất chiến dịch của bạn cho mọi người.
          </div>
          <textarea
            className={cx('itext-field')}
            style={{ minHeight: '60px' }}
            name="tagline"
            value={campaginState.tagline}
            onChange={handleChangeInputText}
          ></textarea>
          <span className={cx('entreField-validationLabel')}>{textValidateTagline}</span>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Ảnh thẻ chiến dịch <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>
            Tải lên hình ảnh hình vuông đại diện cho chiến dịch của bạn. Độ phân giải khuyến nghị 640 x 640, độ phân
            giải tối thiểu 220 x 220.
          </div>
          <div>
            <div
              onClick={() => {
                inputImage.current.click();
              }}
              className={cx('entreField-input-image')}
            >
              {!campaginState.cardImage && (
                <div className={cx('tertiaryAction')}>
                  <span className={cx('tertiaryAction-icon')}>
                    <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                  </span>

                  <span className={cx('tertiaryAction-text')}>Upload image</span>
                </div>
              )}

              {campaginState.cardImage && (
                <div>
                  <img
                    style={{ position: 'relative', objectFit: 'cover', width: '400px', height: '400px' }}
                    src={campaginState.cardImage}
                  />
                  <div className={cx('editFile')}>
                    <span className={cx('editFile-icon')}>
                      <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        inputImage.current.value = null;
                        handleRemoveCardImage();
                      }}
                      className={cx('editFile-icon')}
                    >
                      <IoCloseSharp style={{ color: '#7a69b3', fontSize: '22px' }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <input
              onChange={handleChangeCardImage}
              className={cx('entreImage-file')}
              ref={inputImage}
              hidden
              name="file"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
            />
          </div>

          <span className={cx('entreField-validationLabel')}>{textValidateCardImage}</span>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Địa điểm <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>
            Chọn vị trí nơi bạn đang/sẽ chạy chiến dịch. Vị trí này sẽ hiển thị trên trang chiến dịch của bạn để mọi
            người có thể xem.
          </div>
          <div className={cx('layout-input')}>
            <div className={cx('container-input')}>
              <input
                type="text"
                className={cx('itext-field')}
                name="location"
                value={campaginState.location}
                onChange={handleChangeInputText}
              />
              <span className={cx('entreField-validationLabel')}>{textValidateCountry}</span>
            </div>
          </div>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Lĩnh vực <span className={cx('entreField-required')}>*</span>
          </label>
          <div className={cx('entreField-subLabel')}>
            Để giúp những người ủng hộ tìm thấy chiến dịch của bạn, hãy chọn lĩnh vực thể hiện rõ nhất dự án của bạn.
          </div>
          <div className={cx('entreField-categorySelect')} style={{ pointerEvents: !isEditComponent && 'none' }}>
            <a
              ref={elementCategory}
              className={cx('entreDropdown-select', 'itext-field', {
                borderInput: showCategory,
              })}
              onClick={handleClickCategorySelector}
            >
              <span>{campaginState.field}</span>

              <FaAngleDown className={cx('icon', 'icon-down')} />
              {showCategory && (
                <MenuDropDown listFieldGrouByCategory={listFieldGrouByCategory} onClickItem={handleChangeField} />
              )}
            </a>
          </div>
          <span className={cx('entreField-validationLabel')}>{textValidateField}</span>
        </div>

        <div className={cx('entreField')}>
          <label className={cx('entreField-label')}>
            Thời gian của chiến dịch <span className={cx('entreField-required')}>*</span>{' '}
          </label>
          <div className={cx('entreField-subLabel')}>
            Thời gian từ lúc chiến dịch của bạn được đăng tải cho đến khi nó kết thúc. Chúng tôi quy định thời gian tối
            đa cho mỗi chiến dịch là 60 ngày.
          </div>

          <input
            type="text"
            className={cx('itext-field')}
            style={{ width: '55px', padding: '5px 10px', textAlign: 'center' }}
            name="duration"
            value={campaginState.duration}
            onChange={handleChangeInputText}
            disabled={!isEditComponent}
          />
          <span className={cx('entreField-validationLabel')}>{textValidateDuration}</span>
        </div>

        <div className={cx('container-btn')}>
          <a onClick={handleClickSaveContinue} className={cx('btn-ok')}>
            LƯU & TIẾP TỤC
          </a>
        </div>
      </div>
    </div>
  );
}

export default BasicCampaign;

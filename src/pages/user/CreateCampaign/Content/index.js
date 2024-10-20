import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HiCamera } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import styles from './Content.module.scss';
import FAQ from './components/FAQ';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '~/redux/slides/GlobalApp';
import { useDispatch } from 'react-redux';
import { CustomUploadCKEAdapter } from '~/config';
import { useGetCampaignByIdQuery } from '~/hooks/api/queries/user/campaign.query';
import { useEditCampaignByIdMutation } from '~/hooks/api/mutations/user/campaign.mutation';
import { useQueryClient } from '@tanstack/react-query';

ClassicEditor.create(document.querySelector('#editor'), {
  extraPlugins: [CustomUploadCKEAdapter],
}).catch((error) => {
  console.log(error);
});

const cx = classNames.bind(styles);

function ContentCampaign() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [campaginState, setCampaignState] = useState({});
  const [campagin, setCampaign] = useState({});
  const [urlEmbedVideo, setUrlEmbedVideo] = useState();
  const [showErrorUrl, setShowErrorUrl] = useState(false);
  const [typeIPitch, setTypeIPitch] = useState(1);
  const inputImage = useRef();

  const handleClickAddRemoveVideo = (e) => {
    e.preventDefault();
    if (!urlEmbedVideo) {
      if (!checkLink(campaginState.videoUrl)) {
        setShowErrorUrl(true);
      } else {
        setShowErrorUrl(false);
        const urlEmbedVideo = '//www.youtube.com/embed/' + getId(campaginState.videoUrl);
        setUrlEmbedVideo(urlEmbedVideo);
      }
    } else {
      setUrlEmbedVideo('');
      setCampaignState((prev) => {
        return { ...prev, videoUrl: '' };
      });
    }
  };
  const handleChangeImageDetailPage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = reader.result;
        setCampaignState((prev) => {
          return { ...prev, imageDetailPage: { ...prev.imageDetailPage, url: res } };
        });
      };
    }
  };
  const handleRemoveImageDetailPage = () => {
    setCampaignState((prev) => {
      return { ...prev, imageDetailPage: { ...prev.imageDetailPage, url: '' } };
    });
  };
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CustomUploadCKEAdapter(loader);
    };
  }
  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };
  const handleClickAddFAQ = () => {
    setCampaignState((prev) => {
      return {
        ...prev,
        faqs: [...prev.faqs, { question: '', answer: '' }],
      };
    });
  };

  const handleRemoveFAQ = (index) => {
    setCampaignState((prev) => {
      return {
        ...prev,
        faqs: [...prev.faqs].filter((item, index2) => index2 !== index),
      };
    });
  };

  const handleChangeFAQ = (value, index) => {
    setCampaignState((prev) => {
      return {
        ...prev,
        faqs: [...prev.faqs].map((item, index2) => {
          if (index2 === index) {
            return value;
          } else return item;
        }),
      };
    });
  };

  useEffect(() => {
    console.log(campaginState);
  }, [campaginState]);

  const handleChangeInputText = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCampaignState((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const checkLink = (link) => {
    var regex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
    return regex.test(link);
  };
  const queryClient = useQueryClient();
  const dataCampaign = queryClient.getQueryData(['getCampaignById']);
  useEffect(() => {
    if (dataCampaign) {
      let infoBasic = {
        id: dataCampaign.data._id,
        title: dataCampaign.data.title || '',
        cardImage: dataCampaign.data.cardImage || { url: '', public_id: '' },
        status: dataCampaign.data.status,
        videoUrl: dataCampaign.data.videoUrl || '',
        imageDetailPage: dataCampaign.data.imageDetailPage || { url: '', public_id: '' },
        story: dataCampaign.data.story || '',
        faqs: (dataCampaign.data.faqs.length > 0 && dataCampaign.data.faqs) || [{ question: '', answer: '' }],
        owner: dataCampaign.data.owner || '',
        team: dataCampaign.data.team || [],
      };
      setCampaignState({ ...infoBasic });
      setCampaign({ ...infoBasic });
      const urlEmbedVideoTMP = '//www.youtube.com/embed/' + getId(dataCampaign.data.videoUrl);
      setUrlEmbedVideo(urlEmbedVideoTMP);
    }
  }, [dataCampaign]);

  const [textValidateCardImageAndVideo, setTextValidateCardImageAndVideo] = useState('');
  const validateCardImageAndVideo = (imageUrl, videoUrl) => {
    let flagImage = imageUrl?.trim().length === 0 || imageUrl?.trim() === '';
    let flagVideo = videoUrl?.trim().length === 0 || videoUrl?.trim() === '';
    if (flagImage && flagVideo) {
      setTextValidateCardImageAndVideo('* Vui lòng chọn ít nhất 1 ảnh hoặc video cho chiến dịch');
      return false;
    } else {
      setTextValidateCardImageAndVideo('');
      return true;
    }
  };

  const [isClicked, setIsClicked] = useState(false);
  const [flagFaqs, setFlagFaqs] = useState(false);

  const editCampaignByIdMutation = useEditCampaignByIdMutation();
  const handleClickSaveContinue = async () => {
    const body = { ...campaginState };
    const id = body.id;
    delete body.id;
    delete body.status;
    delete body.title;
    delete body.cardImage;
    delete body.owner;
    delete body.team;
    let flagURL = validateCardImageAndVideo(body.imageDetailPage.url, body.videoUrl);
    setIsClicked(true);
    if (flagURL && flagFaqs) {
      dispatch(setLoading(true));
      editCampaignByIdMutation.mutate(
        {
          id,
          body,
        },
        {
          onSuccess(data) {
            navigate(`/campaigns/${id}/edit/perks/table`);
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

  return (
    <div className={cx('body')}>
      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>Chọn Video hoặc Hình ảnh</div>
        <div className={cx('entreField-subHeader')}>
          Thêm video hoặc hình ảnh để xuất hiện trên đầu trang chiến dịch của bạn. Chiến dịch có video tăng thêm 200% so
          với chiến dịch không có video. Giữ cho video của bạn có độ dài 2-3 phút.
        </div>

        <div className={cx('i-media-selector')}>
          <div className={cx('entreField')}>
            <div className={cx('entreToggle')}>
              <div
                onClick={() => setTypeIPitch(1)}
                className={cx('i-media-button', {
                  'i-media-button-selected': typeIPitch === 1,
                })}
                data-index="1"
              >
                Video
              </div>
              <div
                onClick={() => setTypeIPitch(2)}
                className={cx('i-media-button', {
                  'i-media-button-selected': typeIPitch === 2,
                })}
              >
                Image
              </div>
            </div>
          </div>

          <div
            className={cx('i-pitchvideo-url', {
              hide: typeIPitch === 2,
            })}
          >
            <div className={cx('entreField')} style={{ position: 'relative' }}>
              <label className={cx('entreField-label')}>
                Video URL <span className={cx('entreField-required')}>*</span>
              </label>
              <div className={cx('entreField-subLabel')}>
                Nhập URL YouTube để xuất hiện ở đầu trang chiến dịch của bạn. Đảm bảo video của bạn đã bật phụ đề trên
                Youtube.
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  onChange={handleChangeInputText}
                  name="videoUrl"
                  value={campaginState.videoUrl}
                  type="text"
                  placeholder="http://"
                  className={cx('itext-field')}
                  style={{ flex: '1' }}
                />
                <a onClick={handleClickAddRemoveVideo} href="#" className={cx('btn-add-video')}>
                  {urlEmbedVideo ? 'XÓA VIDEO' : 'THÊM VIDEO'}
                </a>
              </div>
              <div
                className={cx('entreField-error', {
                  hide: !showErrorUrl,
                })}
              >
                Vui lòng nhập đúng định dạng Youtube URL
              </div>

              <div
                className={cx('videoPlaceholder', {
                  hide: urlEmbedVideo,
                })}
              ></div>
              <div style={{ marginTop: '10px' }}>
                {urlEmbedVideo && (
                  <iframe
                    src={urlEmbedVideo}
                    className={cx('container-iframe')}
                    scrolling="no"
                    title="YouTube embed"
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture;"
                    allowfullscreen="true"
                  ></iframe>
                )}
              </div>
            </div>
          </div>

          <div
            className={cx('i-pitchimage-uploader', {
              hide: typeIPitch === 1,
            })}
          >
            <div className={cx('entreField')}>
              <label className={cx('entreField-label')}>
                Chọn hình ảnh <span className={cx('entreField-required')}>*</span>
              </label>
              <div className={cx('entreField-subLabel')}>
                Tải hình ảnh lên để xuất hiện ở đầu trang chiến dịch của bạn. <br />
                Độ phân giải được đề xuất là 695 x 460.
              </div>
              <div>
                <div
                  onClick={() => {
                    inputImage.current.click();
                  }}
                  className={cx('entreField-input-image')}
                >
                  {!campaginState.imageDetailPage?.url && (
                    <div className={cx('tertiaryAction')}>
                      <span className={cx('tertiaryAction-icon')}>
                        <HiCamera style={{ color: '#7A69B3', fontSize: '18px' }} />
                      </span>

                      <span className={cx('tertiaryAction-text')}>Upload image</span>
                    </div>
                  )}

                  {campaginState.imageDetailPage?.url && (
                    <div className={cx('image-upload')}>
                      <img className={cx('container-image-upload')} src={campaginState.imageDetailPage?.url} />
                      <div className={cx('editFile')}>
                        <span className={cx('editFile-icon')}>
                          <MdEdit style={{ color: '#7a69b3', fontSize: '18px' }} />
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            inputImage.current.value = null;
                            handleRemoveImageDetailPage();
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
                  onChange={handleChangeImageDetailPage}
                  className={cx('entreImage-file')}
                  ref={inputImage}
                  name="file"
                  hidden
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                />
              </div>
            </div>
          </div>
        </div>
        <span className={cx('entreField-validationLabel')}>{textValidateCardImageAndVideo}</span>
      </div>

      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>
          Câu chuyện <span className={cx('entreField-required')}>*</span>
        </div>
        <div className={cx('entreField-subHeader')}>
          Cho những người đóng góp tiềm năng biết thêm về chiến dịch của bạn. Cung cấp chi tiết sẽ thúc đẩy mọi người
          đóng góp. Một chiến dịch quảng bá tốt phải hấp dẫn, nhiều thông tin và dễ hiểu.
        </div>

        <div className={cx('entreField-subLabel')}>
          Hình ảnh nhằm kéo dài chiều rộng của phần câu chuyện phải có chiều rộng tối thiểu là 695 pixel. Hình ảnh rộng
          hơn 695 pixel sẽ được thay đổi kích thước tương ứng.
        </div>

        <div className={cx('ck-editor')}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [uploadPlugin],
              toolbar: {
                items: [
                  'heading',
                  '|',
                  'bold',
                  'italic',
                  'link',
                  'bulletedList',
                  'numberedList',
                  '|',
                  'indent',
                  'outdent',
                  '|',
                  'imageUpload',
                  'blockQuote',
                  'insertTable',
                  'mediaEmbed',
                  'undo',
                  'redo',
                  'paragraph',
                ],
              },
              image: {
                toolbar: [
                  'imageStyle:full',
                  'imageStyle:side',
                  'toggleImageCaption',
                  'PictureEditing',
                  '|',
                  'imageTextAlternative',
                  'resizeImage:50',
                  'resizeImage:75',
                  'resizeImage:original',
                ],
                resizeOptions: [
                  {
                    name: 'resizeImage:original',
                    value: null,
                    icon: 'original',
                  },
                  {
                    name: 'resizeImage:50',
                    value: '50',
                    icon: 'medium',
                  },
                  {
                    name: 'resizeImage:75',
                    value: '75',
                    icon: 'large',
                  },
                ],
              },
              table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
              },
            }}
            data={
              campaginState.story ||
              "<h3>Short Summary</h3><p>&nbsp;</p><h3>What We Need &amp; What You Get</h3><p>Break it down for folks in more detail:</p><ul><li>Explain how much funding you need and where it's going. Be transparent and specific-people need to trust you to want to fund you.</li><li>Tell people about your unique perks. Get them excited!</li><li>Describe where the funds go if you don't reach your entire goal.</li></ul><h3>The Impact</h3><p>Feel free to explain more about your campaign and let people know the difference their contribution will make:</p><ul><li>Explain why your project is valuable to the contributor and to the world.</li><li>Point out your successful track record with projects like this (if you have one).</li><li>Make it real for people and build trust.</li></ul><h3>Risks &amp; Challenges</h3><p>People value your transparency. Be open and stand out by providing insight into the risks and obstacles you may face on the way to achieving your goal.</p><ul><li>Share what qualifies you to overcome these hurdles.</li><li>Describe your plan for solving these challenges.</li></ul><h3>Other Ways You Can Help</h3><p>Some people just can't contribute, but that doesn't mean they can't help:</p><ul><li>Ask folks to get the word out and make some noise about your campaign.</li><li>Remind them to use the Indiegogo share tools!</li></ul><p>And that's all there is to it.</p><p>&nbsp;</p>"
            }
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle('height', '700px', editor.editing.view.document.getRoot());
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCampaignState((prev) => ({ ...prev, story: data }));
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>

      <div style={{ marginTop: '60px', marginBottom: '60px', background: '#C8C8C8', height: '0.5px' }}></div>

      <div className={cx('entreSection')}>
        <div className={cx('entreField-header')}>
          FAQ <span className={cx('entreField-required')}>*</span>
        </div>
        <div className={cx('entreField-subHeader')}>
          Phần Câu hỏi thường gặp sẽ cung cấp các chi tiết phổ biến nhất mà người ủng hộ đang tìm kiếm khi đánh giá
          chiến dịch của bạn. Các thắc mắc ban đầu về chiến dịch có thể sẽ được giải quyết tại đây.
        </div>

        <div>
          {campaginState.faqs?.map((item, index) => {
            return (
              <FAQ
                key={index}
                index={index}
                item={item}
                isShowClose={campaginState.faqs.length > 1}
                removeFAQ={handleRemoveFAQ}
                handleChangeFAQ={handleChangeFAQ}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                setFlagFaqs={setFlagFaqs}
              />
            );
          })}
        </div>

        <div
          onClick={handleClickAddFAQ}
          style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '35px',
              height: '35px',
              background: '#eee5f2',
              color: '#7a69b3',
              borderRadius: '50%',
              marginRight: '12px',
            }}
          >
            <FaPlus />
          </span>
          <span style={{ color: '#7a69b3', fontWeight: '600' }}>THÊM CÂU HỎI KHÁC</span>
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

export default ContentCampaign;

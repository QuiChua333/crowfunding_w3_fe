import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailProject.module.scss';
import formatMoney from '~/utils/formatMoney.js';
import ProgressBar from '@ramonak/react-progress-bar';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ModalPerk from './components/ModalPerk';
import PerkItem from '~/components/PerkItem';
import ModalOptionPerk from './components/ModalOptionPerk';
import { useParams } from 'react-router-dom';
import formatPercent from '~/utils/formatPercent';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from './components/Dropdown';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import ModalTeamMembersDetail from './components/ModalTeamMembersDetail';
import ModalReport from './components/ModalReport';
import FAQSection from './components/FAQTab';
import StorySection from './components/StoryTab';
import CommentSection from './components/CommentTab';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateFromString } from '~/utils';
import { defaultAvt } from '~/assets/images';

import {
  useGetCampaignByIdQuery,
  useGetQuantitySuccessCampaignByCampaignId,
} from '~/hooks/api/queries/user/campaign.query';
import { useGetTeamMemberByCampaignId } from '~/hooks/api/queries/user/team.query';
import { useFollowCampaignMutation } from '~/hooks/api/mutations/user/follow-campaign.mutation';
import { useGetPerksHasListItemsByCampaignIdQuery } from '~/hooks/api/queries/user/perk.query';
import { setFollowCampaigns } from '~/redux/slides/User';
import { useGetQuantityFollowsOfCampaignQuery } from '~/hooks/api/queries/user/follow-campaign.query';
const cx = classNames.bind(styles);

function DetailProject() {
  const { id } = useParams();
  const [isOpenModalMember, setIsOpenModalMember] = useState(false);
  const [isOpenModalReport, setIsOpenModalReport] = useState(false);
  const [ItemProject, setItemProject] = useState({});
  const [listPerkByCampaignId, setListPerkByCampaignId] = useState([]);
  const [members, setMembers] = useState([]);
  const [quantityFollowsOfCampaign, setQuantityFollowsCampaign] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [indexTabHeader, setIndexTabHeader] = useState(1);
  const [isOpenModalOption, setIsOpenModalOption] = useState(false);
  const [perkInModal, setPerkInModal] = useState(false);
  const [itemPerkSelected, setItemPerkSelected] = useState({});
  const [openDropDown, setOpenDropDown] = useState(false);
  const docElement = useRef(null);
  const [endDate, setEndDate] = useState('');

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    function handleClickOutside(event) {
      if (docElement.current && !docElement.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [docElement]);

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const { data: dataListPerksByCampaignId } = useGetPerksHasListItemsByCampaignIdQuery(id);
  const { data: dataProjectById } = useGetCampaignByIdQuery(id);
  const { data: quantitySuccessCampaign } = useGetQuantitySuccessCampaignByCampaignId(id);
  const { data: dataQuantityFollowsOfCampaign, refetch: refetchGetQuantityFollow } =
    useGetQuantityFollowsOfCampaignQuery(id);

  useEffect(() => {
    if (dataQuantityFollowsOfCampaign) {
      setQuantityFollowsCampaign(dataQuantityFollowsOfCampaign);
    }
  }, [dataQuantityFollowsOfCampaign]);

  const { data: dataMembers } = useGetTeamMemberByCampaignId(id);
  useEffect(() => {
    if (dataMembers) {
      setMembers(dataMembers);
    }
  }, [dataMembers]);

  useEffect(() => {
    if (dataProjectById) {
      setItemProject(() => {
        const listImageProject = [];
        if (dataProjectById.imageDetailPage) {
          listImageProject.push({
            url: dataProjectById.imageDetailPage,
            isImage: true,
          });
        }
        if (dataProjectById.youtubeUrl) {
          const urlEmbedVideo = '//www.youtube.com/embed/' + getId(dataProjectById.youtubeUrl);

          listImageProject.push({
            url: dataProjectById.youtubeUrl,
            urlEmbedVideo,
            isImage: false,
          });
        }
        return {
          ...dataProjectById,
          listImageProject,
        };
      });

      if (dataListPerksByCampaignId) {
        if (dataProjectById.cryptocurrencyMode) {
          setListPerkByCampaignId(dataListPerksByCampaignId);
        } else {
          setListPerkByCampaignId(dataListPerksByCampaignId.filter((item) => !item.isNFT));
        }
      }
    }
  }, [dataProjectById, dataListPerksByCampaignId]);

  const [favourite, setFavourite] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.followCampaigns?.includes(ItemProject.id)) {
      setFavourite(true);
    } else setFavourite(false);
  }, [ItemProject, currentUser.followCampaigns?.length]);

  const followCampaign = useFollowCampaignMutation();

  const handleClickFollowCampaign = async () => {
    followCampaign.mutate(ItemProject.id, {
      onSuccess: () => {
        if (currentUser.followCampaigns.includes(ItemProject.id)) {
          dispatch(setFollowCampaigns(currentUser.followCampaigns.filter((item) => item !== ItemProject.id)));
          setQuantityFollowsCampaign((prev) => prev - 1);
        } else {
          dispatch(setFollowCampaigns([...currentUser.followCampaigns, ItemProject.id]));
          setQuantityFollowsCampaign((prev) => prev + 1);
        }
        refetchGetQuantityFollow();
      },
      onError: (error) => {
        console.log('Error follow campaign', error);
      },
    });
  };

  useEffect(() => {
    let startDateTime = new Date(ItemProject.startDate);
    let endDateTime = new Date();
    endDateTime = endDateTime.setDate(startDateTime.getDate() + ItemProject.duration);
    setEndDate(convertDateFromString(endDateTime));
  }, [ItemProject]);

  const handleURLImage = (linkURL) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = linkURL.match(regExp);
    return match && match[7].length === 11 ? 'https://img.youtube.com/vi/' + match[7] + '/default.jpg' : false;
  };

  return (
    <div className={cx('container-main')}>
      <div className={cx('container-1')}>
        <div className={cx('container-left')}>
          <div className={cx('container-list-big')}>
            {ItemProject.listImageProject?.[indexImage].isImage ? (
              <img
                style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                src={ItemProject.listImageProject?.[indexImage].url}
                alt="sp"
              />
            ) : (
              <iframe
                style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                src={ItemProject.listImageProject?.[indexImage].urlEmbedVideo}
                alt="sp"
                title="frame"
              />
            )}
          </div>
          <div className={cx('container-list-small')}>
            <AiOutlineDoubleLeft
              className={cx('icon-slider')}
              style={{
                display: ItemProject.listImageProject?.length < 6 && 'none',
                opacity: indexImage === 0 && '0.6',
                pointerEvents: indexImage === 0 && 'none',
              }}
              onClick={() => setIndexImage((prev) => prev - 1)}
            />

            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  flexWrap: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: ItemProject.listImageProject?.length > 6 ? 'flex-start' : 'center',
                  transform: indexImage - 5 > 0 ? 'translateX(-' + (indexImage - 5) * 80 + 'px)' : 'translateX(0px)',
                }}
              >
                {ItemProject.listImageProject?.map((item, index) => {
                  return (
                    <img
                      key={index}
                      style={{
                        width: '70px',
                        height: '60px',
                        borderRadius: '6px',
                        margin: '0 4px',
                        border: index === indexImage && '3px solid #000',
                      }}
                      src={item.isImage ? item.url : handleURLImage(item.url)}
                      alt="sp"
                      onClick={() => setIndexImage(index)}
                      className={cx('noselect')}
                    />
                  );
                })}
              </div>
            </div>
            <AiOutlineDoubleRight
              className={cx('icon-slider')}
              style={{
                display: ItemProject.listImageProject?.length < 6 && 'none',
                opacity: indexImage === ItemProject.listImageProject?.length - 1 && '0.6',
                pointerEvents: indexImage === ItemProject.listImageProject?.length - 1 && 'none',
              }}
              onClick={() => setIndexImage((prev) => prev + 1)}
            />
          </div>
        </div>
        <hr className={cx('sparate-2')} />
        <div className={cx('container-right')}>
          <p
            className={cx('text-funding', {
              dangGayQuy: ItemProject?.status === 'Đang gây quỹ',
              daKetThuc: ItemProject?.status === 'Đã kết thúc' || ItemProject?.status === 'Đang tạm ngưng',
            })}
          >
            {ItemProject.status}
          </p>
          <p className={cx('text-name')}>{ItemProject?.title}</p>
          <p className={cx('text-des')}>{ItemProject?.tagline}</p>
          <div className={cx('container-layout-info')}>
            <img className={cx('avatar')} src={ItemProject.owner?.avatar || defaultAvt} alt="avt" />
            <div className={cx('container-info')}>
              <a href={`/individuals/${ItemProject.owner?.id}/profile`} className={cx('name-user')}>
                {ItemProject.owner?.fullName}
              </a>
              <div style={{ display: 'flex' }}>
                <span>{quantitySuccessCampaign || 0} chiến dịch thành công</span>
                <div className={cx('seprate')}></div>
                <span>{ItemProject.location}</span>
              </div>
            </div>
          </div>
          {ItemProject.status === 'Đang gây quỹ' && (
            <div className={cx('container-layout-money')}>
              <div className={cx('container-money')}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <b className={cx('text-current-money')}>{formatMoney(ItemProject.currentMoney)}</b>
                  <span className={cx('label-money')}>VNĐ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={cx('container-people')}>{ItemProject.totalContributions}</span>
                  <span className={cx('text-people')}>lượt đóng góp</span>
                </div>
              </div>
              <ProgressBar
                margin="6px 0"
                labelAlignment="right"
                labelColor="#fff"
                labelSize="12px"
                width="100%"
                baseBgColor="#ccc"
                bgColor="#34ca96"
                borderRadius="10px"
                height="16px"
                customLabel={formatPercent((ItemProject.currentMoney / ItemProject.goal) * 100)}
                isLabelVisible={false}
                maxCompleted={ItemProject.goal}
                completed={ItemProject.currentMoney}
              />
              <div className={cx('container-layout-deadline')}>
                <div className={cx('container-deadline')}>
                  <b className={cx('text-money-total')}>
                    {formatPercent((ItemProject.currentMoney / ItemProject.goal) * 100) + '%'}
                  </b>
                  <span className={cx('text-of')}>của</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <b className={cx('text-money-total')}>{formatMoney(ItemProject.goal)}</b>
                    <span className={cx('label-money')}>VNĐ</span>
                  </div>
                </div>

                <b className={cx('container-people')}>
                  {ItemProject.daysLeft} <span className={cx('text-people')}>còn lại</span>
                </b>
              </div>
            </div>
          )}
          {ItemProject.status === 'Đã kết thúc' && (
            <>
              <div className={cx('end-status')}>
                <div>Dự án đã kết thúc vào ngày: {endDate}</div>
                <div>
                  <span style={{ fontWeight: '700' }}>{formatMoney(ItemProject.currentMoney)}</span>VNĐ{' '}
                  <span>bởi {ItemProject.totalContributions} lượt đóng góp</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <span style={{ display: 'block', paddingBottom: '2px', borderBottom: '1px dashed #949494' }}>
                  Gây quỹ:
                </span>
                {ItemProject.isSSuccessFunding && (
                  <div style={{ padding: '4px 16px', background: '#34ca96', color: '#fff', borderRadius: '4px' }}>
                    Thành công
                  </div>
                )}
                {!ItemProject.isSSuccessFunding && (
                  <div style={{ padding: '4px 16px', background: '#a8a8a8', color: '#fff', borderRadius: '8px' }}>
                    Thất bại
                  </div>
                )}
              </div>
            </>
          )}

          <div className={cx('container-button')}>
            <div className={cx('container-btn-2')}>
              <button
                className={cx('hover-btn')}
                type="button"
                onClick={() => {
                  setPerkInModal(true);
                  setIsOpenModal(true);
                }}
                style={{ display: ItemProject.status === 'Đã kết thúc' && 'none' }}
              >
                XEM QUÀ TẶNG
              </button>
              <button className={cx('hover-btn-follow')} type="button" onClick={handleClickFollowCampaign}>
                {favourite ? (
                  <FaHeart style={{ color: 'red' }} className={cx('text-follow')} />
                ) : (
                  <FaRegHeart className={cx('text-follow')} />
                )}
                <div>
                  <span>{`${quantityFollowsOfCampaign} THEO DÕI`}</span>
                </div>
              </button>
            </div>
            <div
              className={cx('action-doc')}
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropDown((prev) => !prev);
              }}
              ref={docElement}
            >
              <PiDotsThreeBold style={{ fontSize: '20px', color: '#000' }} />
              <div className={cx('dropdown-wrapper')} style={{ display: openDropDown && 'block' }}>
                <DropDown
                  setIsOpenModalMember={setIsOpenModalMember}
                  setIsOpenModalReport={setIsOpenModalReport}
                  IsOpenModalReport={isOpenModalReport}
                  statusCampaign={ItemProject.status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('container-under')}>
        <div className={cx('container-under-left')}>
          <div className={cx('container-items-tab')}>
            <span
              className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 1 })}
              onClick={() => setIndexTabHeader(1)}
            >
              CÂU CHUYỆN
            </span>
            <span
              className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 2 })}
              onClick={() => setIndexTabHeader(2)}
            >
              FAQ
            </span>
            <div
              className={cx('item-tab-header', { 'item-tab-header-clicked': indexTabHeader === 3 })}
              onClick={() => setIndexTabHeader(3)}
            >
              <span>THẢO LUẬN</span>
            </div>
          </div>

          <div>
            {indexTabHeader === 1 && <StorySection story={ItemProject.story} />}
            {indexTabHeader === 2 && <FAQSection faqs={ItemProject.faqs} />}
            {indexTabHeader === 3 && <CommentSection campaign={ItemProject} members={members} />}
          </div>
        </div>

        <div className={cx('container-under-right')}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <p style={{ fontSize: '18px', marginLeft: '10px', fontWeight: 'bold', marginBottom: '20px' }}>
              Chọn đặc quyền
            </p>
            <div style={{ maxHeight: '920px', overflowY: 'scroll' }}>
              {listPerkByCampaignId.map((item, index) => {
                return (
                  <div
                    style={{
                      pointerEvents:
                        (ItemProject.status === 'Thất bại' || ItemProject.status === 'Đã hoàn thành') && 'none',
                    }}
                  >
                    <PerkItem
                      setItemPerkSelected={setItemPerkSelected}
                      index={index}
                      item={item}
                      key={index}
                      isPage={true}
                      cryptocurrencyMode={ItemProject.cryptocurrencyMode}
                      setIsOpenModalOption={setIsOpenModalOption}
                      closePerkModal={() => setIsOpenModal(false)}
                      setPerkInModal={setPerkInModal}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isOpenModalOption && (
        <ModalOptionPerk
          itemPerk={{
            ...itemPerkSelected,
            detailPerks: itemPerkSelected.detailPerks.map((item) => ({
              ...item,
              item: {
                ...item.item,
                ...(item.item.isHasOption
                  ? {
                      options: item.item.options.map((option) => ({
                        ...option,
                        values: option.values?.split('|') ?? [],
                      })),
                    }
                  : {}),
              },
            })),
          }}
          close={() => setIsOpenModalOption(false)}
          setIsOpenModal={setIsOpenModal}
          perkInModal={perkInModal}
          cryptocurrencyMode={ItemProject.cryptocurrencyMode}
        />
      )}
      {isOpenModal && (
        <ModalPerk
          cryptocurrencyMode={ItemProject.cryptocurrencyMode}
          setItemPerkSelected={setItemPerkSelected}
          listPerk={listPerkByCampaignId}
          close={() => setIsOpenModal(false)}
          setIsOpenModalOption={setIsOpenModalOption}
          setPerkInModal={setPerkInModal}
        />
      )}
      {isOpenModalMember && <ModalTeamMembersDetail setIsOpenModalMember={setIsOpenModalMember} members={members} />}
      {isOpenModalReport && <ModalReport setIsOpenModalReport={setIsOpenModalReport} />}
    </div>
  );
}

export default DetailProject;

import classNames from 'classnames/bind';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import ProjectCardItem from '~/components/ProjectCardItem';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import styles from './Explore.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFieldGroupByCategoryQuery } from '~/hooks/api/queries/user/field.query';
import { useUserGetAllCampaignQuery } from '~/hooks/api/queries/user/campaign.query';
import { useQueryClient } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';
const cx = classNames.bind(styles);

function Explore() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries([`getCurrentUser`]);
  const [listFieldGrouByname, setListFieldGrouByname] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(() => {
    const state = {
      searchString: '',
      criteria: 'new',
      name: 'Tất cả',
      status: 'Tất cả',
      page: 1,
      field: 'Tất cả',
    };

    return state;
  });
  const handleClickItemFilteruserVerifyStatus = (item) => {
    setFilter((prev) => ({ ...prev, userVerifyStatus: item }));
  };
  const handleClickItemFilterUserStatus = (item) => {
    setFilter((prev) => ({ ...prev, userStatus: item }));
  };

  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handleClickNextPage = () => {
    if (filter.page === dataCampaign?.totalPages) return;
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useGetFieldGroupByCategoryQuery();
  useEffect(() => {
    if (data) {
      setListFieldGrouByname(
        [{ name: 'Tất cả', active: false }]
          .concat(
            data.map((item) => {
              return {
                ...item,
                active: false,
                showMore: false,
                fields: item.fields.map((item) => ({ field: item.name, active: false })),
              };
            }),
          )
          .map((item) => {
            if (item.name === filter.name) {
              if (item.name !== 'Tất cả') {
                return {
                  ...item,
                  showMore: true,
                  active: true,
                  fields: item.fields.map((item2) => {
                    return { ...item2, active: false };
                  }),
                };
              } else {
                return { ...item, active: true };
              }
            } else {
              if (item.name !== 'Tất cả') {
                return {
                  ...item,
                  active: false,
                  showMore: item.fields.some((item2) => item2.field === filter.field),
                  fields: item.fields.map((item2) => {
                    if (item2.field === filter.field) return { ...item2, active: true };
                    else return { ...item2, active: false };
                  }),
                };
              } else {
                return {
                  ...item,
                  active: false,
                };
              }
            }
          }),
      );
    }
  }, [data]);

  const boxFilterElement = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxFilterElement.current && !boxFilterElement.current.contains(event.target)) {
        setActiveBoxFilter(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [boxFilterElement]);
  const [activeBoxFilter, setActiveBoxFilter] = useState(false);

  useEffect(() => {
    setListFieldGrouByname((prev) => {
      const nextState = [...prev].map((item) => {
        if (item.name === filter.name) {
          if (item.name !== 'Tất cả') {
            return {
              ...item,
              showMore: true,
              active: true,
              fields: item.fields.map((item2) => {
                return { ...item2, active: false };
              }),
            };
          } else {
            return { ...item, active: true };
          }
        } else {
          if (item.name !== 'Tất cả') {
            return {
              ...item,
              active: false,
              showMore: item.fields.some((item2) => item2.field === filter.field),
              fields: item.fields.map((item2) => {
                if (item2.field === filter.field) return { ...item2, active: true };
                else return { ...item2, active: false };
              }),
            };
          } else {
            return {
              ...item,
              active: false,
            };
          }
        }
      });
      return nextState;
    });
    console.log(filter);
  }, [filter]);

  const {
    data: dataCampaign,
    isLoading,
    isFetching,
  } = useUserGetAllCampaignQuery({
    field: filter.field || '',
    criteria: filter.criteria,
    searchString: filter.searchString,
    page: filter.page,
    status: filter.status,
    fieldGroup: filter.name || '',
  });

  const handleClickShowMore = (index, name) => {
    if (name !== 'Tất cả') {
      setListFieldGrouByname((prev) => {
        return [...prev].map((item, index2) => {
          if (index2 === index) {
            return {
              ...item,
              showMore: !item.showMore,
            };
          } else return item;
        });
      });
    }
    if (name !== filter.name) {
      setFilter((prev) => {
        let nextState = { ...prev, name };
        delete nextState.field;
        return nextState;
      });
    }
  };
  const handleFilterField = (field) => {
    if (field !== filter.field) {
      setFilter((prev) => {
        let nextState = { ...prev, field };
        delete nextState.name;
        return nextState;
      });
    }
  };

  const handleChangeStatus = (e) => {
    setFilter((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleChangeInputSearch = (e) => {
    const value = e.target.value;
    setSearch(e.target.value);
    debounced(value);
  };
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setFilter((prev) => ({ ...prev, searchString: value }));
    },
    500,
  );

  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('subHeader')}>

            </div> */}
      {/* Banner  */}
      <div className={cx('banner')}>
        <h2 className={cx('title')}>Chiến Dịch Give Fun</h2>

        <p className={cx('description')}>
          Tài trợ cho các dự án mới và đột phá, bao gồm cả các dự án thành công từ Give Fun InDemand
        </p>
      </div>

      <div className={cx('container')}>
        <nav className={cx('exploreFilters')}>
          <h2 style={{ fontWeight: '600' }}>Lọc theo</h2>

          <div className={cx('exploreFilters-categories')}>
            <div className={cx('exploreFilters-subheader')}>LĨNH VỰC</div>

            <div>
              {listFieldGrouByname.map((item, index) => {
                return (
                  <div key={index} className={cx('categoryNavItem', { active: item.active })}>
                    <h4 onClick={() => handleClickShowMore(index, item.name)} className="flex items-center gap-[4px]">
                      {item.name}
                      {item.name !== 'Tất cả' && (
                        <>
                          {!item.showMore ? (
                            <FaAngleDown style={{ fontSize: '12px' }} />
                          ) : (
                            <FaAngleUp style={{ fontSize: '12px' }} />
                          )}
                        </>
                      )}
                    </h4>
                    {item.showMore && (
                      <ul className={cx('list-field')}>
                        {item.fields.map((item2, index2) => {
                          return (
                            <li
                              onClick={() => handleFilterField(item2.field)}
                              key={index2}
                              className={cx('field-item', { active: item2.active })}
                            >
                              {item2.field}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx('separate')}></div>

          <div className={cx('projectTimingFilter')}>
            <div className={cx('projectTimingFilter-subheader')}>TRẠNG THÁI DỰ ÁN</div>

            <div>
              <div style={{ marginTop: '16px' }}>
                <label className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'Tất cả'} name="status" defaultChecked onChange={handleChangeStatus} />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Tất cả</span>
                  </span>
                </label>

                <label className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'Đang gây quỹ'} name="status" onChange={handleChangeStatus} />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Đang gây quỹ</span>
                  </span>
                </label>
                <label className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'Thành công'} name="status" onChange={handleChangeStatus} />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Thành công</span>
                  </span>
                </label>

                <label className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'Tạm dừng'} name="status" onChange={handleChangeStatus} />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Tạm dừng</span>
                  </span>
                </label>
                <label className={cx('inputRadioGroup-radio')}>
                  <input type="radio" value={'Thất bại'} name="status" onChange={handleChangeStatus} />
                  <span className={cx('inputRadioGroup-radio-button')}></span>
                  <span className={cx('inputRadioGroup-radio-label')}>
                    <span>Thất bại</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </nav>
        <div className={cx('exploreLayout-main')}>
          <div className={cx('exploreLayout-main-search')}>
            <span className={cx('exploreLayout-main-icon-search')}>
              <AiOutlineSearch />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm chiến dịch"
              className={cx('exploreLayout-main-input')}
              value={search}
              onChange={handleChangeInputSearch}
            />
            <span
              onClick={() => setFilter((prev) => ({ ...prev, searchString: '' }))}
              className={cx('exploreLayout-main-icon-close')}
            >
              <AiOutlineClose />
            </span>
          </div>

          <div className={cx('exploreLayout-main-separate')}></div>

          <div className={cx('sort-by')}>
            <span className={cx('label')}>Theo</span>

            <div
              onClick={() => setActiveBoxFilter((prev) => !prev)}
              className={cx('box-filter')}
              ref={boxFilterElement}
            >
              <div className="flex items-center gap-[4px]">
                <span>{filter.criteria === 'new' ? 'Mới nhất' : 'Quyên góp nhiều nhất'} </span>{' '}
                <FaAngleDown className={cx('icon', { active: activeBoxFilter })} />
              </div>
              {activeBoxFilter && (
                <div className={cx('dropdownBoxFilter')}>
                  <span
                    onClick={() => setFilter((prev) => ({ ...prev, criteria: 'new' }))}
                    className={cx({ active: filter.criteria === 'new' })}
                  >
                    Mới nhất
                  </span>
                  <span
                    onClick={() => setFilter((prev) => ({ ...prev, criteria: 'most' }))}
                    className={cx({ active: filter.criteria === 'most' })}
                  >
                    Quyên góp nhiều nhất
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            {isLoading && (
              <div className="text-center ">
                <ClipLoader size={40} color="#299899" />
              </div>
            )}
            <div className={cx('exploreSearchResults')}>
              {!isLoading &&
                dataCampaign?.campaigns?.map((item, index) => {
                  return <ProjectCardItem key={index} campaign={item} />;
                })}
            </div>

            {dataCampaign?.totalPages > 0 && (
              <div className={cx('pagination-wrapper')}>
                <div className={cx('pagination')}>
                  <span
                    className={cx(
                      'icon',
                      `${
                        filter.page <= dataCampaign?.totalPages &&
                        dataCampaign?.totalPages !== 1 &&
                        filter.page > 1 &&
                        'hover:bg-[#ebe8f1] hover:cursor-pointer'
                      }`,
                    )}
                    onClick={handleClickPreviousPage}
                  >
                    <FaAngleLeft style={{ color: '#7a69b3', opacity: filter.page === 1 ? '0.3' : '1' }} />
                  </span>

                  <span className={cx('curent')}>{`${filter.page} của ${dataCampaign?.totalPages}`}</span>
                  <span
                    className={cx(
                      'icon',
                      `${filter.page < dataCampaign?.totalPages && 'hover:bg-[#ebe8f1] hover:cursor-pointer'}`,
                    )}
                    onClick={handleClickNextPage}
                  >
                    <FaAngleRight
                      style={{ color: '#7a69b3', opacity: filter.page === dataCampaign?.totalPages ? '0.3' : '1' }}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;

import ProjectCardItem from '~/components/ProjectCardItem';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { AiOutlineRight } from 'react-icons/ai';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styles from './Home.module.scss';
import SectionTrust from './components/SectionTrust';
import { useEffect, useState } from 'react';
import { setFilterExplore } from '~/redux/slides/GlobalApp';
import { useDispatch } from 'react-redux';
import { Hero } from '~/pages/user/Home/components';
import { Footer, Header } from '~/layout/components';
import { audio, film, health, home, phone, travel } from '~/assets/images';
import { useGetPopulateCampaigns } from '~/hooks/api/queries/user/campaign.query';

const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const handleClickField = (field) => {
    dispatch(
      setFilterExplore({
        field,
      }),
    );
    navigate('/explore');
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className={cx('flex', 'justify-between', 'button-group')} style={{ width: '100px' }}>
        <div onClick={() => previous()} className={cx('icon-switch', 'icon-back')}>
          <FaAngleLeft className={cx('icon')} />
        </div>
        <div onClick={() => next()} className={cx('icon-switch', 'icon-next')}>
          <FaAngleRight className={cx('icon')} />
        </div>
      </div>
    );
  };

  const { data } = useGetPopulateCampaigns();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    if (data) {
      setCampaigns(data);
    }
  }, [data]);

  const navigate = useNavigate();
  return (
    <div className={cx('wrapper', 'responsive')}>
      <Header type="home" />
      <Hero />
      <div className={cx('body')}>
        <div className={cx('inner')}>
          <div className={cx('list-popular-projects')} style={{ marginTop: '60px' }}>
            <div className="flex justify-between">
              <h3 className={cx('title')}>DỰ ÁN PHỔ BIẾN</h3>
            </div>

            <div className={cx('carsousel-wrapper')} style={{ marginTop: '28px' }}>
              <Carousel
                itemClass={cx('carousel')}
                responsive={responsive}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
              >
                {campaigns?.map((item, index) => {
                  return (
                    <div key={index} style={{ marginLeft: '16px' }}>
                      <ProjectCardItem campaign={item} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className={cx('category-interest')} style={{ marginTop: '100px' }}>
            <h2 className={cx('title')}>Những lĩnh vực nào bạn đang quan tâm?</h2>

            <p className={cx('content')}>
              Khám phá các dự án dành riêng cho bạn và nhận được những đề xuất tuyệt vời khi bạn chọn sở thích của mình.
            </p>

            <p className={cx('content')}>Hoặc khám phá các danh mục hàng đầu của chúng tôi</p>

            <div className="flex flex-wrap" style={{ width: '100%', marginTop: '16px' }}>
              <div onClick={() => handleClickField('Vật dụng trong nhà')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={home} />
                </div>

                <div className={cx('categoryText')}>VẬT DỤNG TRONG NHÀ</div>
              </div>

              <div onClick={() => handleClickField('Điện thoại & phụ kiện')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={phone} alt="phone" />
                </div>

                <div className={cx('categoryText')}>ĐIỆN THOẠI & PHỤ KIỆN</div>
              </div>

              <div onClick={() => handleClickField('Du lịch & hoạt động ngoài trời')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={travel} />
                </div>

                <div className={cx('categoryText')}>DU LỊCH & HOẠT ĐỘNG NGOÀI TRỜI</div>
              </div>

              <div onClick={() => handleClickField('Sức khỏe & thể hình')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={health} />
                </div>

                <div className={cx('categoryText')}>SỨC KHỎE & THỂ HÌNH</div>
              </div>

              <div onClick={() => handleClickField('Âm thanh')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={audio} />
                </div>

                <div className={cx('categoryText')}>ÂM THANH</div>
              </div>

              <div onClick={() => handleClickField('Phim')} className={cx('column')}>
                <div className={cx('categoryIcon')}>
                  <img src={film} />
                </div>

                <div className={cx('categoryText')}>PHIM</div>
              </div>
            </div>
          </div>
          <div className={cx('backTheProjectSection-imageWrapper')}>
            <div className={cx('backTheProjectSection-iamge')}>
              <h2 className={cx('title')}>Cơ hội mới, thành công mới</h2>

              <p className={cx('content')}>
                Give Fun là điểm đén của bạn để khám phá những đổi mới tinh tế trong công nghệ, thiết kế và nhiều lĩnh
                vực khác, thường đi kèm với ưu đãi đặc biệt và giá ưu đãi cho những người ủng hộ sớm. Hãy ủng hộ một dự
                án, chia sẻ ý kiến và phản hồi của bạn với nhóm dự án - và tham gia vào rủi ro và phúc lợi của việc mang
                sản phẩm mới vào cuộc sống.
              </p>

              <Link className={cx('link', 'flex items-center gap-1')} to="/explore">
                <span>Tìm hiểu thêm về Give Fun</span>
                <AiOutlineRight />
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '60px', width: '100vw' }} className="flex justify-center">
          <SectionTrust />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

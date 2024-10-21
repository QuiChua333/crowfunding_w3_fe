import classNames from 'classnames/bind';
import styles from './PrefixCampaign.module.scss';
import { FaArrowRightLong } from 'react-icons/fa6';
import { indemand, prepost } from '~/assets/images';
import { useCheckAdminMutation, useStartCampaignMutation } from '~/hooks/api/mutations/user/campaign.mutation';

const cx = classNames.bind(styles);

function PrefixCampaign() {
  const checkAdmin = useCheckAdminMutation();
  const startCampaign = useStartCampaignMutation();

  const handleClickStartCampaign = async () => {
    const token = localStorage.getItem('accessToken') || false;
    if (!token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return;
    }

    checkAdmin.mutate({
      onSuccess: (res) => {
        if (res?.data) {
          return;
        } else {
          startCampaign.mutate({
            onSuccess: (res) => {
              window.location.href = `/campaigns/${res?.data._id}/edit/basic`;
            },
            onError: (error) => console.log(error.message),
          });
        }
      },
      onError: (error) => console.log(error.message),
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <div className={cx('title-text')}>Mọi hoạt động gây quỹ đều có sự khởi đầu</div>
        </div>
        <div className={cx('subtitle')}>Cuộc hành trình của bạn bắt đầu từ đâu?</div>
      </div>
      <div onClick={handleClickStartCampaign} className={cx('option', 'crowdfunding')}>
        <div className={cx('option-title-and-subtitle')}>
          <div className={cx('t-h4--sansSerif')}>
            <span>Crowdfunding</span>
          </div>
          <div className={cx('t-body--sansSerif--lg', 'option-subtitle')}>
            <span>Khởi động chiến dịch của bạn và gây quỹ từ những người ủng hộ</span>
          </div>
        </div>
        <FaArrowRightLong className={cx('icon')} />
      </div>

      <div className={cx('section')}>
        <div className={cx('section-title')}>
          <div className={cx('title-text')}>Chúng tôi thay đổi cách ý tưởng của bạn trở thành hiện thực</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '72px' }}>
        <div className={cx('landing-page--campaign-card')}>
          <div className={cx('card-image-and-badge')}>
            <span className={cx('card-image-badge')}>Đồ dùng nâng cao hiệu suất</span>
            <img
              src="https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_404,g_center,q_auto:best,dpr_1.3,f_auto,h_404/loupedeck-live-s-pr-image-1_loybks"
              width="404"
              height="404"
              className={cx('card-image', 'card-image--desktop', 'imgCloudinary')}
            />
          </div>
          <div className={cx('card-title')}>Loupedeck Live S</div>
          <div className={cx('card-info')}>
            <div className={cx('card-info-raised')}>
              <span className={cx('amount')}>100,2 triệu</span>
              <span className={cx('description')}>Huy động</span>
            </div>
            <div className={cx('card-info-backers-count')}>
              <span className={cx('amount')}>1356</span>
              <span className={cx('description')}>Người đóng góp</span>
            </div>
            <div className={cx('card-info-funded')}>
              <span className={cx('amount')}>263%</span>
              <span className={cx('description')}>Tỉ lệ</span>
            </div>
          </div>
        </div>
        <div className={cx('landing-page--campaign-card')}>
          <div className={cx('card-image-and-badge')}>
            <span className={cx('card-image-badge')}>SỨC KHỎE & THỂ HÌNH</span>
            <img
              src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_404,g_center,q_auto:best,dpr_1.3,f_auto,h_404/kailo_2_oe5alr"
              width="404"
              height="404"
              className={cx('card-image', 'card-image--desktop', 'imgCloudinary')}
            />
          </div>
          <div className={cx('card-title')}>The Kailo Flex</div>
          <div className={cx('card-info')}>
            <div className={cx('card-info-raised')}>
              <span className={cx('amount')}>80 triệu</span>
              <span className={cx('description')}>Huy động</span>
            </div>
            <div className={cx('card-info-backers-count')}>
              <span className={cx('amount')}>1210</span>
              <span className={cx('description')}>Người đóng góp</span>
            </div>
            <div className={cx('card-info-funded')}>
              <span className={cx('amount')}>126%</span>
              <span className={cx('description')}>Tỉ lệ</span>
            </div>
          </div>
        </div>
        <div className={cx('landing-page--campaign-card')}>
          <div className={cx('card-image-and-badge')}>
            <span className={cx('card-image-badge')}>TABLETOP GAMES</span>
            <img
              src="https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_404,g_center,q_auto:best,dpr_1.3,f_auto,h_404/squareone-game-console_xubuau"
              width="404"
              height="404"
              className={cx('card-image', 'card-image--desktop', 'imgCloudinary')}
            />
          </div>
          <div className={cx('card-title')}>SquareOne Console</div>
          <div className={cx('card-info')}>
            <div className={cx('card-info-raised')}>
              <span className={cx('amount')}>136 triệu</span>
              <span className={cx('description')}>Huy động</span>
            </div>
            <div className={cx('card-info-backers-count')}>
              <span className={cx('amount')}>1598</span>
              <span className={cx('description')}>Người đóng góp</span>
            </div>
            <div className={cx('card-info-funded')}>
              <span className={cx('amount')}>201%</span>
              <span className={cx('description')}>Tỉ lệ</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('section')}>
        <div className={cx('section-title')}>
          <div className={cx('title-text')}>Tại sao lại là GIVE - FUN</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '96px', marginTop: '72px' }}>
        <div className={cx('why-item')}>
          <div className={cx('image')}>
            <img src={prepost} />
          </div>
          <div className={cx('title')}>
            <span>Công cụ trước và sau chiến dịch</span>
          </div>
          <div className={cx('description')}>
            <span>Một bộ công cụ và dịch vụ mạnh mẽ để tối đa hóa thành công cho chiến dịch của bạn.</span>
          </div>
        </div>
        <div className={cx('why-item')}>
          <div className={cx('image')}>
            <img src={indemand} />
          </div>
          <div className={cx('title')}>
            <span>Mở rộng chiến dịch của bạn với InDemand</span>
          </div>
          <div className={cx('description')}>
            <span>Tiếp tục gây quỹ sau khi chiến dịch của bạn kết thúc và nhận được khoản giải ngân hàng tháng.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrefixCampaign;

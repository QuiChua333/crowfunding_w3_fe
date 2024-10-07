import React from 'react';
import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';
import { logoTrangLon, logoTrangNho } from '~/assets/images';
const cx = classNames.bind(styles);

function AboutUs() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-header')}>
        <img src={logoTrangNho} alt="img" />
        <span className={cx('text-about-us')}>Về chúng tôi</span>
        <div className={cx('container-link')}>
          <a className={cx('back-home')} href="/">
            Trang chủ
          </a>
          <span>/</span>
          <a className={cx('back-us')} href="/about-us">
            Về chúng tôi
          </a>
        </div>
      </div>

      <div className={cx('container-body')}>
        <span className={cx('text-under-logo')}>
          Chào mừng đến với GiveFun - nền tảng hỗ trợ gây quỹ cộng đồng đa lĩnh vực !
        </span>
        <p className={cx('paragraph')}>
          GiveFun là một website đặc biệt thiết kế để kết nối và hỗ trợ cộng đồng thông qua việc tổ chức các chiến dịch
          gây quỹ đa dạng. Với sứ mệnh tạo ra sự kết nối mạnh mẽ giữa những người muốn chia sẻ và những người cần được
          hỗ trợ, GiveFun trở thành điểm đến lý tưởng cho những người có lòng nhân ái và mong muốn thay đổi tích cực
          trong xã hội.
        </p>
        <p className={cx('paragraph')}>
          Dù bạn là người muốn gây quỹ cho một dự án nghệ thuật sáng tạo, hỗ trợ tài chính cho người bệnh, hay đơn giản
          là muốn góp phần giúp đỡ cộng đồng xung quanh, GiveFun sẽ là nguồn động viên và sức mạnh để biến ý tưởng của
          bạn thành hiện thực. Chúng tôi cung cấp một giao diện dễ sử dụng, giúp bạn tạo ra chiến dịch gây quỹ chuyên
          nghiệp và thuận tiện.
        </p>
        <p className={cx('paragraph')}>
          Nền tảng của chúng tôi không chỉ là nơi để gây quỹ, mà còn là một cộng đồng nơi mọi người có thể tìm hiểu về
          những câu chuyện tuyệt vời và thành công của những chiến dịch đã được hỗ trợ. Bạn có thể tham gia vào cộng
          đồng này để chia sẻ trải nghiệm, tìm kiếm cộng sự, và cùng nhau tạo ra những thay đổi tích cực trong xã hội.
        </p>
        <p className={cx('paragraph')}>
          Hãy cùng chúng tôi biến những ước mơ thành hiện thực và tạo ra những khoảnh khắc GiveFun đáng nhớ!
        </p>
      </div>

      <div className={cx('btn-explore')}>
        <a href="/">KHÁM PHÁ NGAY</a>
      </div>

      <div style={{ marginTop: '20px' }} className={cx('container-header')}>
        <img style={{ width: '200px', height: '140px', marginBottom: '20px' }} src={logoTrangLon} alt="img" />
        <span style={{ fontSize: '20px', color: '#fff', fontWeight: 'bold' }}>
          CHÚNG TÔI MANG LẠI GIÁ TRỊ TÍCH CỰC CHO CỘNG ĐỒNG
        </span>
      </div>
    </div>
  );
}

export default AboutUs;

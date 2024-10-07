import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';

import styles from './SectionTrust.module.scss';
import { defaultAvt, logoTrangNho, paypal, phone } from '~/assets/images';

const cx = classNames.bind(styles);

function SectionTrust() {
  const [active, setActive] = useState(false);
  const [opacityH2, setOpacityH2] = useState(0);
  const [opacityTitle, setOpacityTitle] = useState(0);
  const [opacitySpan1, setOpacitySpan1] = useState(0);
  const [opacitySpan2, setOpacitySpan2] = useState(0);
  const [opacitySpan3, setOpacitySpan3] = useState(0);
  const element = useRef();
  const elementTitle = useRef();
  const elementSpan1 = useRef();

  useEffect(() => {
    const reveal = () => {
      if (element.current) {
        let windowHeight = window.innerHeight;
        let revealTop = element.current.getBoundingClientRect().top;
        let revealTopTitle = elementTitle.current.getBoundingClientRect().top;
        var revealPoint = 250;
        setActive(revealTop < windowHeight - revealPoint);
        let opacity = 1 - (revealTop - 160) / (windowHeight - revealPoint) + 0.4;
        let opacity2 = 1 - (revealTop < 0 ? Math.abs(revealTop) : revealTop - 20) / (windowHeight - revealPoint) + 0.4;
        let opacity3 = 1 - (revealTop < 0 ? Math.abs(revealTop) : revealTop + 100) / (windowHeight - revealPoint) + 0.4;
        let opacity4 = 1 - (revealTop < 0 ? Math.abs(revealTop) : revealTop + 180) / (windowHeight - revealPoint) + 0.4;
        let opacity5 = 1 - (revealTop < 0 ? Math.abs(revealTop) : revealTop + 260) / (windowHeight - revealPoint) + 0.7;
        setOpacityH2(opacity);
        setOpacityTitle(opacity2);
        setOpacitySpan1(opacity3);
        setOpacitySpan2(opacity4);
        setOpacitySpan3(opacity5);
      }
    };
    window.addEventListener('scroll', reveal);

    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, [active]);

  return (
    <div className={cx('wrapper', { active: active })} ref={element}>
      <div className={cx('content')}>
        <img style={{ width: '140px', height: '120px' }} src={logoTrangNho} alt="img"></img>
        <h1 style={{ opacity: `${opacityH2}`, transition: 'all 0.2s ease', alignItems: 'center' }}>
          Tin cậy & An toàn
        </h1>
        <p
          className={cx('title')}
          ref={elementTitle}
          style={{ opacity: `${opacityTitle}`, transition: 'all 0.2s ease' }}
        ></p>
        <p className={cx('body')}>
          <span
            ref={elementSpan1}
            style={{
              opacity: `${opacitySpan1}`,
              transition: 'all 0.2s ease',
              marginTop: '30px',
              display: 'block',
              textAlign: 'center',
            }}
          >
            Với đội ngũ toàn cầu tận tâm vì sự tin cậy và an toàn, chúng tôi đã quản lý thành công các hoạt động gây quỹ
            trên toàn thế giới trong hơn một thập kỷ. Đừng lo lắng về bất cứ điều gì, chúng tôi sẽ giúp bạn có những
            chiến dịch gây quỹ an toàn, thành công và đáp ứng được mọi nhu cầu của bạn trên tất cả các lĩnh vực đời sống
            xã hội.
          </span>
          <span style={{ opacity: `${opacitySpan2}`, transition: 'all 0.2s ease' }}></span>
          <span style={{ opacity: `${opacitySpan3}`, transition: 'all 0.2s ease' }}></span>
        </p>
      </div>
    </div>
  );
}

export default SectionTrust;

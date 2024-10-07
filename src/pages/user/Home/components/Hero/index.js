import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.scss';
import ScrollReveal from 'scrollreveal';

const cx = classNames.bind(styles);

function Section() {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  useEffect(() => {
    const config1 = {
      origin: 'top',
      distance: '65px',
      duration: 2600,
      delay: 450,
      reset: true,
    };
    const config2 = {
      origin: 'right',
      distance: '150px',
      duration: 2600,
      delay: 150,
      reset: true,
    };
    ScrollReveal().reveal(box1Ref.current, config1);
    ScrollReveal().reveal(box2Ref.current, config2);
  }, []);

  return (
    <section className={cx('wrapper')}>
      <div className={cx('content')} ref={box1Ref}>
        <h5>#2 Trending</h5>
        <h4>Website hỗ trợ gây quỹ cộng đồng</h4>
        <h1>GIVE - FUN</h1>
        <p>
          Tham gia cùng chúng tôi để hiện thực hóa một thế giới tốt đẹp hơn, <br /> đồng thời bạn cũng có thể nhận lại
          được những lợi ích từ các dự án của GiveFun!!
        </p>
      </div>

      <div ref={box2Ref}>
        <img
          src="https://purepng.com/public/uploads/thumbnail//purepng.com-paper-planepaper-planeaeroplanepaper-gliderpaper-dartaircraftfolded-paperpaperboardclipart-1421526589499uaw0v.png"
          className={cx('image-section')}
          alt="Section Image"
        />
      </div>
    </section>
  );
}

export default Section;

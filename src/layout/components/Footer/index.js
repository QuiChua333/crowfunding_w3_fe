import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { MdEmail } from 'react-icons/md';
import { FaSquareFacebook } from 'react-icons/fa6';
import { BsYoutube } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaSpotify } from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('layout-1')}>
                <div className={cx('layout-1-left')}>
                    <div className={cx('item-layout-1')}>
                        <span className={cx('title')}>KHÁM PHÁ</span>
                        <div className={cx('container-content')}>
                            <span>Chúng ta làm những gì?</span>
                            <span>Việc gây quỹ</span>
                            <span>Đóng góp</span>
                        </div>
                    </div>

                    <div className={cx('item-layout-1')}>
                        <span className={cx('title')}>VỀ CHÚNG TÔI</span>
                        <div className={cx('container-content')}>
                            <span>Thông tin chung</span>
                            <span>Tin cậy & An toàn</span>
                            <span>Hỗ trợ & Giúp đỡ</span>
                            <span>Liên hệ</span>
                            <span>Nghề nghiệp</span>
                            <span>Chính sách</span>
                        </div>
                    </div>

                    <div className={cx('item-layout-1')}>
                        <span className={cx('title')}>DOANH NGHIỆP</span>
                        <div className={cx('container-content')}>
                            <span>Hoạt động như thế nào ?</span>
                            <span>Trung tâm giáo dục</span>
                            <span>Danh mục chuyên gia</span>
                            <span>Những khoản phí</span>
                            <span>Những đối tác</span>
                        </div>
                    </div>
                </div>

                <div className={cx('layout-1-right')}>
                    <MdEmail className={cx('icon-mail')}/>
                    <b>Tìm nó đầu tiên trên GIVEFUN</b>
                    <span>Khám phá những sản phẩm mới và thông minh trong bản tin GIVEFUN</span>
                    <div className={cx('btn-signup')}>
                        <a href='/' style={{color: '#fff'}}>KHÁM PHÁ</a>
                    </div>
                    <a className={cx('contact')} href='mailto: 21620417@gm.uit.edu.vn'>@GiveFun Support</a>
                </div>
            </div>

            <div className={cx('layout-2')}>
                <div style={{display: 'flex', height: '40px'}}>
                    <FaSquareFacebook className={cx('icon-contact')}/>
                    <BsYoutube className={cx('icon-contact')}/>
                    <RiInstagramFill className={cx('icon-contact')}/>
                    <IoLogoLinkedin className={cx('icon-contact')}/>
                    <FaSpotify className={cx('icon-contact')}/>
                    <FaTwitter className={cx('icon-contact')}/>
                </div>
                <div className={cx('separate')}></div>
                <div className={cx('container-text')}>
                    <span>Điều khoản sử dụng</span>
                    <span>Chính sách cá nhân</span>
                    <span>Chính sách Cookie</span>
                    <span>Chúng tôi luôn đảm bảo bảo mật thông tin của bạn</span>
                    <span>Khả năng tiếp cận</span>
                    <span>&copy; 2023 GiveFun, Inc. All Right Reserved</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

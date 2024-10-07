import classNames from "classnames/bind";
import styles from './CustomMessageBox.module.scss'
import { useDispatch } from "react-redux";
import { setMessageBox } from "~/redux/slides/GlobalApp";
const cx = classNames.bind(styles)
function CustomMessageBox({title, content, contentCancel, contentOK}) {
    const dispatch = useDispatch();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h3 className={cx('title')}>{title}</h3>
                <p>{content}</p>
                <div className={cx('section-button')}>
                    {
                        contentCancel &&
                        <a onClick={() => dispatch(setMessageBox({result: false, isShow: false}))} className={cx('btn', 'btn-cancel')}>{contentCancel}</a>
                    }
                    {
                        contentOK &&
                        <a  onClick={() => dispatch(setMessageBox({result: true, isShow: false}))} className={cx('btn', 'btn-ok')}>{contentOK}</a>
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomMessageBox;
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './CampaignTableSkeleton.module.scss'
const cx = classNames.bind(styles)

function CampaignTableSkeleton({ rows }) {
    return (
        <SkeletonTheme >
            <div className={cx('wrapper')}>
                {
                    [...Array(rows)].map((item, index) => {
                        return <div key={index} className={cx('row')}>
                            <div className={cx('col1')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col2')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col3')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col4')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col5')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col6')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col7')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                            <div className={cx('col8')}>
                                <Skeleton style={{height: '44px'}}/>
                            </div>
                        </div>
                    })
                }
            </div>
        </SkeletonTheme>
    );
}

export default CampaignTableSkeleton;
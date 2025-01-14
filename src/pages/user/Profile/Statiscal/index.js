import React from 'react'
import styles from '../Profile.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { MdAddchart } from "react-icons/md";
import ItemStatiscal from './ItemStatiscal';
import DropDown from './Dropdown';
import { BarChart } from '@mui/x-charts/BarChart';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
const cx = classNames.bind(styles);

const itemsFilterYearCampaign = [
  {
    label: "Tất cả",
    value: 'All'
  },
  {
    label: "Năm 2024",
    value: '2024'
  },
  {
    label: "Năm 2025",
    value: '2025'
  }
]
const itemsFilterMonthCampaign = [
  {
    label: "Tất cả",
    value: 'All'
  },
  {
    label: "Tháng 1",
    value: '1'
  },
  {
    label: "Tháng 2",
    value: '2'
  },
  {
    label: "Tháng 3",
    value: '3'
  },
  {
    label: "Tháng 4",
    value: '4'
  },
  {
    label: "Tháng 5",
    value: '5'
  },
  {
    label: "Tháng 6",
    value: '6'
  },
  {
    label: "Tháng 7",
    value: '7'
  },
  {
    label: "Tháng 8",
    value: '8'
  },
  {
    label: "Tháng 9",
    value: '9'
  },
  {
    label: "Tháng 10",
    value: '10'
  },
  {
    label: "Tháng 11",
    value: '11'
  },
  {
    label: "Tháng 12",
    value: '12'
  },
]

const Statiscal = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user.currentUser);
    const handleSelectedMonthCampaign = (month) => {
      console.log(month);
    }
    const handleSelectedYearCampaign = (year) => {
      console.log(year);
    }

    const handleSelectedMonthHistory = (month) => {
      console.log(month);
    }
    const handleSelectedYearHistory = (year) => {
      console.log(year);
    }
    
  return (
    <div className={cx('wrapper')}>
        <div className={cx('navbar')}>
            <Link to={`/individuals/${id}/profile`} className={cx('nav-item')}>
              <MdOutlineRemoveRedEye style={{ fontSize: '24px', marginRight: '8px' }} />
              <span>Xem hồ sơ</span>
            </Link>
            <Link to={`/individuals/${id}/edit/profile`} className={cx('nav-item')}>
              <FaRegEdit style={{ fontSize: '24px', marginRight: '8px' }} />
              <span>Chỉnh sửa hồ sơ & Cài đặt</span>
            </Link>
            <Link to={`/individuals/${id}/statistic`} className={cx('nav-item', 'active')}>
              <MdAddchart  style={{ fontSize: '24px', marginRight: '8px' }} />
              <span>Thống kê</span>
            </Link>
          </div>
    
          <div className={cx('body')}>
            <div className={cx('content flex flex-col')}>
              <div className='flex flex-col gap-10'>
                <span className='font-semibold'>Thông tin chiến dịch của bạn:</span>
                <div className='grid grid-cols-4 gap-10'>
                  <ItemStatiscal label="Tổng số chiến dịch" value={10} className='border-[#089978] text-[#089978]'/>
                  <ItemStatiscal label="Đang gây quỹ" value={5} className='border-blue-500 text-blue-500'/>
                  <ItemStatiscal label="Thành công" value={4} className='border-[#27b55b] text-[#27b55b]'/>
                  <ItemStatiscal label="Thất bại" value={1} className='border-[#f23a3a] text-[#f23a3a]'/>
                </div>
              </div>

              <hr className='mt-14 mb-5'/>
              <div className='flex flex-col gap-10'>
                <div className='flex items-center justify-between'>
                  <span className='font-semibold'>Thống kê chiến dịch của bạn:</span>
                  <div className='flex items-center gap-10'>
                    <div className='flex flex-col gap-5'>
                      <span className='font-medium'>Theo tháng</span>
                      <DropDown items={itemsFilterMonthCampaign} onSelected={handleSelectedMonthCampaign}/>
                    </div>
                    <div className='flex flex-col gap-5'>
                      <span className='font-medium'>Theo năm</span>
                      <DropDown items={itemsFilterYearCampaign} onSelected={handleSelectedYearCampaign}/>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between z-20 gap-10'>
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                        innerRadius: 60,
                        data: [
                          { id: 0, value: 10, label: 'Đã phát hành' },
                          { id: 1, value: 8, label: 'Thành công' },
                          { id: 2, value: 2, label: 'Thất bại' },
                        ],
                      },
                    ]}
                    colors={["blue", "green", "#e82840"]}
                    width={600}
                    height={400}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                        fontSize: '30px'
                      },             
                    }}
                  />

                  <BarChart
                    className='z-10 gap-10'
                    xAxis={[{ scaleType: 'band', data: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'] }]}
                    series={
                      [
                        { data: [4, 3, 5, 2], label: "Đã phát hành" }, 
                        { data: [1, 6, 3, 1], label: "Thành công" }, 
                        { data: [2, 5, 6, 1], label: "Thất bại" }, 
                      ]
                    }
                    layout='vertical'
                    colors={["blue", "green", "#e82840"]}
                    height={400}
                  />
                </div>
              </div>

              <hr className='my-10'/>
              <div className='flex flex-col gap-10'>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Lịch sử giao dịch của bạn:</span>
                  <div className='flex items-center gap-10'>
                    <div className='flex flex-col gap-5'>
                      <span className='font-medium'>Theo tháng</span>
                      <DropDown items={itemsFilterMonthCampaign} onSelected={handleSelectedMonthHistory}/>
                    </div>
                    <div className='flex flex-col gap-5'>
                      <span className='font-medium'>Theo năm</span>
                      <DropDown items={itemsFilterYearCampaign} onSelected={handleSelectedYearHistory}/>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-between gap-10'>
                  <div className='flex justify-evenly items-center italic'>
                    <span>Tổng số dự án tham gia đóng góp: <b>14 chiến dịch</b></span>
                    <span>Tổng tiền đóng góp: <b>23.762.000 VND</b></span>
                    <span>Tổng tiền được giải ngân: <b>14.462.000 VND</b></span>
                  </div>
                  <LineChart
                    xAxis={[{ scaleType: 'band', data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']  }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
                        valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                      },
                      {
                        data: [4, 8.5, 3, 2.5, 6.5, 5, 2, 7.5, 6, 1, 1.5, 9],
                        valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                      },
                    ]}
                    height={400}
                    margin={{ top: 40, bottom: 20 }}
                  />
                </div>
              </div>
              
            </div>
          </div>
    </div>
  )
}

export default Statiscal
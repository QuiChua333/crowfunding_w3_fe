import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { MdAddchart } from 'react-icons/md';
import ItemStatiscal from './ItemStatiscal';
import DropDown from './Dropdown';
import { BarChart } from '@mui/x-charts/BarChart';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { setTabAdmin } from '~/redux/slides/Admin';
import Filter from '../components/Filter';
import {
  useGetStatisticCampaignByTimeOfCurrentUserQuery,
  useGetStatisticMoneyByTimeOfCurrentUserQuery,
  useGetStatisticTotalCampaignOfCurrentUserQuery,
} from '~/hooks/api/queries/user/statistic.query';
import { formatMoney } from '~/utils';
import {
  useGetStatisticCampaignByTimeAdminQuery,
  useGetStatisticMoneyByTimeAdminQuery,
  useGetStatisticTotalCampaignAdminQuery,
} from '~/hooks/api/queries/admin/admin.statistic.query';

const StatiscalAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setTabAdmin({
        number: 5,
        content: 'Thống kê',
      }),
    );
  }, []);
  const [filterTimeCampaign, setFilterTimeCampaign] = useState(() => {
    const now = new Date();
    const quarter = Math.ceil((now.getMonth() + 1) / 4);
    return {
      quarter,
      year: now.getFullYear(),
    };
  });
  const [filterTimeMoney, setFilterTimeMoney] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
    };
  });
  const { data: dataTotalCampaignAdmin } = useGetStatisticTotalCampaignAdminQuery();
  const { data: dataCampaignByTime } = useGetStatisticCampaignByTimeAdminQuery(filterTimeCampaign);
  const { data: dataMoneyByTime, isLoading } = useGetStatisticMoneyByTimeAdminQuery(filterTimeMoney);

  const [itemsFilterYearCampaign, setItemsFilterYearCampaign] = useState([2025, 2024]);
  const [itemsFilterQuarterCampaign, setItemsFilterQuarterCampaign] = useState([1, 2, 3]);
  const [initMoneyData, setInitMoneyData] = useState(Array(12).fill(0));
  const [monthsInQuarter, setMonthsInQuarter] = useState({
    1: [1, 2, 3, 4],
    2: [5, 6, 7, 8],
    3: [9, 10, 11, 12],
  });

  const handleSelectedQuarterCampaign = (quarter) => {
    setFilterTimeCampaign((prev) => ({
      ...prev,
      quarter: Number(quarter.split(' ')[1]),
    }));
  };
  const handleSelectedYearCampaign = (year) => {
    setFilterTimeCampaign((prev) => ({
      ...prev,
      year: Number(year.split(' ')[1]),
    }));
  };
  const handleSelectedYearMoney = (year) => {
    setFilterTimeMoney((prev) => ({
      ...prev,
      year: Number(year.split(' ')[1]),
    }));
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10">
        <span className="font-semibold">Các chiến dịch đã kết thúc:</span>
        <div className="grid grid-cols-4 gap-10">
          <ItemStatiscal
            label="Tổng số chiến dịch"
            value={dataTotalCampaignAdmin?.total}
            className="border-[#e51075] text-[#e51075]"
          />

          <ItemStatiscal
            label="Thành công"
            value={dataTotalCampaignAdmin?.success}
            className="border-[#34ca96] text-[#34ca96]"
          />
          <ItemStatiscal
            label="Thất bại"
            value={dataTotalCampaignAdmin?.failed}
            className="border-[#e9895a] text-[#e9895a]"
          />
        </div>
      </div>

      <hr className="mt-14 mb-5" />
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Biểu đồ:</span>
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-5">
              <span className="font-medium">Theo tháng</span>
              <Filter
                listConditions={itemsFilterQuarterCampaign.map((item) => `Quý ${item}`)}
                handleClickItem={handleSelectedQuarterCampaign}
                valueShow={`Quý ${filterTimeCampaign.quarter}`}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-medium">Theo năm</span>
              <Filter
                listConditions={itemsFilterYearCampaign.map((item) => `Năm ${item}`)}
                handleClickItem={handleSelectedYearCampaign}
                valueShow={`Năm ${filterTimeCampaign.year}`}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between z-20 gap-10">
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',
                innerRadius: 60,
                data: [
                  {
                    id: 0,
                    value: dataCampaignByTime?.published?.reduce((acc, cur) => acc + cur) || 0,
                    label: 'Đã phát hành',
                  },
                  {
                    id: 1,
                    value: dataCampaignByTime?.success?.reduce((acc, cur) => acc + cur) || 0,
                    label: 'Thành công',
                  },
                  {
                    id: 2,
                    value: dataCampaignByTime?.failed?.reduce((acc, cur) => acc + cur) || 0,
                    label: 'Thất bại',
                  },
                ],
              },
            ]}
            colors={['blue', 'green', '#e82840']}
            width={600}
            height={400}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
                fontSize: '30px',
              },
            }}
          />

          <BarChart
            className="z-10 gap-10"
            xAxis={[
              {
                scaleType: 'band',
                data: monthsInQuarter[filterTimeCampaign.quarter].map((item) => `Tháng ${item}`),
              },
            ]}
            series={[
              { data: dataCampaignByTime?.published || [1, 2, 3, 4], label: 'Đã phát hành' },
              { data: dataCampaignByTime?.success || [1, 2, 3, 4], label: 'Thành công' },
              { data: dataCampaignByTime?.failed || [1, 2, 3, 4], label: 'Thất bại' },
            ]}
            layout="vertical"
            colors={['blue', 'green', '#e82840']}
            height={400}
          />
        </div>
      </div>

      <hr className="my-10" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Thống kê nguồn tiền:</span>
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-5">
              <span className="font-medium">Theo năm</span>
              <Filter
                listConditions={itemsFilterYearCampaign.map((item) => `Năm ${item}`)}
                handleClickItem={handleSelectedYearMoney}
                valueShow={`Năm ${filterTimeMoney.year}`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div className="flex justify-evenly items-center italic">
            <div className="flex flex-col">
              <span>Tổng tiền người dùng đóng góp:</span>{' '}
              <b>{formatMoney(dataMoneyByTime?.sumReceivedFromOthers || 0)} VND</b>
            </div>
            <div className="flex flex-col">
              <span>Tổng tiền được nhận từ dự án:</span>{' '}
              <b>{formatMoney(dataMoneyByTime?.sumProjectEarnings || 0)} VND</b>
            </div>
            <div className="flex flex-col">
              <span>Tổng tiền hoàn trả cho người dùng:</span>{' '}
              <b>{formatMoney(dataMoneyByTime?.sumRefunded || 0)} VND</b>
            </div>
          </div>
          <LineChart
            xAxis={[
              {
                scaleType: 'band',
                data: [
                  'Tháng 1',
                  'Tháng 2',
                  'Tháng 3',
                  'Tháng 4',
                  'Tháng 5',
                  'Tháng 6',
                  'Tháng 7',
                  'Tháng 8',
                  'Tháng 9',
                  'Tháng 10',
                  'Tháng 11',
                  'Tháng 12',
                ],
              },
            ]}
            yAxis={[
              {
                valueFormatter: (value) => `${value / 1_000_000}`, // Định dạng thành triệu đồng
              },
            ]}
            series={[
              {
                data: dataMoneyByTime?.receivedFromOthers || initMoneyData,
                label: 'Tiền người dùng đóng góp',
                valueFormatter: (value) => (value == null ? 'NaN' : `${(value / 1_000_000).toFixed(2)} triệu đồng`),
              },
              {
                data: dataMoneyByTime?.projectEarnings || initMoneyData,
                label: 'Tiền nhận được từ dự án',

                valueFormatter: (value) => (value == null ? 'NaN' : `${(value / 1_000_000).toFixed(2)} triệu đồng`),
              },
              {
                data: dataMoneyByTime?.refunded || initMoneyData,
                label: 'Tiền hoàn trả cho người dùng',

                valueFormatter: (value) => (value == null ? 'NaN' : `${(value / 1_000_000).toFixed(2)} triệu đồng`),
              },
            ]}
            height={400}
            margin={{ top: 40, bottom: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatiscalAdmin;

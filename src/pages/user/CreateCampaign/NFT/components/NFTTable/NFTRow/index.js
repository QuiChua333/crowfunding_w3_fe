import classNames from 'classnames/bind';

import styles from '../NFTTable.module.scss';
import { PiDotsThreeBold } from 'react-icons/pi';
import DropDown from '../DropDown';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slides/GlobalApp';
import axios from 'axios';
import baseURL from '~/utils/baseURL';
import { convertDateFromString } from '~/utils';
import { useEditPerkMutation } from '~/hooks/api/mutations/user/perk.mutation';
import { toast } from 'react-toastify';
import { IoCheckboxSharp } from 'react-icons/io5';
const cx = classNames.bind(styles);
function NFTRow({ index, nft, getNFTsByCampaignId, isEditComponent }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const docElement = useRef(null);
  const navigate = useNavigate();

  const handleClickPerk = () => {
    navigate(`/campaigns/${id}/edit/nfts/${nft.id}`);
  };

  return (
    <tr onClick={handleClickPerk}>
      <td className={cx('image')}>
        <img src={nft.image} />
      </td>
      <td className={cx('name')}>{nft.name}</td>
      <td className={cx('symbol')}>{nft.symbol}</td>
      <td className={cx('quantity')}>{nft.supply}</td>
      <td className={cx('sold')}>{nft.claimed ?? 0 + '/' + nft.supply}</td>
      <td className={cx('price')}>{`${nft.ethPrice} ETH`}</td>
    </tr>
  );
}

export default NFTRow;

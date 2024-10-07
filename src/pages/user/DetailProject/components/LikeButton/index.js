import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <span style={{ cursor: 'pointer' }} onClick={handleUnLike}>
          <FaHeart style={{ color: 'red' }} />
        </span>
      ) : (
        <span style={{ cursor: 'pointer' }} onClick={handleLike}>
          <FaRegHeart />
        </span>
      )}
    </>
  );
};

export default LikeButton;

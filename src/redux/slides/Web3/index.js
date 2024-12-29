import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { factoryAbi } from '~/services/web3/abi/factoryAbi';

export let factoryContract;

const initialState = {
  account: null,
  isLoading: false,
  error: null,
  balance: null,
};

// Async action để kết nối MetaMask
export const connectMetaMask = createAsyncThunk('metamask/connect', async (_, { getState, rejectWithValue }) => {
  try {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Vui lòng cài đặt tiện ích ví Metamask cho trình duyệt');
    }

    // Provider và yêu cầu tài khoản
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    // Lấy signer và tài khoản hiện tại
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    const balanceWei = await provider.getBalance(account);
    // const balance = ethers.formatEther(balanceWei);
    const balance = balanceWei;

    // Lấy trạng thái slice hiện tại
    // const state = getState().metamask;
    console.log(process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS);
    factoryContract = new ethers.Contract(process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS, factoryAbi, signer);

    return { account, balance: ethers.formatEther(balance) };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchBalance = createAsyncThunk('metamask/fetchBalance', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState().metamask;
    if (!state.signer) throw new Error('Signer not initialized');

    // Lấy số dư bằng signer
    const balance = await state.signer.getBalance();
    return ethers.formatEther(balance); // Chuyển đổi từ wei sang ETH
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const metamaskSlice = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    resetMetaMask: (state) => {
      state.account = null;
      state.balance = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectMetaMask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connectMetaMask.fulfilled, (state, action) => {
        state.account = action.payload.account;
        state.balance = action.payload.balance;
        state.isLoading = false;
      })
      .addCase(connectMetaMask.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setContractABI, resetMetaMask } = metamaskSlice.actions;
export default metamaskSlice.reducer;

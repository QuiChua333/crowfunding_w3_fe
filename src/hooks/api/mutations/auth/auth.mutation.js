import { useMutation } from '@tanstack/react-query';
import {
  loginGoogle,
  logOut,
  register,
  resendEmailConfirm,
  resetPassword,
  submitEmailForgotPassword,
  submitLogin,
} from '~/api/auth/auth.api';

// handleAPI
export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['useRegisterMutation'],
    mutationFn: register,
  });
};

// handleAPI
export const useSubmitEmailForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitEmailForgotPasswordMutation'],
    mutationFn: submitEmailForgotPassword,
  });
};

// handleAPI
export const useSubmitLoginMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitLoginMutation'],
    mutationFn: submitLogin,
  });
};

// handleAPI
export const useSubmitResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitResetPasswordMutation'],
    mutationFn: resetPassword,
  });
};

// handleAPI
export const useResendEmailConfirmMutation = () => {
  return useMutation({
    mutationKey: ['useResendEmailConfirmMutation'],
    mutationFn: resendEmailConfirm,
  });
};

// handleAPI
export const useLogOutMutation = () => {
  return useMutation({
    mutationKey: ['useLogOutMutation'],
    mutationFn: logOut,
  });
};

// handleAPI
export const useLoginGoogleMutation = () => {
  return useMutation({
    mutationKey: ['useLoginGoogle'],
    mutationFn: loginGoogle,
  });
};

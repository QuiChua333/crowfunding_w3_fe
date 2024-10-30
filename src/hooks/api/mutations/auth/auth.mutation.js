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

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['useRegisterMutation'],
    mutationFn: register,
  });
};

export const useSubmitEmailForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitEmailForgotPasswordMutation'],
    mutationFn: submitEmailForgotPassword,
  });
};

export const useSubmitLoginMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitLoginMutation'],
    mutationFn: submitLogin,
  });
};

export const useSubmitResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ['useSubmitResetPasswordMutation'],
    mutationFn: resetPassword,
  });
};

export const useResendEmailConfirmMutation = () => {
  return useMutation({
    mutationKey: ['useResendEmailConfirmMutation'],
    mutationFn: resendEmailConfirm,
  });
};

export const useLogOutMutation = () => {
  return useMutation({
    mutationKey: ['useLogOutMutation'],
    mutationFn: logOut,
  });
};

export const useLoginGoogleMutation = () => {
  return useMutation({
    mutationKey: ['useLoginGoogle'],
    mutationFn: loginGoogle,
  });
};

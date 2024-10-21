import { useMutation } from '@tanstack/react-query';
import { register, submitEmailForgotPassword, submitLogin, submitResetPassword } from '~/api/auth/auth.api';

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
    mutationFn: submitResetPassword,
  });
};

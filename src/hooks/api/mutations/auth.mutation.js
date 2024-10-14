import { useMutation } from '@tanstack/react-query';
import { register } from '~/api/auth.api';

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['useRegisterMutation'],
    mutationFn: register,
  });
};

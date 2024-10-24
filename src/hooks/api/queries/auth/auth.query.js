import { useQuery } from '@tanstack/react-query';
import { verifyEmailUrl, verifyUrl } from '~/api/auth/auth.api';

export const useVerifyEmailUrl = (url) => {
  return useQuery({
    queryKey: [`verifyEmailUrl`],
    queryFn: () => verifyEmailUrl(url),
    refetchOnWindowFocus: false,
  });
};

export const useVerifyUrl = (url) => {
  return useQuery({
    queryKey: [`verifyUrl`],
    queryFn: () => verifyUrl(url),
    refetchOnWindowFocus: false,
  });
};

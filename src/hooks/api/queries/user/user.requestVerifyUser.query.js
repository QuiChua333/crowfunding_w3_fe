import { useQuery } from '@tanstack/react-query';
import { checkLink } from '~/api/user/user.requestVerifyUser.api';

export const useCheckLinkUserQuery = (tokenLinkVerifyUser) => {
  return useQuery({
    queryKey: [`checkLink`],
    queryFn: () => checkLink(tokenLinkVerifyUser),
  });
};

export default useCheckLinkUserQuery;

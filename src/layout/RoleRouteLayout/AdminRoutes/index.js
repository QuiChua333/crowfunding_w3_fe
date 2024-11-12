import { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomAxios } from '~/config';
import { useCheckAdminMutation } from '~/hooks/api/mutations/admin/admin.user.mutation';
import { baseUrl } from '~/utils';
function AdminRoutes() {
  const [isAdmin, setAdmin] = useState(false);
  const checkAdminMutation = useCheckAdminMutation();
  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem('accessToken') || false;
      if (!token) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      } else {
        const res = await CustomAxios.get(`${baseUrl}/user/checkAdmin`);
        if (!res.data.data) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        setAdmin(true);
      }
    } catch (error) {}
  };
  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken') || false;
    if (!token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    } else {
      checkAdminMutation.mutate(null, {
        onSuccess() {
          setAdmin(true);
        },
        onError() {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        },
      });
    }
  }, []);
  return <>{isAdmin && <Outlet />}</>;
}

export default AdminRoutes;

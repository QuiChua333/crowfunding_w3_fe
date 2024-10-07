import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';
function AdminRoutes() {
  const [isAdmin, setAdmin] = useState(false);
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
  useEffect(() => {
    checkAdmin();
  }, []);
  return <>{isAdmin && <Outlet />}</>;
}

export default AdminRoutes;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AdminHeader, AdminSidebar } from '~/layout/AdminLayout/components';
import { Footer } from '~/layout/components';
function AdminLayout({ children }) {
  const tabAdmin = useSelector((state) => state.admin.tabAdmin);
  return (
    <div>
      <div className="Container" style={{ display: 'flex' }}>
        <div>
          <AdminSidebar />
        </div>
        <div style={{ flex: '1', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title={tabAdmin.content} />
          <div className="content" style={{ padding: '30px 50px 30px 50px', flex: '1' }}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

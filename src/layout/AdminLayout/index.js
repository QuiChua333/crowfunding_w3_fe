import { useState } from 'react';
import { AdminHeader, AdminSidebar } from '~/layout/AdminLayout/components';
import { Footer } from '~/layout/components';
function AdminLayout({ children }) {
  const [title, setTitle] = useState('Quản lý dự án');
  return (
    <div>
      <div className="Container" style={{ display: 'flex' }}>
        <div>
          <AdminSidebar setTitle={setTitle} />
        </div>
        <div style={{ flex: '1', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AdminHeader title={title} />
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

import { Footer, Header } from '../components';

function NormalLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default NormalLayout;

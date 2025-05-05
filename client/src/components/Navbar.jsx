import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <nav style={navStyle}>
      <div style={leftSideStyle}>
        <Link to="/home" style={linkStyle}>Головна</Link>
        <Link to="/catalog" style={linkStyle}>Каталог</Link>
        <Link to="/saved" style={linkStyle}>Збережені</Link>
      </div>
      <div style={rightSideStyle}>
        {user.role === 'admin' && (
          <span style={adminTextStyle}>Вітаю, адміністраторе!</span>
        )}
        <Link to="/profile" style={linkStyle}>Профіль</Link>
        <button onClick={logout} style={logoutButtonStyle}>Вийти</button>
      </div>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  borderBottom: '1px solid #ccc',
  alignItems: 'center'
};

const leftSideStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center'
};

const rightSideStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold'
};

const logoutButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '6px',
  transition: 'background-color 0.3s',
};

const adminTextStyle = {
  fontWeight: 'bold',
  color: '#28a745',
  marginRight: '10px'
};

export default Navbar;

import { Link } from 'react-router-dom';
import { Home, Phone, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <Home size={28} color="#2563eb" />
          <span style={styles.logoText}>Amoj Crest Property</span>
        </Link>

        <div style={isOpen ? styles.mobileMenu : styles.desktopMenu}>
          <Link to="/" style={styles.link}>Home</Link>
          <a href="#properties" style={styles.link}>Properties</a>
          <a href="#services" style={styles.link}>Services</a>
          <a href="#about" style={styles.link}>About</a>
          <a href="#contact" style={styles.link}>Contact</a>
          <Link to="/admin/login" style={styles.adminLink}>Admin</Link>
        </div>

        <button style={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '1rem 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: '#1e293b'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2563eb'
  },
  desktopMenu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    gap: '1rem'
  },
  link: {
    textDecoration: 'none',
    color: '#64748b',
    fontWeight: '500',
    transition: 'color 0.3s',
    ':hover': {
      color: '#2563eb'
    }
  },
  adminLink: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#1d4ed8'
    }
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b'
  }
};

export default Navbar;

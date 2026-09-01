import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For demo purposes, allow login without Firebase
      // In production, uncomment the Firebase login
      // await signInWithEmailAndPassword(auth, email, password);
      
      // Demo login - accept any non-empty credentials
      if (email && password) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Please enter email and password');
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          
          <div style={styles.inputGroup}>
            <Mail size={20} color="#64748b" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <Lock size={20} color="#64748b" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={styles.demoNote}>
          <p>Demo: Enter any email and password to login</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: '2rem'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    maxWidth: '450px',
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    gap: '0.75rem',
    border: '1px solid #e2e8f0'
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    width: '100%',
    backgroundColor: 'transparent',
    color: '#1e293b'
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed'
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.875rem'
  },
  demoNote: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#92400e'
  }
};

export default AdminLogin;

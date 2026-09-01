import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Trash2, Edit, LogOut, DollarSign, MapPin, Image as ImageIcon } from 'lucide-react';
import { addProperty, getProperties, deleteProperty, uploadImage } from '../firebase';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: null,
    imageUrl: ''
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const props = await getProperties();
      setProperties(props);
    } catch (error) {
      console.error('Error loading properties:', error);
      // Demo data
      setProperties([
        {
          id: '1',
          title: 'Luxury 4 Bedroom Duplex',
          location: 'Lekki Phase 1, Lagos',
          price: 85000000,
          type: 'sale',
          bedrooms: 4,
          bathrooms: 5,
          area: 450,
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
          description: 'Stunning duplex in prime Lekki location'
        }
      ]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.imageUrl;
      
      // Upload image if new one selected
      if (formData.image && typeof formData.image !== 'string') {
        const path = `properties/${Date.now()}_${formData.image.name}`;
        imageUrl = await uploadImage(formData.image, path);
      }

      const propertyData = {
        title: formData.title,
        location: formData.location,
        price: parseFloat(formData.price),
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area: parseInt(formData.area) || 0,
        description: formData.description,
        image: imageUrl,
        createdAt: new Date().toISOString()
      };

      if (editingId) {
        // Update existing property
        console.log('Update property:', editingId, propertyData);
      } else {
        // Add new property
        await addProperty(propertyData);
      }

      // Reload properties
      loadProperties();
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Check Firebase configuration.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        loadProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property');
      }
    }
  };

  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description || '',
      image: property.image,
      imageUrl: property.image
    });
    setEditingId(property.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'sale',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      image: null,
      imageUrl: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <Home size={24} color="#2563eb" />
          <span>Amoj Crest Admin</span>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <LogOut size={20} /> Logout
        </button>
      </nav>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1>Property Management</h1>
          <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
            <Plus size={20} /> {showForm ? 'Cancel' : 'Add Property'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2>{editingId ? 'Edit Property' : 'Add New Property'}</h2>
            
            <div style={styles.formGrid}>
              <input
                name="title"
                placeholder="Property Title"
                value={formData.title}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              
              <input
                name="location"
                placeholder="Location (e.g., Lekki Phase 1, Lagos)"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              
              <input
                name="price"
                type="number"
                placeholder="Price (₦)"
                value={formData.price}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              
              <input
                name="bedrooms"
                type="number"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                style={styles.input}
              />
              
              <input
                name="bathrooms"
                type="number"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                style={styles.input}
              />
              
              <input
                name="area"
                type="number"
                placeholder="Area (m²)"
                value={formData.area}
                onChange={handleInputChange}
                style={styles.input}
              />
              
              <div style={styles.fileInput}>
                <ImageIcon size={20} color="#64748b" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            
            <textarea
              name="description"
              placeholder="Property Description"
              value={formData.description}
              onChange={handleInputChange}
              style={{...styles.input, minHeight: '100px'}}
              rows="4"
            />
            
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Preview" style={styles.preview} />
            )}
            
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Update Property' : 'Save Property'}
            </button>
          </form>
        )}

        <div style={styles.propertiesList}>
          <h2>All Properties ({properties.length})</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : properties.length === 0 ? (
            <p>No properties found. Add your first property!</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>
                      <img src={property.image} alt={property.title} style={styles.thumbnail} />
                    </td>
                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>{formatPrice(property.price)}</td>
                    <td>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: property.type === 'sale' ? '#2563eb' : '#16a34a'
                      }}>
                        {property.type === 'sale' ? 'Sale' : 'Rent'}
                      </span>
                    </td>
                    <td>
                      <div style={styles.actions}>
                        <button onClick={() => handleEdit(property)} style={styles.actionButton}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(property.id)} style={{...styles.actionButton, ...styles.deleteButton}}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  },
  navbar: {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%'
  },
  fileInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px'
  },
  preview: {
    maxWidth: '300px',
    borderRadius: '8px',
    marginTop: '1rem'
  },
  submitButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  propertiesList: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  thumbnail: {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#ffffff'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  actionButton: {
    backgroundColor: '#f1f5f9',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  }
};

export default AdminDashboard;

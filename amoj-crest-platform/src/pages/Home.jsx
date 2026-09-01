import { useState, useEffect } from 'react';
import { Search, MapPin, Home as HomeIcon, DollarSign, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProperties } from '../firebase';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const props = await getProperties();
      setProperties(props);
    } catch (error) {
      console.error('Error loading properties:', error);
      // Sample data for demo
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
        },
        {
          id: '2',
          title: 'Modern 2 Bedroom Apartment',
          location: 'Victoria Island, Lagos',
          price: 15000000,
          type: 'rent',
          bedrooms: 2,
          bathrooms: 2,
          area: 120,
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
          description: 'Contemporary apartment with ocean view'
        },
        {
          id: '3',
          title: 'Commercial Office Space',
          location: 'Maitama, Abuja',
          price: 450000000,
          type: 'sale',
          bedrooms: 0,
          bathrooms: 4,
          area: 800,
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          description: 'Premium office space in business district'
        }
      ]);
    }
    setLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Discover Premium Properties Across Nigeria</h1>
          <p style={styles.heroSubtitle}>Find your dream home in Lagos, Abuja, Port Harcourt and major cities. Premium residential, commercial and land investments across Nigeria's prime locations.</p>
          
          <div style={styles.searchBox}>
            <div style={styles.searchInput}>
              <Search size={20} color="#64748b" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
              />
            </div>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Properties</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Featured Properties</h2>
          
          {loading ? (
            <p>Loading properties...</p>
          ) : (
            <div style={styles.propertyGrid}>
              {filteredProperties.map(property => (
                <Link to={`/property/${property.id}`} key={property.id} style={styles.propertyCard}>
                  <div style={styles.propertyImage}>
                    <img src={property.image} alt={property.title} style={styles.img} />
                    <span style={styles.badge}>{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  </div>
                  <div style={styles.propertyContent}>
                    <h3 style={styles.propertyTitle}>{property.title}</h3>
                    <div style={styles.propertyLocation}>
                      <MapPin size={16} color="#64748b" />
                      <span>{property.location}</span>
                    </div>
                    <p style={styles.propertyPrice}>{formatPrice(property.price)}</p>
                    <div style={styles.propertyFeatures}>
                      <span><Bed size={16} /> {property.bedrooms} Beds</span>
                      <span><Bath size={16} /> {property.bathrooms} Baths</span>
                      <span><Square size={16} /> {property.area}m²</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={styles.servicesSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <HomeIcon size={40} color="#2563eb" />
              <h3>Buy Property</h3>
              <p>Browse our extensive listings of properties for sale across Nigeria</p>
            </div>
            <div style={styles.serviceCard}>
              <DollarSign size={40} color="#2563eb" />
              <h3>Rent Property</h3>
              <p>Find quality rental properties in prime locations</p>
            </div>
            <div style={styles.serviceCard}>
              <MapPin size={40} color="#2563eb" />
              <h3>Sell Property</h3>
              <p>List your property with us and reach qualified buyers</p>
            </div>
            <div style={styles.serviceCard}>
              <HomeIcon size={40} color="#2563eb" />
              <h3>Property Management</h3>
              <p>We manage your property investments professionally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <div style={styles.contactInfo}>
            <p><strong>Address:</strong> 15B Admiralty Way, Lekki Phase 1, Lagos</p>
            <p><strong>Phone:</strong> +234 800 AMOJ CREST</p>
            <p><strong>Email:</strong> info@amojcrestproperty.com</p>
            <p><strong>Hours:</strong> Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>&copy; 2024 Amoj Crest Property. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600") center/cover',
    padding: '120px 20px',
    textAlign: 'center',
    color: '#ffffff'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2.5rem',
    opacity: 0.9
  },
  searchBox: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  searchInput: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    gap: '0.5rem',
    minWidth: '300px'
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    width: '100%',
    color: '#1e293b'
  },
  select: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: '500'
  },
  section: {
    padding: '80px 20px',
    backgroundColor: '#f8fafc'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#1e293b'
  },
  propertyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem'
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textDecoration: 'none',
    color: 'inherit'
  },
  propertyImage: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  propertyContent: {
    padding: '1.5rem'
  },
  propertyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1e293b'
  },
  propertyLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    marginBottom: '0.75rem'
  },
  propertyPrice: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '1rem'
  },
  propertyFeatures: {
    display: 'flex',
    gap: '1rem',
    color: '#64748b',
    fontSize: '0.875rem'
  },
  servicesSection: {
    padding: '80px 20px',
    backgroundColor: '#ffffff'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  serviceCard: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    transition: 'transform 0.3s'
  },
  contactInfo: {
    textAlign: 'center',
    fontSize: '1.125rem',
    lineHeight: '2',
    color: '#64748b'
  },
  footer: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: '2rem 20px',
    textAlign: 'center'
  }
};

export default Home;

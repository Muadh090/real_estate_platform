import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Phone, Mail, Share2, Heart } from 'lucide-react';
import { getProperties } from '../firebase';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const props = await getProperties();
      const found = props.find(p => p.id === id);
      if (found) {
        setProperty(found);
      } else {
        // Demo data
        setProperty({
          id: '1',
          title: 'Luxury 4 Bedroom Duplex',
          location: 'Lekki Phase 1, Lagos',
          price: 85000000,
          type: 'sale',
          bedrooms: 4,
          bathrooms: 5,
          area: 450,
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
          description: 'Stunning duplex in prime Lekki location with modern finishes, spacious rooms, and excellent security. Perfect for families looking for luxury living.',
          features: ['24/7 Security', 'Swimming Pool', 'Gym', 'Parking Space', 'Generator', 'Water Treatment Plant']
        });
      }
    } catch (error) {
      console.error('Error loading property:', error);
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

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={property.image} alt={property.title} style={styles.mainImage} />
      </div>
      
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{property.title}</h1>
            <div style={styles.location}>
              <MapPin size={20} color="#64748b" />
              <span>{property.location}</span>
            </div>
          </div>
          <div style={styles.priceSection}>
            <p style={styles.price}>{formatPrice(property.price)}</p>
            <span style={styles.badge}>{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
          </div>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <Bed size={24} color="#2563eb" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div style={styles.feature}>
            <Bath size={24} color="#2563eb" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
          <div style={styles.feature}>
            <Square size={24} color="#2563eb" />
            <span>{property.area}m²</span>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Description</h2>
          <p style={styles.description}>{property.description}</p>
        </div>

        {property.features && (
          <div style={styles.section}>
            <h2>Features</h2>
            <ul style={styles.featuresList}>
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={styles.contactSection}>
          <h2>Contact Agent</h2>
          <div style={styles.contactButtons}>
            <button style={styles.contactButton}>
              <Phone size={20} /> Call Now
            </button>
            <button style={styles.contactButton}>
              <Mail size={20} /> Send Email
            </button>
          </div>
          <div style={styles.actionButtons}>
            <button style={styles.actionButton}>
              <Heart size={20} /> Save
            </button>
            <button style={styles.actionButton}>
              <Share2 size={20} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  imageContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '2rem',
    height: '500px'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '1.125rem'
  },
  priceSection: {
    textAlign: 'right'
  },
  price: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '0.5rem'
  },
  badge: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  features: {
    display: 'flex',
    gap: '2rem',
    padding: '1.5rem 0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '2rem'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.125rem',
    color: '#1e293b'
  },
  section: {
    marginBottom: '2rem'
  },
  description: {
    lineHeight: '1.8',
    color: '#64748b',
    fontSize: '1.125rem'
  },
  featuresList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.75rem',
    listStyle: 'none',
    padding: 0
  },
  contactSection: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '12px',
    marginTop: '2rem'
  },
  contactButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  contactButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ffffff',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default PropertyDetails;

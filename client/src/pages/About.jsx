import React from "react";

const About = () => {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#F9F9F9',
      minHeight: '100vh',
      paddingTop: '60px',
      paddingBottom: '60px'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#2C3E50',
        color: '#FFFFFF',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2.8rem',
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            About Team Pragati
          </h1>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            opacity: '0.95',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Empowering IIT Madras students on their journey to become civil servants through collaborative learning, structured preparation, and community support.
          </p>
        </div>
      </section>

      {/* Main Content*/}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/*Mission & Vision Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '36px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            borderLeft: '4px solid #800000'
          }}>
            
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '1.5rem',
              color: '#2C3E50',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Our Mission
            </h3>
            <p style={{
              color: '#555555',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              To create a collaborative ecosystem where IIT Madras students aspiring for civil services can access quality resources, mentorship, and peer support to excel in their UPSC preparation journey.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '36px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            borderLeft: '4px solid #000080'
          }}>
            
            <h3 style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '1.5rem',
              color: '#2C3E50',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              Our Vision
            </h3>
            <p style={{
              color: '#555555',
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              To be the premier UPSC preparation community at IIT Madras, producing competent and ethical civil servants who contribute meaningfully to nation-building and public service.
            </p>
          </div>
        </div>

        {/*What We Offer Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2.2rem',
            color: '#2C3E50',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            What We Offer
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                
                title: 'Curated Study Materials',
                description: 'Access comprehensive Bluebooks, NCERTs, standard reference books, and subject-wise notes curated by successful aspirants.'
              },
              {
                
                title: 'Daily Current Affairs',
                description: 'Weekly compilations of The Hindu editorials, PIB updates, and current affairs analysis tailored for UPSC preparation.'
              },
              {
                
                title: 'Mock Test Series',
                description: 'Regular prelims and mains mock tests with detailed answer keys, syllabus coverage, and performance analytics.'
              },
              {
                
                title: 'Expert Sessions',
                description: 'Talks by successful civil servants, retired bureaucrats, and subject matter experts sharing insights and strategies.'
              },
              {
                
                title: 'Peer Discussion Forums',
                description: 'Engage in meaningful discussions, doubt clarification, and answer writing practice with fellow aspirants.'
              },
              {
                
                title: 'Progress Tracking',
                description: 'Personal dashboards to monitor your syllabus completion, test performance, and study streaks.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '28px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                  {feature.icon}
                </div>
                <h4 style={{
                  fontFamily: 'Merriweather, serif',
                  fontSize: '1.2rem',
                  color: '#2C3E50',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  color: '#555555',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section style={{
          backgroundColor: '#FFFFFF',
          padding: '48px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2.2rem',
            color: '#2C3E50',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            Our Core Values
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { value: 'Excellence', description: 'Striving for the highest standards in preparation and practice' },
              { value: 'Integrity', description: 'Maintaining honesty and ethical conduct in all endeavors' },
              { value: 'Collaboration', description: 'Learning and growing together as a supportive community' },
              { value: 'Consistency', description: 'Building sustainable study habits and long-term discipline' }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <h4 style={{
                  fontFamily: 'Merriweather, serif',
                  fontSize: '1.3rem',
                  color: '#800000',
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  {item.value}
                </h4>
                <p style={{
                  color: '#555555',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#800000',
          color: '#FFFFFF',
          padding: '48px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(128, 0, 0, 0.2)'
        }}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2rem',
            marginBottom: '16px',
            fontWeight: '600'
          }}>
            Ready to Begin Your Journey?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '28px',
            opacity: '0.95',
            lineHeight: '1.6'
          }}>
            Join Team Pragati and connect with fellow IIT Madras students preparing for civil services
          </p>
          <a
            href="/register"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#800000',
              padding: '14px 40px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F4F4F4';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Join Our Community
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
import React from 'react';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#333333', backgroundColor: '#F9F9F9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1562774053-701939374585?w=1200")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        padding: '120px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Team Pragati
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          marginBottom: '15px',
          opacity: '0.95'
        }}>
          Empowering Future Civil Servants
        </h2>
        <p style={{
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
          opacity: '0.9'
        }}>
          Join IIT Madras's UPSC preparation community. Access curated study
          material, mock tests, events, and a supportive peer network on campus.
        </p>
        
        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/register" style={{
            backgroundColor: '#800000',
            color: '#FFFFFF',
            padding: '14px 32px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#660000'}
          onMouseLeave={e => e.target.style.backgroundColor = '#800000'}>
            Join Our Community
          </a>
          <a href="/study-materials" style={{
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            padding: '14px 32px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            border: '2px solid #FFFFFF',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.style.color = '#800000';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#FFFFFF';
          }}>
            Explore Resources
          </a>
          <a href="/events" style={{
  backgroundColor: '#FFFFFF',
  color: '#2C3E50',
  padding: '14px 32px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  display: 'inline-block'
}}
onMouseEnter={e => {
  e.target.style.backgroundColor = '#ECF0F1';
}}
onMouseLeave={e => {
  e.target.style.backgroundColor = '#FFFFFF';
}}>
  Upcoming Events
</a>

        </div>
      </section>
      <section style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '70px 20px'
}}>
  <h2 style={{
    fontFamily: 'Merriweather, serif',
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#2C3E50'
  }}>
    About UPSC Civil Services
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '28px'
  }}>
    {[
      {
        title: 'What is UPSC?',
        text: 'The UPSC Civil Services Examination selects India’s administrative leadership, responsible for policy-making, governance, and nation-building.'
      },
      {
        title: 'Why It Matters',
        text: 'Civil servants play a critical role in governance, public welfare delivery, and upholding constitutional values.'
      },
      {
        title: 'Career Opportunities',
        text: 'IAS, IPS, IFS and allied services offer diverse roles across administration, diplomacy, policing, and development.'
      },
      {
        title: 'Examination Stages',
        text: 'The exam consists of three stages: Prelims, Mains, and the Personality Test (Interview).'
      },
      {
        title: 'Trends & Competition',
        text: 'With increasing competition and evolving patterns, strategic preparation and peer support are essential.'
      }
    ].map((item, idx) => (
      <div key={idx} style={{
        backgroundColor: '#FFFFFF',
        padding: '28px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{
          fontFamily: 'Merriweather, serif',
          marginBottom: '12px',
          color: '#800000'
        }}>
          {item.title}
        </h3>
        <p style={{ lineHeight: '1.6', color: '#555555' }}>
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>
<section style={{
  backgroundColor: '#FFFFFF',
  padding: '70px 20px'
}}>
  <div style={{
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center'
  }}>
    <h2 style={{
      fontFamily: 'Merriweather, serif',
      fontSize: '2.2rem',
      marginBottom: '30px',
      color: '#2C3E50'
    }}>
      About Team Pragati
    </h2>

    <p style={{
      fontSize: '1.1rem',
      lineHeight: '1.7',
      marginBottom: '30px',
      color: '#555555'
    }}>
      Team Pragati is IIT Madras’s dedicated UPSC preparation club, built to support aspirants through structured resources, mentorship, and a strong peer-driven ecosystem.
    </p>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '40px'
    }}>
      <div style={{
        padding: '28px',
        borderRadius: '12px',
        border: '2px solid #800000'
      }}>
        <h3 style={{ color: '#800000', marginBottom: '10px' }}>Our Mission</h3>
        <p>
          To create a comprehensive support system for UPSC aspirants at IIT Madras through discipline, collaboration, and academic excellence.
        </p>
      </div>

      <div style={{
        padding: '28px',
        borderRadius: '12px',
        border: '2px solid #2C3E50'
      }}>
        <h3 style={{ color: '#2C3E50', marginBottom: '10px' }}>Our Vision</h3>
        <p>
          To nurture competent, ethical, and socially conscious future administrators and public servants.
        </p>
      </div>
    </div>

    <p style={{
      marginTop: '30px',
      fontStyle: 'italic',
      color: '#777777'
    }}>
      Notable civil servants, alumni, and subject experts will be featured through talks and mentorship initiatives.
    </p>
  </div>
</section>


      {/* Quick Access Cards - Bento Box Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <h2 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: '2.2rem',
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          Quick Access
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'Latest Current Affairs',
              description: 'Weekly compilations and quizzes for UPSC.',
              icon: '📰',
              link: '/current-affairs'
            },
            {
              title: 'Upcoming Mock Tests',
              description: 'Prelims and Mains tests with detailed syllabus.',
              icon: '⏱️',
              link: '/mock-tests'
            },

            {
              title: 'Study Materials',
              description: 'Bluebooks, NCERTs, and standard book lists.',
              icon: '📚',
              link: '/study-materials'
            },
            {
  title: 'Recent Events Gallery',
  description: 'Highlights from talks, workshops, and group discussions.',
  icon: '🖼️',
  link: '/events'
},
{
  title: 'Discussion Forums',
  description: 'Peer discussions, doubts, and collaborative learning.',
  icon: '💬',
  link: '/forums'
}

          ].map((card, index) => (
            <a key={index} href={card.link} style={{
              backgroundColor: '#FFFFFF',
              padding: '32px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#333333',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              border: '2px solid transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = '#800000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '16px'
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '1.4rem',
                color: '#2C3E50',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#555555'
              }}>
                {card.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Additional CTA Section */}
      <section style={{
        backgroundColor: '#2C3E50',
        color: '#FFFFFF',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: '2rem',
          marginBottom: '20px'
        }}>
          Ready to Begin Your UPSC Journey?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '30px',
          opacity: '0.9'
        }}>
          Join hundreds of IIT Madras students preparing for civil services
        </p>
        <a href="/register" style={{
          backgroundColor: '#800000',
          color: '#FFFFFF',
          padding: '14px 40px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1.1rem',
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#660000'}
        onMouseLeave={e => e.target.style.backgroundColor = '#800000'}>
          Get Started Today
        </a>
      </section>
    </div>
  );
};

export default Home;
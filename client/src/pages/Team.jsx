import React from "react";

const Team = () => {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#F9F9F9',
      minHeight: '100vh',
      paddingTop: '60px',
      paddingBottom: '60px'
    }}>
      

      {/* Main Content*/}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>

        {/*What We Offer Section */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'Merriweather, serif',
            fontSize: '2.2rem',
            color: '#2C3E50',
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            Meet Our Team
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                imagePath:'/src/assets/surya.jpeg',
                title: 'Surya Pratap Singh',
                
              },
              {
                imagePath:'/src/assets/shey.jpeg',
                title: 'Shrey Malik',
              },
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
              <div style={{
                  //image round
                    width: '100%',
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                }}>

                    <img src={feature.imagePath} alt={feature.title} style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  content: 'center',
                }} />   </div>
                <h4 style={{
                  fontFamily: 'Merriweather, serif',
                  fontSize: '1.2rem',
                  color: '#2C3E50',
                  marginBottom: '12px',
                  fontWeight: '600',
                  textAlign: 'center'   
                }}>
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Team;
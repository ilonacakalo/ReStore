import React from 'react';
import { Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        Welcome to ILONA,<br></br>our inventory management system
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        This system has been designed to help you keep track of your inventory efficiently.
        Our simple goal is to provide you with the tools you need to keep check of your inventory, be it the many supplies for your hobbies or the items you need for your small business.
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '1rem' }}>
        To get started with managing your inventory, please log into your account or create a new one.
      </Typography>
      <img src="https://res.cloudinary.com/ddblhpply/image/upload/f_auto,q_auto/gog03fu9oc6mwn2jo53j" alt="Inventory" style={{ maxWidth: '35%', height: 'auto', marginBottom: '1rem' }} />
    </Container>
  );
};

export default Home;

import React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';

interface ContactFormProps {
  email: string;
  onChange: (field: string, value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ email, onChange }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Contact
      </Typography>
      <TextField
        fullWidth
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
        sx={{ mb: 2 }}
      />
    </CardContent>
  </Card>
);

export default ContactForm;

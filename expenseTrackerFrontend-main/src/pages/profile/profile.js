import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

const ProfileEdit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    income: '',
    avatarUrl: '',
    phoneNumber: '',
    address: '',
    dob: '',
    gender: '',
    bio: '',
    linkedin: '',
    twitter: '',
    website: '',
    preferredContact: '',
    occupation: '',
    monthlyBudget: '',
    financialGoals: '',
    preferredCurrency: '',
    bankAccount: ''
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log('Profile Data:', data);
    alert('Profile updated successfully!');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        maxHeight: '50vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: '1px',
        borderRadius: '8px',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>
      <Box textAlign="center" mb={2}>
        <Avatar
          src={formData.avatarUrl} // Display avatar if URL is present
          sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
        />
        <TextField
          label="Avatar URL"
          fullWidth
          margin="normal"
          {...register('avatarUrl')}
          placeholder="Enter URL of your avatar image"
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%', maxWidth: '600px', overflowY: 'auto', padding: '10px' }} // Added padding and overflow
      >
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...register('firstName', { required: 'First Name is required' })}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ''}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...register('lastName', { required: 'Last Name is required' })}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ''}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Income"
          fullWidth
          margin="normal"
          {...register('income', { required: 'Income is required', pattern: { value: /^[0-9]+$/, message: 'Enter a valid number' } })}
          error={!!errors.income}
          helperText={errors.income ? errors.income.message : ''}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          {...register('phoneNumber')}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          {...register('address')}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          margin="normal"
          {...register('dob')}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            {...register('gender')}
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          label="Bio"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          {...register('bio')}
        />
        <TextField
          label="LinkedIn"
          fullWidth
          margin="normal"
          {...register('linkedin')}
          placeholder="LinkedIn profile URL"
        />
        <TextField
          label="Twitter"
          fullWidth
          margin="normal"
          {...register('twitter')}
          placeholder="Twitter profile URL"
        />
        <TextField
          label="Website"
          fullWidth
          margin="normal"
          {...register('website')}
          placeholder="Personal or professional website URL"
        /> */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Contact Method</InputLabel>
          <Select
            {...register('preferredContact')}
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Occupation"
          fullWidth
          margin="normal"
          {...register('occupation')}
        />
        <TextField
          label="Monthly Budget"
          fullWidth
          margin="normal"
          {...register('monthlyBudget', { pattern: { value: /^[0-9]*$/, message: 'Enter a valid number' } })}
          error={!!errors.monthlyBudget}
          helperText={errors.monthlyBudget ? errors.monthlyBudget.message : ''}
        />
        <TextField
          label="Financial Goals"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          {...register('financialGoals')}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Currency</InputLabel>
          <Select
            {...register('preferredCurrency')}
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            {/* Add more currencies as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Bank Account"
          fullWidth
          margin="normal"
          {...register('bankAccount')}
          placeholder="Bank account details (optional)"
        />
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileEdit;

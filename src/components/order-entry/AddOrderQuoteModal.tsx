import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface AddOrderQuoteModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (orderData: any) => void;
}

export default function AddOrderQuoteModal({ 
  open, 
  onClose, 
  onCreate 
}: AddOrderQuoteModalProps) {
  const [formData, setFormData] = useState({
    customer: '',
    parent: 'DIVERSIFIED FOOD SERVICE-PARENT',
    job: '',
    subJob: '',
    type: 'Quote', // Default to Quote as shown in image
    referenceNumber: '80622'
  });

  const customerOptions = [
    'DIVERSIFIED FOOD SERVICE, LLC',
    'ACME CORPORATION',
    'GLOBAL INDUSTRIES',
    'TECH SOLUTIONS INC'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateQuote = () => {
    onCreate(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      {/* Title Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'white',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Add Order or Quote
        </Typography>
        <IconButton 
          size="small" 
          onClick={onClose}
          sx={{ 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Customer Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
              Customer Information
            </Typography>
          </Grid>

          {/* Parent Field */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Parent
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.parent}
                onChange={(e) => handleInputChange('parent', e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              >
                <MenuItem value="DIVERSIFIED FOOD SERVICE-PARENT">
                  DIVERSIFIED FOOD SERVICE-PARENT
                </MenuItem>
                <MenuItem value="ACME PARENT COMPANY">
                  ACME PARENT COMPANY
                </MenuItem>
                <MenuItem value="GLOBAL PARENT CORP">
                  GLOBAL PARENT CORP
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Job Field */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Job
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.job}
                onChange={(e) => handleInputChange('job', e.target.value)}
                displayEmpty
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>Select Job</em>
                </MenuItem>
                <MenuItem value="Sample Job 1">Sample Job 1</MenuItem>
                <MenuItem value="Sample Job 2">Sample Job 2</MenuItem>
                <MenuItem value="Sample Job 3">Sample Job 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Job Field */}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Sub Job
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.subJob}
                onChange={(e) => handleInputChange('subJob', e.target.value)}
                displayEmpty
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>Select Sub Job</em>
                </MenuItem>
                <MenuItem value="SUB001">SUB001 - Gaskets</MenuItem>
                <MenuItem value="SUB002">SUB002 - Hardware</MenuItem>
                <MenuItem value="SUB003">SUB003 - Installation</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Type Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 2, color: 'primary.main' }}>
              Type Selection
            </Typography>
            <RadioGroup
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel 
                value="Order" 
                control={<Radio />} 
                label="Order" 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel 
                  value="Quote" 
                  control={<Radio />} 
                  label="Quote" 
                />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  color: 'text.secondary',
                  bgcolor: 'grey.100',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1
                }}>
                  Reference # {formData.referenceNumber}
                </Typography>
              </Box>
            </RadioGroup>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined" 
                onClick={handleCancel}
                sx={{ minWidth: 100 }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleCreateQuote}
                sx={{ minWidth: 120 }}
              >
                Create {formData.type}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
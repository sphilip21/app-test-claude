import React, { useState, useEffect } from 'react';
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
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export type OrderItemType = 'Gasket' | 'Hardware' | 'Other';

interface AddToOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (orderData: any) => void;
  preselectedType?: OrderItemType;
}

export default function AddToOrderModal({ 
  open, 
  onClose, 
  onSave, 
  preselectedType = 'Gasket' 
}: AddToOrderModalProps) {
  const [formData, setFormData] = useState({
    type: preselectedType,
    item: '99-NSAMPLE - 99-NSAMPLE - NO NAME GASKET SAMPLE',
    description: '',
    comments: '',
    specialInstructions: '',
    // Dimensions
    width: 0,
    height: 0,
    numberOfSides: 4,
    feet: 0.00,
    roundedFeet: 0,
    // Rate and Quantity
    unitPrice: 0.00,
    qtyOrdered: 1,
    qtyShipped: 1,
    qtyBackordered: 0,
    totalAmount: 0.00,
    // Checkboxes
    dartToDart: false,
    overrideCalculation: false,
    specialOrderItem: false,
  });

  // Update type when preselectedType changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: preselectedType
    }));
  }, [preselectedType]);

  // Calculate total amount when unit price or quantity changes
  useEffect(() => {
    const total = formData.unitPrice * formData.qtyOrdered;
    setFormData(prev => ({
      ...prev,
      totalAmount: total
    }));
  }, [formData.unitPrice, formData.qtyOrdered]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#f5f5f5',
          border: '1px solid #ccc',
        }
      }}
    >
      {/* Title Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: '#e0e0e0',
          px: 2,
          py: 1,
          borderBottom: '1px solid #ccc'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Add to Order
        </Typography>
        <IconButton 
          size="small" 
          onClick={onClose}
          sx={{ color: 'white', bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={8}>
            {/* Type Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Type:
              </Typography>
              <RadioGroup
                row
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <FormControlLabel 
                  value="Gasket" 
                  control={<Radio />} 
                  label="Gasket" 
                />
                <FormControlLabel 
                  value="Hardware" 
                  control={<Radio />} 
                  label="Hardware" 
                />
                <FormControlLabel 
                  value="Other" 
                  control={<Radio />} 
                  label="Other" 
                />
              </RadioGroup>
            </Box>

            {/* Item */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Item
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.item}
                  onChange={(e) => handleInputChange('item', e.target.value)}
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                >
                  <MenuItem value="99-NSAMPLE - 99-NSAMPLE - NO NAME GASKET SAMPLE">
                    99-NSAMPLE - 99-NSAMPLE - NO NAME GASKET SAMPLE
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Description and Comments */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Description
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Comments
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>

            {/* Special Instructions */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Special Instructions
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                size="small"
              />
            </Box>

            {/* Dimensions and Rate/Quantity */}
            <Grid container spacing={3}>
              {/* Dimensions */}
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Dimensions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Width (inches)
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      value={formData.width}
                      size="small"
                      fullWidth
                      disabled
                      sx={{ mt: 3.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Height (inches)
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      value={formData.height}
                      size="small"
                      fullWidth
                      disabled
                      sx={{ mt: 3.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Number of Sides
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.numberOfSides}
                      onChange={(e) => handleInputChange('numberOfSides', parseInt(e.target.value) || 0)}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      value={formData.numberOfSides}
                      size="small"
                      fullWidth
                      disabled
                      sx={{ mt: 3.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Feet
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.feet}
                      onChange={(e) => handleInputChange('feet', parseFloat(e.target.value) || 0)}
                      size="small"
                      fullWidth
                      inputProps={{ step: 0.01 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      value={formData.feet}
                      size="small"
                      fullWidth
                      disabled
                      sx={{ mt: 3.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Rounded Feet
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.roundedFeet}
                      onChange={(e) => handleInputChange('roundedFeet', parseInt(e.target.value) || 0)}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      value={formData.roundedFeet}
                      size="small"
                      fullWidth
                      disabled
                      sx={{ mt: 3.5 }}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.overrideCalculation}
                      onChange={(e) => handleInputChange('overrideCalculation', e.target.checked)}
                      sx={{ color: 'red' }}
                    />
                  }
                  label={
                    <Typography sx={{ color: 'red' }}>
                      Override Calculation
                    </Typography>
                  }
                  sx={{ mt: 1 }}
                />
              </Grid>

              {/* Rate and Quantity */}
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Rate and Quantity
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Unit Price
                    </Typography>
                    <TextField
                      value={`$${formData.unitPrice.toFixed(2)}`}
                      onChange={(e) => {
                        const value = e.target.value.replace('$', '');
                        handleInputChange('unitPrice', parseFloat(value) || 0);
                      }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Qty Ordered
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.qtyOrdered}
                      onChange={(e) => handleInputChange('qtyOrdered', parseInt(e.target.value) || 0)}
                      size="small"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▲</Button>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▼</Button>
                            </Box>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Qty Shipped
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.qtyShipped}
                      onChange={(e) => handleInputChange('qtyShipped', parseInt(e.target.value) || 0)}
                      size="small"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▲</Button>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▼</Button>
                            </Box>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Qty Backordered
                    </Typography>
                    <TextField
                      type="number"
                      value={formData.qtyBackordered}
                      onChange={(e) => handleInputChange('qtyBackordered', parseInt(e.target.value) || 0)}
                      size="small"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▲</Button>
                              <Button size="small" sx={{ minWidth: 0, height: '12px', p: 0 }}>▼</Button>
                            </Box>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Total Amount
                    </Typography>
                    <TextField
                      value={`$${formData.totalAmount.toFixed(2)}`}
                      size="small"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth>
                Mgr Part Lookup
              </Button>
              <Button variant="contained" fullWidth>
                Customer Log
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.dartToDart}
                    onChange={(e) => handleInputChange('dartToDart', e.target.checked)}
                  />
                }
                label="Dart to Dart"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.specialOrderItem}
                onChange={(e) => handleInputChange('specialOrderItem', e.target.checked)}
              />
            }
            label="Special Order Item"
          />
          <Box sx={{ flex: 1 }} />
          <Button 
            variant="contained" 
            onClick={handleSave}
            sx={{ minWidth: 80 }}
          >
            Save
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleCancel}
            sx={{ minWidth: 80 }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
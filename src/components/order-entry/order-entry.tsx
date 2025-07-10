import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import AddToOrderModal, { OrderItemType } from './AddToOrderModal';

interface OrderItem {
  qtyOrd: number;
  qtyShip: number;
  qtyBack: number;
  comment: string;
  special: string;
  item: string;
  description: string;
  unitPrice: number;
  lineTotal: number;
}

interface CustomerData {
  companyName: string;
  parent: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  worldShipEmail: string;
  billTo: {
    companyName: string;
    attention: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    note: string;
  };
  shipTo: {
    location: string;
    companyName: string;
    attention: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    note: string;
    type: string;
    upsAccount: string;
    billTranspTo: string;
  };
  preferredShipMethod: string;
  viewAll: boolean;
  dropShip: boolean;
  defaultAddress: boolean;
  active: boolean;
  logoToUse: string;
  packingList: string;
}

export default function OrderEntry() {
  const location = useLocation();
  const navigationState = location.state as any;
  
  const [orderRefNo, setOrderRefNo] = useState('206530');
  const [quoteRefNo, setQuoteRefNo] = useState('');
  const [customer, setCustomer] = useState('DIVERSIFIED FOOD SERVICE');
  const [orderId, setOrderId] = useState('272743');
  const [codAmount, setCodAmount] = useState('0.00');
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<OrderItemType>('Gasket');
  const [selectedContact, setSelectedContact] = useState('CAROLYN SABOL');

  // Customer data object with all the values from the image
  const customerData: CustomerData = {
    companyName: 'DIVERSIFIED FOOD SERVICE, LLC',
    parent: 'DIVERSIFIED FOOD SERVICE-PARENT',
    contactName: 'CAROLYN SABOL',
    phoneNumber: '609-605-7387',
    email: 'DFSPURCHASING@DFSUPPLY.COM; csabol@tundrafmp.com',
    worldShipEmail: '',
    billTo: {
      companyName: 'DIVERSIFIED FOODSERVICE SUP',
      attention: 'ACCOUNTS PAYABLE',
      addressLine1: 'DIVERSIFIED FOODSERVICE SUP',
      addressLine2: '220 MESSNER DR',
      addressLine3: '',
      addressLine4: '',
      addressLine5: '',
      city: 'WHEELING',
      state: 'IL',
      postalCode: '60090',
      country: 'USA',
      note: '',
    },
    shipTo: {
      location: 'DFS - LUMBERTON',
      companyName: 'DIVERSIFIED FOOD SERVICE, LLI',
      attention: 'RECEIVINGS DEPT',
      addressLine1: '101 MOUNT HOLLY BYPASS',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      addressLine5: '',
      city: 'LUMBERTON',
      state: 'NJ',
      postalCode: '08048-1113',
      country: 'USA',
      note: '',
      type: 'Commercial',
      upsAccount: 'F81514',
      billTranspTo: 'Receiver',
    },
    preferredShipMethod: 'GROUND',
    viewAll: false,
    dropShip: false,
    defaultAddress: false,
    active: false,
    logoToUse: 'TRG',
    packingList: 'Active Order',
  };

  const contactOptions = [
    'CAROLYN SABOL',
    'JOHN DOE', 
    'JANE SMITH'
  ];

  // Effect to handle navigation state and prepopulate fields
  useEffect(() => {
    if (navigationState) {
      if (navigationState.customerName) {
        setCustomer(navigationState.customerName);
      }
      if (navigationState.referenceNumber) {
        setQuoteRefNo(navigationState.referenceNumber);
      }
      // You can add more field mappings here as needed
      console.log('Received navigation state:', navigationState);
    }
  }, [navigationState]);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      qtyOrd: 1,
      qtyShip: 1,
      qtyBack: 0,
      comment: '',
      special: '',
      item: '99-HANDLING - HANDLING FEE',
      description: 'HANDLING FEE',
      unitPrice: 2.00,
      lineTotal: 2.00,
    },
    {
      qtyOrd: 2,
      qtyShip: 2,
      qtyBack: 0,
      comment: '',
      special: '',
      item: '15-10-516-19 - 20-10-516',
      description: '20-10-516    76 X 36 MAG 45C',
      unitPrice: 33.31,
      lineTotal: 66.62,
    },
  ]);

  const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = 0.00;
  const total = subtotal + tax;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenModal = (type: OrderItemType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveOrderItem = (orderData: any) => {
    // Create new order item from modal data
    const newItem: OrderItem = {
      qtyOrd: orderData.qtyOrdered,
      qtyShip: orderData.qtyShipped,
      qtyBack: orderData.qtyBackordered,
      comment: orderData.comments,
      special: orderData.specialInstructions,
      item: orderData.item,
      description: orderData.description,
      unitPrice: orderData.unitPrice,
      lineTotal: orderData.totalAmount,
    };

    // Add the new item to the order
    setOrderItems([...orderItems, newItem]);
  };

  const renderCustomerInformation = () => {
    return (
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={6}>
            {/* Company Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Company Name
                </Typography>
                <TextField
                  value={customerData.companyName}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Parent
                </Typography>
                <TextField
                  value={customerData.parent}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Contact Name
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedContact}
                    onChange={(e) => setSelectedContact(e.target.value)}
                  >
                    {contactOptions.map((contact) => (
                      <MenuItem key={contact} value={contact}>
                        {contact}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 3, minWidth: '30px', height: '30px' }}
                >
                  +
                </Button>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  World Ship E-Mail Address
                </Typography>
                <TextField
                  value={customerData.worldShipEmail}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Phone Number
                </Typography>
                <TextField
                  value={customerData.phoneNumber}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  E-Mail Address
                </Typography>
                <TextField
                  value={customerData.email}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            {/* Addresses Section */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Addresses
            </Typography>

            {/* Bill To */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, color: 'red' }}>
                Bill To:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Company Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.companyName}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Attention
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.attention}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 1
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.addressLine1}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 2
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.addressLine2}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 3
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.addressLine3}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 4
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.addressLine4}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 5
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.addressLine5}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    City
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.city}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    State
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    value={customerData.billTo.state}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Postal Code
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={customerData.billTo.postalCode}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Country
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.country}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Note
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.billTo.note}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Preferred Ship Method */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Preferred Ship Method
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={customerData.preferredShipMethod}
                  size="small"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            {/* Ship To Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'red' }}>
                  Ship To:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select value={customerData.shipTo.location}>
                    <MenuItem value="DFS - LUMBERTON">DFS - LUMBERTON</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customerData.viewAll}
                      onChange={(e) => {
                        // Handle view all change
                      }}
                    />
                  }
                  label="View All"
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button variant="outlined" size="small">Add</Button>
                <Button variant="outlined" size="small">Edit</Button>
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Company Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.companyName}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Attention
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.attention}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 1
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.addressLine1}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 2
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.addressLine2}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 3
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.addressLine3}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 4
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.addressLine4}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Address Line 5
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.addressLine5}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    City
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.city}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    State
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    value={customerData.shipTo.state}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Postal Code
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={customerData.shipTo.postalCode}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Country
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={customerData.shipTo.country}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox checked={customerData.dropShip} />}
                    label="Drop Ship"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={<Checkbox checked={customerData.defaultAddress} />}
                    label="Default Address"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Note
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={customerData.shipTo.note}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={<Checkbox checked={customerData.active} />}
                    label="Active"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Grid>
                <Grid item xs={3}></Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Type
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.type}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#e0e0e0' }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    UPS Account #
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.upsAccount}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Bill Transp. To
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={customerData.shipTo.billTranspTo}
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#e0e0e0' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Far Right Column */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={9}></Grid>
              <Grid item xs={3}>
                {/* Logo to use */}
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Logo to use:
                </Typography>
                <RadioGroup value={customerData.logoToUse}>
                  <FormControlLabel value="TRG" control={<Radio />} label="TRG" />
                  <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                  <FormControlLabel value="None" control={<Radio />} label="None" />
                </RadioGroup>

                {/* Packing List */}
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                  Packing List
                </Typography>
                <RadioGroup value={customerData.packingList}>
                  <FormControlLabel value="Active Order" control={<Radio />} label="Active Order" />
                  <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                  <FormControlLabel value="None" control={<Radio />} label="None" />
                </RadioGroup>

                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                  No File Exists
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" size="small" fullWidth>
                    Status Report
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    WS Packages
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    Add to Production
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    Duplicate Order
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    Change To Quote
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    Change Customer
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const tabLabels = [
    'Order Information',
    'Customer Information',
    'Order Summary',
    'Quote Attachments',
    'Order Attachments'
  ];

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={1} sx={{ mb: 2 }}>


        {/* Header Section */}
        <Box sx={{ p: 2, bgcolor: '#f0f0f0' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Order Reference No.
                  </Typography>
                  <TextField
                    value={orderRefNo}
                    onChange={(e) => setOrderRefNo(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Quote Reference No.
                  </Typography>
                  <TextField
                    value={quoteRefNo}
                    onChange={(e) => setQuoteRefNo(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Customer
                  </Typography>
                  <TextField
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Order ID
                  </Typography>
                  <TextField
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" size="small">
                  Send Confirmation
                </Button>
                <Button variant="contained" size="small">
                  Pick Up Invoice
                </Button>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  mt: 2
                }}
              >
                Order Details
              </Typography>
            </Grid>
          </Grid>

          {/* Additional Info Message */}
          <Typography
            variant="body2"
            sx={{
              color: 'red',
              mt: 1,
              fontWeight: 'bold'
            }}
          >
            The following tabs have Additional Info: Order Summary
          </Typography>
        </Box>

        {/* Action Buttons Row 1 */}
        <Box sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="outlined" size="small">
                Print Production Form
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="small">
                View Customer
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="small">
                Memo
              </Button>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              <Button variant="outlined" size="small">
                Edit Order
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            // Order Information tab content (existing table)
            <>
              {/* Action Buttons Row 2 */}
              <Box sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal('Gasket')}
                    >
                      Add Gasket
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal('Hardware')}
                    >
                      Add Hardware
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal('Other')}
                    >
                      Add Non-Part
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}
                    >
                      Additional Information
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" size="small">
                      Production Status
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" size="small">
                      Add Door Heater
                    </Button>
                  </Grid>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Button variant="outlined" size="small">
                      Edit Line
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {/* Order Items Table */}
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                      <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>Qty Ord</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>Qty Ship</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>Qty Back</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Comment</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Special</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '200px' }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', minWidth: '300px' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '100px', textAlign: 'right' }}>Unit Price</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '100px', textAlign: 'right' }}>Line Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          bgcolor: index === 0 ? '#e3f2fd' : 'inherit',
                          '&:nth-of-type(even)': { bgcolor: '#f5f5f5' }
                        }}
                      >
                        <TableCell>{item.qtyOrd}</TableCell>
                        <TableCell>{item.qtyShip}</TableCell>
                        <TableCell>{item.qtyBack}</TableCell>
                        <TableCell>{item.comment}</TableCell>
                        <TableCell>{item.special}</TableCell>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          ${item.unitPrice.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          ${item.lineTotal.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Empty rows to match the original layout */}
                    {Array.from({ length: 8 }).map((_, index) => (
                      <TableRow key={`empty-${index}`} sx={{ height: '40px' }}>
                        <TableCell colSpan={9}></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Bottom Section */}
              <Box sx={{ p: 2, bgcolor: '#f0f0f0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        COD Amount
                      </Typography>
                      <TextField
                        value={codAmount}
                        onChange={(e) => setCodAmount(e.target.value)}
                        size="small"
                        sx={{ width: '120px' }}
                      />
                    </Box>
                    <Button variant="outlined" size="small">
                      Add Selected Item to Red Tag List
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Subtotal
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ${subtotal.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Tax
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ${tax.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ccc', pt: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Total
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ${total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {activeTab === 1 && renderCustomerInformation()}

          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography>Order Summary content goes here</Typography>
            </Box>
          )}

          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography>Quote Attachments content goes here</Typography>
            </Box>
          )}

          {activeTab === 4 && (
            <Box sx={{ p: 3 }}>
              <Typography>Order Attachments content goes here</Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Add to Order Modal */}
      <AddToOrderModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveOrderItem}
        preselectedType={modalType}
      />
    </Box>
  );
}
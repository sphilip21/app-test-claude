import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import { getConfiguration } from '../../services/manufacturing-api';
import { useAuth } from 'react-oidc-context';

export default function BarcodesModal({ data }: any) {
  const auth = useAuth();
  const componentRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  // Note on barcode spacing:
  //
  // TRG wants 9 barcodes per page. When several pages of barcodes are printed, small errors
  // in the barcode spacing will propogate and the barcodes become misaligned.
  //
  // To compute the ideal and precise row spacing, manual adjustments were made to barcode spacing
  // and the number of barcodes that fit on the first printed page were counted. We wanted to 
  // find the bounds, the highest and lowest values that result in 9 barcodes on page 1.
  // From there, we can compute a midpoint to find out how much spacing is needed to fit exactly
  // our target number (9).
  //
  // A manual bisection search was done and we obtained the following results
  //
  // lo  
  //  3.371 = 10 barcodes on page 1
  //  3.372 = 9 barcodes on page 1
  // hi
  //  5.031 = 9 barcodes on page 1
  //  5.032 = 8 barcodes on page 1
  // 
  // midpoint = (3.372+ 5.031) / 2;
  //          = 4.201499999999999
  //         ~= 4.2015
  // 
  const [barcodeSpacing, setBarcodeSpacing] = useState(4.2); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadConfig = async () => {
    if (auth.isAuthenticated && auth.user) {
      const token = `${auth.user?.id_token}`;
      const config = await getConfiguration(token);
      console.log('Loaded config.');
      setBarcodeSpacing(config.barcodeSpacing);
    }
    else {
      console.log('Cannot load config. Not authenticated.');
    }
  };

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    return <Button variant="contained" disableElevation>Print</Button>;
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      handleOpen()
    }
  }, [data])

  useEffect(() => {
    loadConfig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '80vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
  };

  const barcodeOptions: any = {
    height: 36,
    width: 1,
    format: 'CODE39'
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" style={{display: 'inline', paddingRight: '8px'}}>
            Using spacing {barcodeSpacing}px{' '}. Adjust spacing in settings.
          </Typography>
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle="PrintBarcodes"
            onAfterPrint={() => {}}
            onBeforeGetContent={() => {}}
            onBeforePrint={() => {}}
            removeAfterPrint
            trigger={reactToPrintTrigger}
          />
        </Box>

        <Box id="barcodes-content" ref={componentRef} sx={{ 
          paddingLeft: 5, 
          paddingRight: 5,
          paddingBottom: `${barcodeSpacing}px`, 
          paddingTop: `${barcodeSpacing}px` }}>
          {/*
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Barcode Tags for { dayjs().format('dddd MMMM D, YYYY') }
          </Typography>
          */}
          <Grid container spacing={3} rowSpacing={barcodeSpacing}>
          {data.map((item: any) => (
            <React.Fragment key={item.item.id}>
              {/* Left Column */}
              <Grid item xs={5}>
                <Barcode value={item.formatted} {...barcodeOptions} />
              </Grid>
              {/* Middle Collumn */}
              <Grid item xs={5}>
                <Typography variant="body1" style={{display: 'inline', paddingRight: '8px'}}>
                  <strong>Qty. {item.item?.quantity} </strong>
                </Typography>
                <Typography variant="body1" style={{display: 'inline'}}>
                  #{item.order?.ref} - {item.item?.id}  
                </Typography>
                <Typography variant="body2">
                  {item.desc}
                </Typography>
                <Typography variant="body1">
                  {item.item?.specialInstructions}
                </Typography>
              </Grid>
              {/* Right Collumn */}
              <Grid item xs={2}>
                <Typography variant="body1" style={{fontWeight: 600}}>
                  {item.order?.code}
                </Typography>
                <Typography variant="body1">
                  {dayjs(item.order?.promisedBy).format('MM/DD/YYYY')}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

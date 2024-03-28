import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

export default function BarcodesModal({ data }: any) {
  const componentRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

        <Box id="barcodes-content" ref={componentRef} sx={{ padding: 5 }}>
          {/*
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Barcode Tags for { dayjs().format('dddd MMMM D, YYYY') }
          </Typography>
          */}
          <Grid container spacing={3}>
          {data.map((item: any) => (
            <React.Fragment key={item.item.id}>
              <Grid item xs={5}>
                <Barcode value={item.formatted} {...barcodeOptions} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1">
                  Item #{item.item?.id} - Qty. {item.item?.quantity}
                </Typography>
                <Typography variant="body1">
                  {item.desc}
                </Typography>
                <Typography variant="body1">
                  {item.item?.specialInstructions}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">
                  Order #{item.order?.ref}
                </Typography>
                <Typography variant="body1">
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

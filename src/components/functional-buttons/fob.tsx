import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { red } from '../../utils/colors';


export default function FunctionalButtonsFob({actions}: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="trg-fob" sx={{ height: 330, transform: 'translateZ(0px)', position: 'fixed', top: 8, right: 0, zIndex: 1001, flexGrow: 1 }}>
      {/*<Backdrop open={open} />*/}
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: 'absolute',
          top: 64+20,
          right: 16,
          zIndex: 1001,
          '& .MuiFab-primary': {
            backgroundColor: red[500],
            //width: '48px',
            //height: '46px',
            //'& .MuiSpeedDialIcon-icon': { fontSize: 18 }
          }
        }}
        icon={<SpeedDialIcon />}
        direction="down"
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action: any) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => { handleClose(); action.handler(); }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

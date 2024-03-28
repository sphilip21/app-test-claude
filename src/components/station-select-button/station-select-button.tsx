import * as React from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import Link from '../link/link';
import stations from '../../features/stations';
import { toTitleCase } from '../../utils/string-utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function StationSelectMenu({currentStation}: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        variant="outlined"
        size="small"
        color="success"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ textTransform: 'none', fontSize: '1.0rem', fontWeight: 600 }}
      >
        { toTitleCase(currentStation) }
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {stations.map(station => (
          <Link underline="none" to={`/stations/${station.id}`} key={station.id}>
            <MenuItem onClick={handleClose} sx={{paddingTop: 2, paddingBottom: 2}}>
              <Typography variant="body2" sx={{fontSize: '1.0rem', fontWeight: 600, color: 'green'}}>{station.label}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
}

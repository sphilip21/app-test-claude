import * as React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts';
import { useAuth } from "react-oidc-context";

import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const auth = useAuth();
  const currentUser = useContext(CurrentUserContext);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <Typography variant="body1" component="span" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline', md: 'inline', lg: 'inline' } }}>
        Welcome, <strong>{currentUser?.username}</strong>!
      </Typography>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <AccountCircleIcon sx={{ color: '#fff', fontSize: '30px' }}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ zIndex: 1200,  }}
      >
        <MenuItem onClick={handleClose}>
          <Button onClick={() => void auth.removeUser()}>Sign Out</Button>
        </MenuItem>
      </Menu>
    </span>
  );
}

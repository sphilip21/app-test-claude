import { Fragment, useContext, useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  AppBar,
} from '@mui/material';
import './header-bar.scss';
import { CurrentUserContext } from '../../contexts';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import UserMenu from '../user-menu/user-menu';
import Link from '../link/link';
import Clock from './clock';

const pages = [
  {name: 'All Orders', href: '/orders'},
  {name: 'Stations', href: '/stations'},
];

export default function HeaderBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useContext(CurrentUserContext);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBar position="sticky" className="header-bar">
        <Toolbar>
          <Box className="trg-nav-pages" sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}>
            <PrecisionManufacturingTwoToneIcon  sx={{ mr: 1, color: '#dd5e88' }} />
            <Link to="/" sx={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                position: 'relative',
                top: '-2px',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.01rem',
                color: '#dd5e88',
                textDecoration: 'none',
                display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline' },
              }}
            >
              TRG | Manufacturing
            </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                to={page.href}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 600, textDecoration: 'none', mr: 2 }}
              >
                {page.name}
              </Link>
            ))}
          </Box>


          <Box sx={{ flexGrow: 0 , display: { xs: 'none', sm: 'flex' } }}>
            <Clock />

            <Box className="trg-nav-right" sx={{ display: 'inline' }}>
              <UserMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem divider>{`${currentUser?.lastName}, ${currentUser?.firstName}`}</MenuItem>
        <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
      </Menu>
    </Fragment>
  );
}

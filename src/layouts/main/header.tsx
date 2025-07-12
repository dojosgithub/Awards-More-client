import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  Stack,
  Container,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Typography,
  Button,
} from '@mui/material';

import { Icon } from '@iconify/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/redux/store';
import { setCartOpen } from 'src/redux/slices/cartSlice';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import Logo from 'src/components/logo';

import { useRouter } from 'src/routes/hooks';

import { HEADER } from '../config-layout';

export default function Header() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const dispatch = useDispatch();
  // const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);
  // const { totalQuantity } = useSelector((state: RootState) => state.cart);
  // console.log(totalQuantity);

  const router = useRouter();
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component="a" href={link.href}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_DESKTOP,
            },
            transition: theme.transitions.create(['height'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(offsetTop && {
              ...bgBlur({
                color: theme.palette.background.default,
              }),
              height: {
                md: HEADER.H_DESKTOP_OFFSET,
              },
            }),
          }}
        >
          <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
            {/* Left: Logo */}
            <Badge
              sx={{
                [`& .MuiBadge-badge`]: {
                  top: 8,
                  right: -16,
                },
              }}
              badgeContent={
                <Link
                  href={paths.changelog}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{ ml: 1 }}
                />
              }
            >
              <Logo />
            </Badge>

            {/* Center Nav Links for desktop */}
            {mdUp && (
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  ml: 6,
                }}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    underline="none"
                    color="text.primary"
                    sx={{ fontWeight: 400, fontSize: '16px', color: '#535353' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

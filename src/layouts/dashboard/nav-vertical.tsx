import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { Avatar, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import { useAuthContext } from 'src/auth/hooks';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton, NavUpgrade } from '../_common';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useAuthContext();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />
      <Box
        sx={{
          display: 'flex',
          mt: 3,
          ml: 3,
          backgroundColor: '#DAF4FD',
          // width: '237px',
          // height: '166px',
          p: 1,
          borderRadius: 1,
        }}
      >
        <Avatar sx={{ width: 40, height: 40, backgroundColor: '#FF4842' }} />
        <Box sx={{ pl: 2 }}>
          {user && (
            <>
              <Typography sx={{ color: '#212B36', fontWeight: 600, fontSize: '14px' }}>
                {`${user.firstName.charAt(0).toUpperCase()}${user.firstName.slice(
                  1
                )} ${user.lastName.charAt(0).toUpperCase()}${user.lastName.slice(1)}`}
              </Typography>
              <Typography sx={{ color: '#637381', fontWeight: 400, fontSize: '14px' }}>
                {user.role}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <NavSectionVertical
        data={navData}
        config={{
          currentRole: user?.role || 'admin',
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* <NavUpgrade /> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

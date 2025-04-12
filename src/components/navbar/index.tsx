// components/Navbar.tsx
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/notifications';
import styles from './navbar.module.css';
import { useNotifications } from '../../hooks/useNotifications';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Badge from '@mui/material/Badge';

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { notifications, markAsViewed, unviewedCount } = useNotifications();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMarkAsViewed = (id: number) => {
        markAsViewed(id);
    };

    return (
        <AppBar position="fixed" className={styles.navbarContainer}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ConnectBuy
                    </Typography>

                    <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex', paddingRight: '1.2rem' }}>
                        <Tooltip title="Notificaciones">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Badge badgeContent={unviewedCount > 6 ? '5+' : unviewedCount} color="error">
                                    <NotificationsIcon sx={{ color: 'white' }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {notifications.length > 0 ? (
                                notifications.slice(0, 5).map((notif) => (
                                    <MenuItem key={notif.id}>
                                        <div style={{display: 'flex', width: '100%'}}>
                                            <Typography sx={{ flex: 1, opacity: notif.viewed ? 0.5 : 1}} variant="body2">
                                                <strong>{notif.title}</strong><br />
                                                <span>{notif.body.substring(0, 30)}</span>
                                            </Typography>
                                            <IconButton 
                                                style={{ marginLeft: '1rem', flex: 0.1}} 
                                                size='small'
                                                onClick={() => handleMarkAsViewed(notif.id)}
                                            >
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                        </div>
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography variant="body2">Sin notificaciones</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;

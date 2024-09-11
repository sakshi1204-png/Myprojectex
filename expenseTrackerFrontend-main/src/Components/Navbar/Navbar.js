

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { menuItems } from '../../utils/menuItems'; // Assuming menuItems is an array of menu items
import avatar from '../../img/avatar.png'; // Import the avatar image
import {useNavigate} from 'react-router-dom'


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [active, setActive] = useState(null); // State to track active menu item
    const router = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (id) => {
        setActive(id);
        handleCloseNavMenu(); // Close the menu after selection
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#424242', backdropFilter: 'blur(4.5px)' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white', // Text color in the AppBar
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon sx={{ color: 'white' }} /> {/* MenuIcon color */}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' }, bgcolor: '#424242' }} // Background color for menu
                    >
                        
                            <MenuItem
                                onClick={() => router('/')}
                                sx={{ backgroundColor:'rgba(34, 34, 96, 0.1)' }}
                            >
                            
                                <Typography sx={{ ml: 1, color: 'white' }}>lsdkfjsklf</Typography> {/* Text color */}
                            </MenuItem>
                
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                   
                        <IconButton
                        
                            onClick={() =>router('/')}
                            sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                            
                            <Typography sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.6)' }}>
                                Dashboard
                            </Typography>
                        </IconButton>
                        <IconButton
                        
                            onClick={() =>router('/income')}
                            sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                            
                            <Typography sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.6)' }}>
                                Income
                            </Typography>
                        </IconButton>
                    
                        <IconButton
                        
                        onClick={() =>router('/expense')}
                        sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                        
                        <Typography sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.6)' }}>
                            Expense
                        </Typography>
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="User Avatar" src={avatar} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {['Profile', 'Logout'].map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ color: 'black' }}>{setting}</Typography> 
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;

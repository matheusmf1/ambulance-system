import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";


export default function Profile( { logout } ) {

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ( item ) => {

    if ( item.link ) {
      setAnchorEl(null);
      history.push( item.link );
    }

    else if ( item.func ) {
      setAnchorEl(null);
      item.func();
    }

    else {
      setAnchorEl(null);
    }

  };

  const dropDownData = [
    { label: "Ajustes", icon: <SettingsIcon />, link: "/update-profile" },
    { label: "SAIR", icon: <ExitToAppIcon />, func: logout },
  ];

  return (
    <Box>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        startIcon={ <Avatar src="../../../assets/images/user.png" className="topAvatar"></Avatar>}
        >
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        transitionDuration={0.5}
        onClose={handleClose}>

        {dropDownData.map((item, i) => (
          <MenuItem key={i} component={ListItem} onClick={ ( ) => handleClose( item ) }>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

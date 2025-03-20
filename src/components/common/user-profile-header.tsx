import { useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Stack,
  ListItemIcon,
  Tooltip,
  Popover,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import PaletteIcon from "@mui/icons-material/Palette";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

function CustomThemeSwitcher({ onClose }: { onClose: () => void }) {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value as "light" | "dark" | "system");
    onClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl>
        <FormLabel>Theme</FormLabel>
        <RadioGroup value={mode} onChange={handleThemeChange}>
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const themeOpen = Boolean(themeAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setThemeAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt="User" src="/path-to-user-image.jpg" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          John Doe
        </Typography>
        <ArrowDropDownIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleThemeClick}>
          <ListItemIcon>
            <PaletteIcon fontSize="small" />
          </ListItemIcon>
          Change Theme
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Popover
        open={themeOpen}
        anchorEl={themeAnchorEl}
        onClose={handleThemeClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <CustomThemeSwitcher onClose={handleThemeClose} />
      </Popover>
    </Stack>
  );
}

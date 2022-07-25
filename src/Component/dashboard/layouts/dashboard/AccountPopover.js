import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
import MenuPopover from "../../components/MenuPopover";
//

import { useTranslation } from "react-i18next";
import { logoutUrl } from "../../../../constants/urls";
import axios from "axios";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  /* {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  }, */
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useTranslation();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("SakanaApi-token");
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    const data = {};
    axios
      .post(logoutUrl, data, { headers })
      .then((response) => {
        localStorage.removeItem("SakanaApi-token");
        localStorage.removeItem("SakanaEmail");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    navigate("/");
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={""} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {t("Dashboard.admin")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {localStorage.getItem("SakanaEmail")}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logOut}>
            {t("Dashboard.logout")}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

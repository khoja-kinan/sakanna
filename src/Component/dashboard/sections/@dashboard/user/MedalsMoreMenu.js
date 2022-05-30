import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function MedalsMoreMenu({
  medal_id,
  Arabic_name,
  English_name,
  token,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const { t } = useTranslation();

  /* 
      medals 
  */

  const [openMedals, setOpenMedals] = useState(false);
  const [arName, setArname] = useState(Arabic_name);
  const [enName, setEnName] = useState(English_name);

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };

  const handleClickOpenMedals = () => {
    setOpenMedals(true);
  };

  const handleCloseEditMedals = () => {
    setOpenMedals(false);
  };
  const formData = new FormData();

  const handleCapture = (e) => {
    const medalImage = e.target.files[0];

    formData.append("image", medalImage, medalImage.name);
  };

  const handleConfirmEditMedal = () => {
    formData.append("name_ar", arName);
    formData.append("name_en", enName);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        `http://90.153.255.50/socialmediafamous/public/api/admin/medals/update/${medal_id}`,
        formData,
        { headers }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenMedals(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenMedals}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.MedalsPageEditButton")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openMedals}
          onClose={handleCloseEditMedals}
        >
          <DialogTitle> {t("description.MedalsPageEditButton")} </DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.MedalsPageTabelHeadArName")}
                  variant="outlined"
                  onChange={handleChangeArName}
                  value={arName}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.MedalsPageTabelHeadEnName")}
                  variant="outlined"
                  onChange={handleChangeEnName}
                  value={enName}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <Button variant="contained" component="label">
                  {t("description.MedalsPageNewImage")}
                  <input
                    type="file"
                    accept="png, jpg, jpeg"
                    hidden
                    onChange={handleCapture}
                  />
                </Button>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditMedals}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleConfirmEditMedal}>
              {t("description.Ok")}{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

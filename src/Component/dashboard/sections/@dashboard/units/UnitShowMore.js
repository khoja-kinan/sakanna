import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  IconButton,
  TextField,
  InputLabel,
  Stack,
  Select,
  MenuItem,
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
import { UnitUrl } from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function UnitShowMore({ item, token, typeId, FloorsList }) {
  const ref = useRef(null);
  const { t, i18n } = useTranslation();

  const [openShowMoreDialog, setShowMoreDialog] = useState(false);
  const [appNumber, setAppNumber] = useState(item.Unit.apartment_number);
  const [appPrice, setappPrice] = useState(item.Unit.apartment_price);
  const [available, setAvailable] = useState(item.Unit.availability);
  const [floorId, setFloorId] = useState(item.Unit.floors_id);

  const handleClickopenShowMoreDialog = () => {
    setShowMoreDialog(true);
  };

  const handleCloseShowMoreDialog = () => {
    setShowMoreDialog(false);
  };
  const handleChangeAppNumber = (e) => {
    setAppNumber(e.target.value);
  };
  const handleChangeAppPrice = (e) => {
    setappPrice(e.target.value);
  };
  const handleChangeAvailable = (event) => {
    setAvailable(event.target.value);
  };
  const handleChangeFloorId = (event) => {
    setFloorId(event.target.value);
  };
  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("floors_id", floorId);
    formData.append("type_id", typeId);
    formData.append("apartment_number", appNumber);

    formData.append("apartment_price", appPrice);

    formData.append("availability", available);

    axios
      .post(`${UnitUrl}/${item.Unit.id}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setShowMoreDialog(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={handleClickopenShowMoreDialog}>
        <Iconify
          icon="fluent:clipboard-more-20-filled"
          width={20}
          height={20}
        />
      </IconButton>

      {/* Show More Dialog */}
      <Dialog
        disableEscapeKeyDown
        open={openShowMoreDialog}
        fullWidth
        onClose={handleCloseShowMoreDialog}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ marginTop: "1rem" }}
        >
          <DialogTitle>{t("Dashboard.EditUnit")}</DialogTitle>
        </Stack>
        <DialogContent sx={{ width: "100%" }}>
          <Box component="form">
            <Box>
              <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.appartmentNumber")}
                  value={appNumber}
                  onChange={handleChangeAppNumber}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.appartmentPrice")}
                  value={appPrice}
                  onChange={handleChangeAppPrice}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, maxWidth: "100%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.FloorsPageTitle")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={floorId}
                  onChange={handleChangeFloorId}
                >
                  <MenuItem value={""} disabled>
                    {t("Dashboard.FloorsPageTitle")}
                  </MenuItem>
                  {FloorsList !== undefined &&
                    FloorsList.map((floor) => (
                      <MenuItem value={floor.id} key={floor.id}>
                        {i18n.dir() === "ltr" ? floor.name : floor.name_ar}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, maxWidth: "100%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.availability")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={available}
                  onChange={handleChangeAvailable}
                >
                  <MenuItem value={""} disabled>
                    {t("Dashboard.availability")}
                  </MenuItem>
                  <MenuItem value={1}>{t("Dashboard.available")}</MenuItem>
                  <MenuItem value={0}>{t("Dashboard.notavailable")} </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          ></Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleCloseShowMoreDialog}>
            {t("Dashboard.Close")}
          </Button>

          <Button onClick={handleSaveChanges}>
            {t("Dashboard.saveChanges")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

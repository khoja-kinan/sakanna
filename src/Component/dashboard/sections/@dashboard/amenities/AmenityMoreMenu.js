import { useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import { DialogContentText } from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AddNewAmenity } from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function AmenityMoreMenu({ Amenity_id }) {
  const { t } = useTranslation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [state, setState] = useState("");

  /* Detelt Dialog */

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${AddNewAmenity}/${Amenity_id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <Button onClick={handleClickOpenDeleteDialog}>
        <Iconify icon="fluent:delete-32-filled" width={24} height={24} />
      </Button>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Dashboard.DeleteAmenityDialogTitle")}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ padding: "2rem", marginTop: "2rem" }}
        >
          <DialogContentText>
            {t("Dashboard.DeleteAmenityDialogMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>
            {" "}
            {t("Dashboard.Cancel")}
          </Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            {t("Dashboard.Ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

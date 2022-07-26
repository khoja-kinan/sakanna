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
import { EditFloorUrl, UnitUrl } from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function UnitMoreMenu({ unit_id, token }) {
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
      .delete(`${UnitUrl}/${unit_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
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
          {t("Dashboard.DeleteUnitDialogTitle")}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ padding: "2rem", marginTop: "2rem" }}
        >
          <DialogContentText>
            {t("Dashboard.DeleteUnitDialogMessage")}
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

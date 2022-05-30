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
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function UserMoreMenu1({
  pending_balance,
  overall_balance,
  withdraw_balance,
  user_id,
  user_status,
  token,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  /* 
      User Status
  */
  const [openEditStatus, setOpenEditStatus] = useState(false);
  const [status, setStatus] = useState(user_status);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpenEditStatus = () => {
    setOpenEditStatus(true);
  };

  const handleCloseEditStatus = () => {
    setOpenEditStatus(false);
  };

  const handleSubmitEditStatus = () => {
    const data = { user_id: user_id, status: status };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        `http://90.153.255.50/socialmediafamous/public/api/admin/users/changeStatus`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });

    setOpenEditStatus(false);
  };

  /* 
      User Balance
  */

  const [openEditBalance, setOpenEditBalance] = useState(false);
  const [pendingBalance, setPendingBalance] = useState(pending_balance);
  const [overalBalance, setOveralBalance] = useState(overall_balance);
  const [withdrawBalance, setWithdrawBalance] = useState(withdraw_balance);
  const handleChangePendingBalance = (event) => {
    setPendingBalance(event.target.value);
  };

  const handleChangeOveralBalance = (event) => {
    setOveralBalance(event.target.value);
  };

  const handleChangeWithdrawBalance = (event) => {
    setWithdrawBalance(event.target.value);
  };

  const handleClickOpenEditBalance = () => {
    setOpenEditBalance(true);
  };

  const handleCloseEditBalance = () => {
    setOpenEditBalance(false);
  };

  const handleSubmitEditBalance = () => {
    const data = {
      user_id: user_id,
      pending_balance: pendingBalance,
      overall_balance: overalBalance,
      withdraw_balance: withdrawBalance,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        `http://90.153.255.50/socialmediafamous/public/api/admin/users/update_balance`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenEditBalance(false);
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
          onClick={handleClickOpenEditStatus}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.UsersPageEditUserStatus")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openEditStatus}
          onClose={handleCloseEditStatus}
        >
          <DialogTitle>
            {t("description.EditUserStatusDialogTitle")}{" "}
          </DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.EditUserStatusDialogLabel")}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={status}
                  onChange={handleChangeStatus}
                  input={<OutlinedInput label="Status" />}
                >
                  <MenuItem value={0}>
                    {t("description.UsersPageUserStatusWaitingVerification")}
                  </MenuItem>
                  <MenuItem value={1}>
                    {t("description.UsersPageUserStatusActive")}
                  </MenuItem>
                  <MenuItem value={2}>
                    {t("description.UsersPageUserStatusDisabled")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditStatus}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleSubmitEditStatus}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenEditBalance}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.UsersPageEditUserBalance")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openEditBalance}
          onClose={handleCloseEditBalance}
        >
          <DialogTitle>
            {t("description.EditUserBalanceDialogTitle")}
          </DialogTitle>
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
                  label={t("description.UsersPageTableHeadPendingBalance")}
                  variant="outlined"
                  onChange={handleChangePendingBalance}
                  value={pendingBalance}
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
                  label={t("description.UsersPageTableHeadOverallBalance")}
                  variant="outlined"
                  onChange={handleChangeOveralBalance}
                  value={overalBalance}
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
                  label={t("description.UsersPageTableHeadWithdrawBalance")}
                  variant="outlined"
                  onChange={handleChangeWithdrawBalance}
                  value={withdrawBalance}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditBalance}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleSubmitEditBalance}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

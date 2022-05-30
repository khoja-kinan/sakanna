import { filter } from "lodash";
import axios from "axios";
import {
  CountriesListUrl,
  privilegesListUrl,
  specializationsListUrl,
  userListUrl,
} from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Box,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

// components

import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu1,
} from "../sections/@dashboard/user";
import { useTranslation } from "react-i18next";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import GetUsers from "../controller/GetUsers"; */
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const { t, i18n } = useTranslation();
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [state, setState] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [privilege, setPrivilege] = useState("");
  const [country, setCountry] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [USERLIST, setUSERLIST] = useState();
  const [privilegeList, setPrivilegeList] = useState([]);
  const [countryList, setCountriesList] = useState([]);
  const [SpecializationsList, setSpecializationsList] = useState([]);
  let navigate = useNavigate();
  let result;
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(userListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                result = data;
                setUSERLIST(result.data);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });

        /* privileges */
        axios
          .get(privilegesListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                result = data.data;
                setPrivilegeList(result);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });

        /* countries */
        axios
          .get(CountriesListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                result = data.data;
                setCountriesList(result);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        /* specialization */
        axios
          .get(specializationsListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                result = data.data;
                setSpecializationsList(result);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (USERLIST === undefined) {
    return null;
  }

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return t("description.UsersPageUserStatusWaitingVerification");
      case 1:
        return t("description.UsersPageUserStatusActive");
      case 2:
        return t("description.UsersPageUserStatusDisabled");
      default:
        return " ";
    }
  };
  const TABLE_HEAD = [
    {
      id: "name",
      label: t("description.UsersPageTableHeadUsername"),
      alignRight: false,
    },
    {
      id: "email",
      label: t("description.UsersPageTableHeadEmail"),
      alignRight: false,
    },
    {
      id: "status",
      label: t("description.UsersPageTableHeadStatus"),
      alignRight: false,
    },
    {
      id: "user_account.pending_balance",
      label: t("description.UsersPageTableHeadPendingBalance"),
      alignRight: false,
    },
    {
      id: "user_account.overall_balance",
      label: t("description.UsersPageTableHeadOverallBalance"),
      alignRight: false,
    },
    {
      id: "user_account.withdraw_balance",
      label: t("description.UsersPageTableHeadWithdrawBalance"),
      alignRight: false,
    },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  const users = filteredUsers.filter((user) => user.user_account !== null);

  const handleClickOpenNewUser = () => {
    setOpenNewUser(true);
  };

  const handleCloseNewUser = () => {
    setOpenNewUser(false);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeAccountType = (event) => {
    setAccountType(event.target.value);
  };
  const handleChangePrivilege = (event) => {
    setPrivilege(event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeSpecialization = (event) => {
    setSpecialization(event.target.value);
  };

  const handleAddNew = () => {
    const data = {
      name: username,
      email: email,
      password: password,
      country_id: country,
      account_type: accountType,
      privilege_id: privilege,
      specialization_id: specialization,
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        "http://90.153.255.50/socialmediafamous/public/api/admin/users/create",
        data,
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
    setOpenNewUser(false);
  };

  return (
    <Page title={t("description.UsersPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.UsersPageTitle")}
          </Typography>
          {roles.includes(2) && (
            <Button variant="contained" onClick={handleClickOpenNewUser}>
              {t("description.UsersPageNewUser")}
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewUser}
          onClose={handleCloseNewUser}
        >
          <DialogTitle>{t("description.NewUserDialogTitle")} </DialogTitle>
          <DialogContent sx={{ width: "22rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.NewUserDialogUsername")}
                  variant="outlined"
                  onChange={handleChangeUsername}
                  value={username}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.NewUserDialogEmail")}
                  variant="outlined"
                  onChange={handleChangeEmail}
                  value={email}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.NewUserDialogPassword")}
                  variant="outlined"
                  onChange={handleChangePassword}
                  value={password}
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
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.NewUserDialogAccountType")}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={accountType}
                  onChange={handleChangeAccountType}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogAccountType")}
                    />
                  }
                >
                  <MenuItem value={0}>
                    {t("description.NewUserDialogAccountTypeAdmin")}{" "}
                  </MenuItem>
                  <MenuItem value={1}>
                    {t("description.NewUserDialogAccountTypeAdvertiser")}
                  </MenuItem>
                  <MenuItem value={2}>
                    {t("description.NewUserDialogAccountTypeInfluencer")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.NewUserDialogPrivileges")}{" "}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={privilege}
                  onChange={handleChangePrivilege}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogPrivileges")}
                    />
                  }
                >
                  {privilegeList.map((pri) => (
                    <MenuItem value={pri.id} key={pri.id}>
                      {pri.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.NewUserDialogSpecialization")}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={specialization}
                  onChange={handleChangeSpecialization}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogSpecialization")}
                    />
                  }
                >
                  {SpecializationsList.map((spec) => (
                    <MenuItem value={spec.id} key={spec.id}>
                      {i18n.dir() === "ltr" ? spec.name_en : spec.name_ar}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel id="demo-dialog-select-label">
                  {" "}
                  {t("description.NewUserDialogCountry")}{" "}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={country}
                  onChange={handleChangeCountry}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogCountry")}
                    />
                  }
                >
                  {countryList.map((ctry) => (
                    <MenuItem value={ctry.id} key={ctry.id}>
                      {i18n.dir() === "ltr" ? ctry.name_en : ctry.name_ar}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewUser}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleAddNew}>{t("description.Ok")} </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("description.UsersPageSearchPlaceholder")}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {
                    /* const users = filteredUsers.filter((user) ) */
                    users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { id, name, status, email } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>

                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  getStatus(status) ==
                                  t(
                                    "description.UsersPageUserStatusWaitingVerification"
                                  )
                                    ? "warning"
                                    : getStatus(status) ==
                                      t(
                                        "description.UsersPageUserStatusDisabled"
                                      )
                                    ? "error"
                                    : "success"
                                }
                              >
                                {getStatus(status)}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              {row.user_account === null
                                ? "0"
                                : row.user_account.pending_balance}
                            </TableCell>
                            <TableCell align="left">
                              {row.user_account === null
                                ? "0"
                                : row.user_account.overall_balance}
                            </TableCell>
                            <TableCell align="left">
                              {row.user_account === null
                                ? "0"
                                : row.user_account.withdraw_balance}
                            </TableCell>
                            {roles.includes(3) && (
                              <TableCell align="right">
                                <UserMoreMenu1
                                  user_status={status}
                                  user_id={id}
                                  pending_balance={
                                    row.user_account.pending_balance
                                  }
                                  overall_balance={
                                    row.user_account.overall_balance
                                  }
                                  withdraw_balance={
                                    row.user_account.withdraw_balance
                                  }
                                  token={token}
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}

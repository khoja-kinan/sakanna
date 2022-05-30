import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  TextField,
  DialogActions,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  MedalsMoreMenu,
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import { getSpecializations } from "../controller/SpecializationsController";
 */ import { medalsListUrl } from "../constants/urls";

import { useCookies } from "react-cookie";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
      (_user) =>
        _user.name_ar.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.name_en.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Medals() {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const { t } = useTranslation();

  const [cookies, setCookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewMedal, setOpenNewMedal] = useState(false);
  const [arName, setArname] = useState("");
  const [enName, setEnName] = useState("");
  const [medalImage, setMedalImage] = useState("");
  const [state, setState] = useState("");

  const [MedalsList, setMedalsList] = useState([]);
  let navigate = useNavigate();
  let result;
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(medalsListUrl, {
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
                setMedalsList(result);
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
  if (MedalsList.length === 0) {
    return null;
  }
  const TABLE_HEAD = [
    {
      id: "name_ar",
      label: t("description.MedalsPageTabelHeadArName"),
      alignRight: false,
    },
    {
      id: "name_en",
      label: t("description.MedalsPageTabelHeadEnName"),
      alignRight: false,
    },
    {
      id: "image",
      label: t("description.MedalsPageTabelimage"),
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
      const newSelecteds = MedalsList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MedalsList.length) : 0;

  const filteredUsers = applySortFilter(
    MedalsList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;
  /* 
      New Medal
  */
  const handleClickOpenNewMedal = () => {
    setOpenNewMedal(true);
  };

  const handleCloseNewMedal = () => {
    setOpenNewMedal(false);
  };

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };
  const formData = new FormData();
  const handleAddNew = () => {
    formData.append("name_ar", arName);
    formData.append("name_en", enName);

    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(
        "http://90.153.255.50/socialmediafamous/public/api/admin/medals/create",
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
    setOpenNewMedal(false);
  };

  const handleCapture = (e) => {
    const medalImage = e.target.files[0];

    formData.append("image", medalImage, medalImage.name);
  };
  return (
    <Page title={t("description.MedalsPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.MedalsPageTitle")}
          </Typography>
          {roles.includes(18) && (
            <Button variant="contained" onClick={handleClickOpenNewMedal}>
              {t("description.MedalsPageNewButton")}
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewMedal}
          onClose={handleCloseNewMedal}
        >
          <DialogTitle>{t("description.MedalsPageNewButton")} </DialogTitle>
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
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
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
            <Button onClick={handleCloseNewMedal}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleAddNew}>{t("description.Ok")} </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("description.MedalsPageSearchPlaceholder")}
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
                  rowCount={MedalsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name_ar, name_en, image } = row;
                      const isItemSelected = selected.indexOf(name_ar) !== -1;

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
                              onChange={(event) => handleClick(event, name_ar)}
                            />
                          </TableCell>
                          <TableCell align="left">{name_ar}</TableCell>
                          <TableCell align="left">{name_en}</TableCell>
                          <TableCell align="left">
                            <Avatar
                              alt={image}
                              src={image}
                              sx={{ float: "left" }}
                            />
                          </TableCell>
                          {roles.includes(19) && (
                            <TableCell align="right">
                              <MedalsMoreMenu
                                medal_id={id}
                                Arabic_name={name_ar}
                                English_name={name_en}
                                token={token}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={MedalsList.length}
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

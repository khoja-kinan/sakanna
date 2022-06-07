import { filter } from "lodash";
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
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  SpecializationMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//
import { useCookies } from "react-cookie";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { GetAllCommunities } from "../../../constants/urls";

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
        /*  _user.name_ar.toLowerCase().indexOf(query.toLowerCase()) !== -1 || */
        _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Comunities() {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const { t, i18n } = useTranslation();
  const [cookies, setCookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewComunity, setOpenNewComunity] = useState(false);
  const [arName, setArname] = useState("");
  const [enName, setEnName] = useState("");
  const [state, setState] = useState("");

  const [ComunitiesList, setComunitiesList] = useState([]);
  let navigate = useNavigate();
  let result;
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      /* if (token === null) {
        navigate("/");
      } else { */
      axios
        .get(GetAllCommunities, {
          /* headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            }, */
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setComunitiesList(data);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    /* } */
    fecthData();
  }, []);
  if (ComunitiesList.length === 0) {
    return null;
  }
  const TABLE_HEAD = [
    {
      id: "name_ar",
      label: t("Dashboard.ComunityDialogArName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "name",
      label: t("Dashboard.ComunityDialogEnName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    /*  {
      id: "description_Ar",
      label: t("Dashboard.ComunityDialogArDescription"),
      alignRight: false,
    },
    {
      id: "description_En",
      label: t("Dashboard.ComunityDialogEnDescription"),
      alignRight: false,
    }, */
    {
      id: "location",
      label: t("Dashboard.ComunityDialogLocation"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    /* {
      id: "latitude",
      label: t("Dashboard.ComunityDialogLatitude"),
      alignRight: false,
    },
    {
      id: "longitude",
      label: t("Dashboard.ComunityDialogLongitude"),
      alignRight: false,
    },
    {
      id: "location_description_Ar",
      label: t("Dashboard.ComunityDialoglocation_description_Ar"),
      alignRight: false,
    },
    {
      id: "location_description_En",
      label: t("Dashboard.ComunityDialoglocation_description_En"),
      alignRight: false,
    },
    {
      id: "location_image",
      label: t("Dashboard.ComunityDialoglocation_image"),
      alignRight: false,
    }, */
    {
      id: "type",
      label: t("Dashboard.ComunityDialoType"),
      alignRight: i18n.dir() === "ltr" ? false : true,
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
      const newSelecteds = ComunitiesList.map((n) => n.name);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - ComunitiesList.length)
      : 0;

  const filteredUsers = applySortFilter(
    ComunitiesList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New Specialization
  */
  const handleClickopenNewComunity = () => {
    setOpenNewComunity(true);
  };

  const handleCloseNewSpecialization = () => {
    setOpenNewComunity(false);
  };

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };

  const handleAddNew = () => {
    const data = { name_ar: arName, name_en: enName };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        "http://90.153.255.50/socialmediafamous/public/api/admin/specializations/create",
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
    setOpenNewComunity(false);
  };
  console.log(filteredUsers);
  return (
    <Page title={t("Dashboard.ComunitiesPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.ComunitiesPageTitle")}
          </Typography>
          <Button variant="contained" onClick={handleClickopenNewComunity}>
            {t("Dashboard.ComunitiesAddNew")}
          </Button>
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openNewComunity}
          onClose={handleCloseNewSpecialization}
        >
          <DialogTitle>
            {t("description.NewSpecializationsDialogTitle")}
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
                  label={t("description.NewSpecializationsDialogArName")}
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
                  label={t("description.NewSpecializationsDialogEnName")}
                  variant="outlined"
                  onChange={handleChangeEnName}
                  value={enName}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewSpecialization}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleAddNew}>{t("description.Ok")} </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.ComunitiesPageSearchPlaceHolder")}
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
                  rowCount={ComunitiesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name_ar, name, location, type } = row;
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
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="right">
                            <SpecializationMoreMenu
                              Specialization_id={id}
                              Arabic_name={name_ar}
                              English_name={name}
                              token={token}
                            />
                          </TableCell>
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
            count={ComunitiesList.length}
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

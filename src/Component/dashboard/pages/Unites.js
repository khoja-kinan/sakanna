import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
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
  InputLabel,
  LinearProgress,
  Select,
  MenuItem,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
//
import axios from "axios";
import { useTranslation } from "react-i18next";
import { baseUrl, getComunityFloor, UnitUrl } from "../../../constants/urls";
import UnitMoreMenu from "../sections/@dashboard/units/UnitMoreMenu";
import UnitShowMore from "../sections/@dashboard/units/UnitShowMore";

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

export default function Unites() {
  const { typeId } = useParams();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewFloor, setOpenNewFloor] = useState(false);

  const handleClickopenNewFloor = () => {
    setOpenNewFloor(true);
  };

  const handleCloseNewFloor = () => {
    setOpenNewFloor(false);
  };
  const [appNumber, setAppNumber] = useState();
  const [appPrice, setappPrice] = useState();
  const [available, setAvailable] = useState("");
  const [floorId, setFloorId] = useState("");

  const [UnitesList, setUnitesList] = useState();
  const [FloorsList, setFloorsList] = useState();

  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${baseUrl}/${typeId}/Units`, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;

              setUnitesList(data);
              response.data.length !== 0 &&
                axios
                  .get(
                    `${getComunityFloor}${response.data[0].community_id}/floors`,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                      },
                    }
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      const data = response.data;

                      setFloorsList(data);
                    }
                  })
                  .catch((error) => {
                    console.log(error.response);
                  });
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, []);

  if (UnitesList === undefined) {
    return <LinearProgress />;
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
  const TABLE_HEAD = [
    {
      id: "type_name",
      label: t("Dashboard.tableHeadTypeName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "floor_name",
      label: t("Dashboard.tableHeadFloorName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "appartmentNumber",
      label: t("Dashboard.appartmentNumber"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "appartmentPrice",
      label: t("Dashboard.appartmentPrice"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "availablility",
      label: t("Dashboard.availability"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "edit",
      label: t("Dashboard.edit"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - UnitesList.length) : 0;

  const filteredUsers = applySortFilter(
    UnitesList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New Unit
  */

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
      .post(`${UnitUrl}`, formData, {
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
    setOpenNewFloor(false);
  };
  return (
    <Page title={t("Dashboard.UnitsPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.UnitsPageTitle")}
          </Typography>
          <Button variant="contained" onClick={handleClickopenNewFloor}>
            {t("Dashboard.ComunitiesAddNew")}
          </Button>
        </Stack>
        {/* Add New Dialog */}
        <Dialog
          disableEscapeKeyDown
          open={openNewFloor}
          fullWidth
          onClose={handleCloseNewFloor}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ marginTop: "1rem" }}
          >
            <DialogTitle>{t("Dashboard.NewUnit")}</DialogTitle>
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
                    <MenuItem value={0}>
                      {t("Dashboard.notavailable")}{" "}
                    </MenuItem>
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
            <Button onClick={handleCloseNewFloor}>
              {t("Dashboard.Close")}
            </Button>

            <Button onClick={handleSaveChanges}>
              {t("Dashboard.saveChanges")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* tabel */}
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.unitsPageSearchPlaceHolder")}
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
                  rowCount={UnitesList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          key={row.Unit.id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr"
                              ? row.type_name
                              : row.type_name_ar}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr"
                              ? row.floor_name
                              : row.floor_name_ar}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.Unit.apartment_number}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.Unit.apartment_price} {t("Comunity.sar")}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.Unit.availability === 0
                              ? t("Dashboard.notavailable")
                              : t("Dashboard.available")}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <UnitShowMore
                              item={row}
                              token={token}
                              typeId={typeId}
                              FloorsList={FloorsList}
                            />
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <UnitMoreMenu unit_id={row.Unit.id} token={token} />
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
            count={UnitesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("Dashboard.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}

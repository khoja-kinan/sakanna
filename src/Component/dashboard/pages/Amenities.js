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
  InputLabel,
  MenuItem,
  Select,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
//
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  AddNewAmenity,
  getAmenitiesByCommunityId,
  getTypeById,
  NewTypeUrl,
} from "../../../constants/urls";
import TypeShowMore from "../sections/@dashboard/types/TypeShowMore";
import TypeMoreMenu from "../sections/@dashboard/types/TypeMoreMenu";
import AmenityShowMore from "../sections/@dashboard/amenities/AmenityShowMore";
import AmenityMoreMenu from "../sections/@dashboard/amenities/AmenityMoreMenu";

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

export default function Amenities() {
  const { communityId } = useParams();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewType, setOpenNewType] = useState(false);

  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();

  const [previewTypePlanImage, setPreviewTypePlanImage] = useState(null);
  const [typePlanImageToUpload, setTypePlanImageToUpload] = useState("");

  const [AmenitiesList, setAmenitiesList] = useState([]);
  let navigate = useNavigate();
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      /* if (token === null) {
        navigate("/");
      } else { */
      axios
        .get(`${getAmenitiesByCommunityId}/${communityId}`, {
          /* headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            }, */
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setAmenitiesList(data);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    /* } */
    fecthData();
  }, []);

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
      id: "name",
      label: t("Dashboard.tableHeadAmenityName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "show_more",
      label: t("Dashboard.showMore"),
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AmenitiesList.length) : 0;

  const filteredUsers = applySortFilter(
    AmenitiesList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      NewAmenity
  */

  const handleCaptureComunityImage = (e) => {
    setTypePlanImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewTypePlanImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClickopenNewType = () => {
    setOpenNewType(true);
  };

  const handleCloseNewType = () => {
    setOpenNewType(false);
  };

  const handleChangeNameAr = (e) => {
    setNameAr(e.target.value);
  };
  const handleChangeNameEn = (e) => {
    setNameEn(e.target.value);
  };

  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("communityId", communityId);
    formData.append("name", nameEn);

    formData.append("name_ar", nameAr);

    formData.append("image", typePlanImageToUpload);

    axios
      .post(`${AddNewAmenity}`, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setOpenNewType(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return AmenitiesList === undefined ? (
    <LinearProgress />
  ) : (
    <Page title={t("Dashboard.AmenitiesPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.AmenitiesPageTitle")}
          </Typography>
          <Button variant="contained" onClick={handleClickopenNewType}>
            {t("Dashboard.ComunitiesAddNew")}
          </Button>
        </Stack>
        {/* Add New Dialog */}
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openNewType}
          onClose={handleCloseNewType}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ marginTop: "1rem" }}
          >
            <DialogTitle>{t("Dashboard.AmenityInfo")}</DialogTitle>
          </Stack>
          <DialogContent sx={{ width: "100%" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogArName")}
                  value={nameAr}
                  onChange={handleChangeNameAr}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogEnName")}
                  value={nameEn}
                  onChange={handleChangeNameEn}
                />
              </FormControl>

              {/* Amenity Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <InputLabel>{t("Dashboard.AmenityImage")}</InputLabel>
                <Box className="upload__image-wrapper">
                  {previewTypePlanImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={previewTypePlanImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewTypePlanImage(null)}
                        >
                          {t("Dashboard.remove")}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      sx={{ margin: "1rem 0" }}
                      variant="outlined"
                      component="label"
                    >
                      {t("Dashboard.uploadAmenityImage")}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleCaptureComunityImage}
                      />
                    </Button>
                  )}
                </Box>
              </FormControl>
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
            <Button onClick={handleCloseNewType}>{t("Dashboard.Close")}</Button>

            <Button onClick={handleSaveChanges}>
              {t("Dashboard.saveChanges")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* tabel */}
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.AmenitiesPageSearchPlaceHolder")}
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
                  rowCount={AmenitiesList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr" ? row.name : row.name_ar}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <AmenityShowMore item={row} />
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <AmenityMoreMenu Amenity_id={row.id} />
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
            count={AmenitiesList.length}
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

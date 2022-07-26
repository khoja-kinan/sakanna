import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  MenuItem,
  Select,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  ComunityMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//
import axios from "axios";
import { useTranslation } from "react-i18next";
import { GetAllCommunities, getComunityById } from "../../../constants/urls";
import { Link } from "react-router-dom";

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
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewComunity, setOpenNewComunity] = useState(false);
  const [arName, setArname] = useState();
  const [enName, setEnName] = useState();
  const [state, setState] = useState();
  const [long, setLongitude] = useState();
  const [lat, setLatitude] = useState();
  const [loc, setLoc] = useState();
  const [loc_ar, setLoc_ar] = useState();
  const [typ, setType] = useState();
  const [typ_ar, setType_ar] = useState();
  const [Desc, setDesc] = useState();
  const [Desc_ar, setDesc_ar] = useState();
  const [LocDesc, setLocDesc] = useState();
  const [LocDesc_ar, setLocDesc_ar] = useState();

  const [comunityImage, setComunityImage] = useState();
  const [comunityImageToUpload, setComunityImageToUpload] = useState();
  const [locationImage, setLocationImage] = useState();
  const [locationImageToUpload, setLocationImageToUpload] = useState();

  const [ComunitiesList, setComunitiesList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(GetAllCommunities, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
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
    }
    fecthData();
  }, []);
  if (ComunitiesList === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: t("Dashboard.comunityTabeHeadName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "location",
      label: t("Dashboard.comunityTabeHeadLocation"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "type",
      label: t("Dashboard.comunityTabeHeadType"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "type_settings",
      label: t("Dashboard.comunityTabeHeadTypeSettings"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "amenities_settings",
      label: t("Dashboard.comunityTabeHeadAmenitiesSettings"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "floors_settings",
      label: t("Dashboard.comunityTabeHeadFloorsSettings"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "interior_settings",
      label: t("Dashboard.comunityTabeHeadInteriorSettings"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "community_gallery",
      label: t("Dashboard.comunityTabeHeadCommunityGallery"),
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
      New Comunity
  */
  const formData = new FormData();

  const handleClickopenNewComunity = () => {
    setOpenNewComunity(true);
  };

  const handleCloseNewComunity = () => {
    setOpenNewComunity(false);
  };

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };

  const handleChangeLatitude = (event) => {
    setLatitude(event.target.value);
  };
  const handleChangeLongitude = (event) => {
    setLongitude(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLoc(event.target.value);
  };
  const handleChangeLocationAr = (event) => {
    setLoc_ar(event.target.value);
  };
  const handleChangeTyp = (event) => {
    setType(event.target.value);
  };
  const handleChangeTypAr = (event) => {
    setType_ar(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleChangeDescAr = (event) => {
    setDesc_ar(event.target.value);
  };
  const handleChangeLocDesc = (event) => {
    setLocDesc(event.target.value);
  };
  const handleChangeLocDescAr = (event) => {
    setLocDesc_ar(event.target.value);
  };

  const handleCaptureComunityImage = (e) => {
    setComunityImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setComunityImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCaptureLocationImage = (e) => {
    setLocationImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLocationImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleAddNew = () => {
    formData.append("name", enName);
    formData.append("name_ar", arName);
    formData.append("description", Desc);
    formData.append("description_ar", Desc_ar);
    formData.append("longitude", long);
    formData.append("latitude", lat);
    formData.append("location", loc);
    formData.append("location_ar", loc_ar);
    formData.append("location_description", LocDesc);
    formData.append("location_description_ar", LocDesc_ar);
    formData.append("type", typ);
    formData.append("type_ar", typ_ar);
    formData.append("image", comunityImageToUpload, comunityImageToUpload.name);
    formData.append(
      "location_image",
      locationImageToUpload,
      locationImageToUpload.name
    );

    axios
      .post(getComunityById, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
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
    setOpenNewComunity(false);
  };
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
        {/* add new comunity dialog */}
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openNewComunity}
          onClose={handleCloseNewComunity}
        >
          <DialogTitle>{t("Dashboard.NewComunity")}</DialogTitle>
          <DialogContent sx={{ width: "100%" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogArName")}
                  onChange={handleChangeArName}
                  value={arName}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogEnName")}
                  onChange={handleChangeEnName}
                  value={enName}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogLatitude")}
                  onChange={handleChangeLatitude}
                  value={lat}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogLongitude")}
                  onChange={handleChangeLongitude}
                  value={long}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogLocationAr")}
                  onChange={handleChangeLocationAr}
                  value={loc_ar}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogLocation")}
                  onChange={handleChangeLocation}
                  value={loc}
                />
              </FormControl>

              <FormControl sx={{ m: 1, maxWidth: "30%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.ComunityDialoTypeAr")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={typ_ar}
                  onChange={handleChangeTypAr}
                >
                  <MenuItem value="فيلا">فيلا</MenuItem>
                  <MenuItem value="شقة عادية">شقة عادية </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, maxWidth: "30%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.ComunityDialoType")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={typ}
                  onChange={handleChangeTyp}
                >
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="normal">Normal </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={6}
                  label={t("Dashboard.ComunityDialogComunityDescriptionAr")}
                  onChange={handleChangeDescAr}
                  value={Desc_ar}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={6}
                  label={t("Dashboard.ComunityDialogComunityDescription")}
                  onChange={handleChangeDesc}
                  value={Desc}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={6}
                  label={t("Dashboard.ComunityDialogLocationDescriptionAr")}
                  onChange={handleChangeLocDescAr}
                  value={LocDesc_ar}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={6}
                  label={t("Dashboard.ComunityDialogLocationDescription")}
                  onChange={handleChangeLocDesc}
                  value={LocDesc}
                />
              </FormControl>
              {/* comunity Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <InputLabel>{t("Dashboard.ComunityImage")}</InputLabel>
                <Box className="upload__image-wrapper">
                  {comunityImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={comunityImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setComunityImage(null)}
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
                      {t("Dashboard.uploadComunityImage")}
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
              {/* location Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <InputLabel>{t("Dashboard.locationImage")}</InputLabel>
                <Box className="upload__image-wrapper">
                  {locationImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={locationImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setLocationImage(null)}
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
                      {t("Dashboard.uploadLocationImage")}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleCaptureLocationImage}
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
            <Button onClick={handleCloseNewComunity}>
              {t("Dashboard.Cancel")}
            </Button>
            <Button onClick={handleAddNew}>{t("Dashboard.Ok")}</Button>
          </DialogActions>
        </Dialog>
        {/* tabel */}
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.ComunitiesPageSearchPlaceHolder")}
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
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name_ar,
                        name,
                        location,
                        location_ar,
                        type,
                        type_ar,
                        description,
                        description_ar,
                        image,
                        latitude,
                        longitude,
                        location_description,
                        location_description_ar,
                        location_image,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr" ? name : name_ar}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr" ? location : location_ar}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr" ? type : type_ar}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/types/${id}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {i18n.dir() === "ltr"
                                ? "Show Types"
                                : "إظهار الأنماط"}
                            </Link>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/amenities/${id}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {i18n.dir() === "ltr"
                                ? "Show Amenities"
                                : "إظهار وسائل الراحة"}
                            </Link>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/floors/${id}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {i18n.dir() === "ltr"
                                ? "Show Floors"
                                : "إظهار الطوابق"}
                            </Link>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/interior/${id}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {i18n.dir() === "ltr"
                                ? "Show Interior Samples"
                                : "إظهار التصاميم الداخلية"}
                            </Link>
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <Link
                              to={`/dashboard/gallery/${id}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {i18n.dir() === "ltr"
                                ? "Show gallery"
                                : "إظهار المعرض "}
                            </Link>
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <ComunityMoreMenu
                              Comunity_id={id}
                              Arabic_name={name_ar}
                              English_name={name}
                              Location={location}
                              Location_ar={location_ar}
                              type={type}
                              type_ar={type_ar}
                              description={description}
                              description_ar={description_ar}
                              comunityImage={image}
                              Latitude={latitude}
                              Longitude={longitude}
                              token={token}
                              locationDesc={location_description}
                              locationDescAr={location_description_ar}
                              location_image={location_image}
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
            labelRowsPerPage={t("Dashboard.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}

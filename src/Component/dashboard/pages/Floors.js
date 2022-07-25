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
  EditFloorUrl,
  getComunityFloor,
  NewTypeUrl,
} from "../../../constants/urls";
import FloorMoreMenu from "../sections/@dashboard/floors/FloorMoreMenu";
import FloorShowMore from "../sections/@dashboard/floors/FloorShowMore";

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

export default function Floors() {
  const { communityId } = useParams();
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
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();
  const [carSlots, setcarSlots] = useState();
  const [numberOfApartments, setNumberOfApartments] = useState();
  const [numberOfPenthouses, setNumberOfPenthouses] = useState();
  const [percentOfResidential, setPercentOfResidential] = useState();
  const [area, setArea] = useState();
  const [percentOfAmenities, setPercentOfAmenities] = useState();
  const [percentOfServices, setPercentOfServices] = useState();
  const [totalOutdoorAreas, setTotalOutdoorAreas] = useState();
  const [Foyer1, setFoyer1] = useState();
  const [Foyer2, setFoyer2] = useState();
  const [bedroom1, setBedroom1] = useState();
  const [bedroom2, setBedroom2] = useState();
  const [TandB1, setTandB1] = useState();
  const [TandB2, setTandB2] = useState();
  const [TandB3, setTandB3] = useState();
  const [Master_Bedroom, setMaster_Bedroom] = useState();
  const [Lobby, setLobby] = useState();
  const [Majles, setMajles] = useState();

  const [Balcony, setBalcony] = useState();
  const [Balcony1, setBalcony1] = useState();
  const [Balcony2, setBalcony2] = useState();
  const [Balcony3, setBalcony3] = useState();
  const [Family_Living, setFamily_Living] = useState();
  const [Closet, setCloset] = useState();
  const [Open_Kitchen, setOpen_Kitchen] = useState();
  const [laundry, setLaundry] = useState();
  const [description, setDescription] = useState();
  const [descriptionAr, setDescriptionAr] = useState();

  const [TypePlanImageToShow, setTypePlanImageToShow] = useState();
  const [previewTypePlanImage, setPreviewTypePlanImage] = useState(null);
  const [typePlanImageToUpload, setTypePlanImageToUpload] = useState("");

  const [FloorsList, setFloorsList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${getComunityFloor}${communityId}/floors`, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
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
    }
    fecthData();
  }, []);

  if (FloorsList === undefined) {
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
      id: "name",
      label: t("Dashboard.tableHeadFloorName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "area",
      label: t("Dashboard.area"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "percent_of_residential",
      label: t("Dashboard.tableHeadFloorPercentOfResidential"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "PercentOfAmenties",
      label: t("Dashboard.tableHeadFloorPercentOfAmenties"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "PercentOfServices",
      label: t("Dashboard.tableHeadFloorPercentOfServices"),
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - FloorsList.length) : 0;

  const filteredUsers = applySortFilter(
    FloorsList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      NewType
  */

  const handleCaptureComunityImage = (e) => {
    setTypePlanImageToShow(null);
    setTypePlanImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewTypePlanImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleChangeNameAr = (e) => {
    setNameAr(e.target.value);
  };
  const handleChangeNameEn = (e) => {
    setNameEn(e.target.value);
  };
  const handleChangecarSlots = (e) => {
    setcarSlots(e.target.value);
  };
  const handleChangenumberOfApartments = (e) => {
    setNumberOfApartments(e.target.value);
  };
  const handleChangenumberOfPenthouses = (e) => {
    setNumberOfPenthouses(e.target.value);
  };
  const handleChangepercentOfResidential = (e) => {
    setPercentOfResidential(e.target.value);
  };
  const handleChangeArea = (e) => {
    setArea(e.target.value);
  };
  const handleChangepercentOfAmenities = (e) => {
    setPercentOfAmenities(e.target.value);
  };
  const handleChangepercentOfServices = (e) => {
    setPercentOfServices(e.target.value);
  };
  const handleChangetotalOutdoorAreas = (e) => {
    setTotalOutdoorAreas(e.target.value);
  };
  const handleChangeFoyer1 = (e) => {
    setFoyer1(e.target.value);
  };
  const handleChangeFoyer2 = (e) => {
    setFoyer2(e.target.value);
  };
  const handleChangeBedroom1 = (e) => {
    setBedroom1(e.target.value);
  };
  const handleChangeBedroom2 = (e) => {
    setBedroom2(e.target.value);
  };
  const handleChangeTandB1 = (e) => {
    setTandB1(e.target.value);
  };
  const handleChangeMaster_Bedroom = (e) => {
    setMaster_Bedroom(e.target.value);
  };
  const handleChangeTandB2 = (e) => {
    setTandB2(e.target.value);
  };
  const handleChangeTandB3 = (e) => {
    setTandB3(e.target.value);
  };
  const handleChangeLobby = (e) => {
    setLobby(e.target.value);
  };

  const handleChangeBalcony = (e) => {
    setBalcony(e.target.value);
  };
  const handleChangeBalcony1 = (e) => {
    setBalcony1(e.target.value);
  };
  const handleChangeFamily_Living = (e) => {
    setFamily_Living(e.target.value);
  };
  const handleChangeMajles = (e) => {
    setMajles(e.target.value);
  };
  const handleChangeBalcony2 = (e) => {
    setBalcony2(e.target.value);
  };
  const handleChangeBalcony3 = (e) => {
    setBalcony3(e.target.value);
  };
  const handleChangeCloset = (e) => {
    setCloset(e.target.value);
  };

  const handleChangeOpen_Kitchen = (e) => {
    setOpen_Kitchen(e.target.value);
  };
  const handleChangeLaundry = (e) => {
    setLaundry(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeDescriptionAr = (e) => {
    setDescriptionAr(e.target.value);
  };
  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("communityId", communityId);
    formData.append("name", nameEn);

    formData.append("name_ar", nameAr);

    formData.append("carSlots", carSlots);

    formData.append("numberOfAvailable", numberOfApartments);

    formData.append("numberOfPenthouses", numberOfPenthouses);

    formData.append("percentOfResidential", percentOfResidential);

    formData.append("area", area);

    formData.append("percentOfAmenities", percentOfAmenities);

    formData.append("percentOfServices", percentOfServices);

    formData.append("totalOutdoorAreas", totalOutdoorAreas);

    formData.append("Foyer1", Foyer1);

    formData.append("Foyer2", Foyer2);

    formData.append("bedroom1", bedroom1);

    formData.append("bedroom2", bedroom2);

    formData.append("TandB1", TandB1);

    formData.append("Master_Bedroom", Master_Bedroom);

    formData.append("TandB2", TandB2);

    formData.append("TandB3", TandB3);

    formData.append("Lobby", Lobby);

    formData.append("Balcony", Balcony);

    formData.append("Balcony1", Balcony1);

    formData.append("Family_Living", Family_Living);

    formData.append("Majles", Majles);

    formData.append("Balcony2", Balcony2);

    formData.append("Balcony3", Balcony3);

    formData.append("Closet", Closet);

    formData.append("Open_Kitchen", Open_Kitchen);

    formData.append("laundry", laundry);

    formData.append("description", description);

    formData.append("description_ar", descriptionAr);
    formData.append("type_id", 0);
    formData.append("type", " ");

    formData.append("image", typePlanImageToUpload);

    axios
      .post(`${EditFloorUrl}`, formData, {
        headers: {
          Accept: "application/json",
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
    <Page title={t("Dashboard.FloorsPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.FloorsPageTitle")}
          </Typography>
          <Button variant="contained" onClick={handleClickopenNewFloor}>
            {t("Dashboard.ComunitiesAddNew")}
          </Button>
        </Stack>
        {/* Add New Dialog */}
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openNewFloor}
          onClose={handleCloseNewFloor}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ marginTop: "1rem" }}
          >
            <DialogTitle>{t("Dashboard.NewFloor")}</DialogTitle>
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
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.TotalArea")}
                  value={area}
                  type="number"
                  onChange={handleChangeArea}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.carSlots")}
                  value={carSlots}
                  type="number"
                  onChange={handleChangecarSlots}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadTypenumberOfApartments")}
                  value={numberOfApartments}
                  type="number"
                  onChange={handleChangenumberOfApartments}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadTypenumberOfPenthouses")}
                  value={numberOfPenthouses}
                  type="number"
                  onChange={handleChangenumberOfPenthouses}
                />
              </FormControl>{" "}
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadFloorPercentOfResidential")}
                  value={percentOfResidential}
                  type="number"
                  onChange={handleChangepercentOfResidential}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadFloorPercentOfAmenties")}
                  value={percentOfAmenities}
                  type="number"
                  onChange={handleChangepercentOfAmenities}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadFloorPercentOfServices")}
                  value={percentOfServices}
                  type="number"
                  onChange={handleChangepercentOfServices}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.totalOutdoorAreas")}
                  type="number"
                  value={totalOutdoorAreas}
                  onChange={handleChangetotalOutdoorAreas}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Majles")}
                  value={Majles}
                  type="number"
                  onChange={handleChangeMajles}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label="Foyer 1"
                  value={Foyer1}
                  type="number"
                  onChange={handleChangeFoyer1}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label="Foyer 2"
                  value={Foyer2}
                  type="number"
                  onChange={handleChangeFoyer2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label="T&B1"
                  type="number"
                  value={TandB1}
                  onChange={handleChangeTandB1}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label="T&B2"
                  value={TandB2}
                  onChange={handleChangeTandB2}
                  type="number"
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label="T&B3"
                  value={TandB3}
                  type="number"
                  onChange={handleChangeTandB3}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bedroom1")}
                  value={bedroom1}
                  type="number"
                  onChange={handleChangeBedroom1}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bedroom2")}
                  value={bedroom2}
                  type="number"
                  onChange={handleChangeBedroom2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.MasterBedroom")}
                  type="number"
                  value={Master_Bedroom}
                  onChange={handleChangeMaster_Bedroom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Lobby")}
                  type="number"
                  value={Lobby}
                  onChange={handleChangeLobby}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Balcony")}
                  value={Balcony}
                  type="number"
                  onChange={handleChangeBalcony}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Balcony1")}
                  type="number"
                  value={Balcony1}
                  onChange={handleChangeBalcony1}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Balcony2")}
                  type="number"
                  value={Balcony2}
                  onChange={handleChangeBalcony2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Balcony3")}
                  type="number"
                  value={Balcony3}
                  onChange={handleChangeBalcony3}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Living")}
                  value={Family_Living}
                  type="number"
                  onChange={handleChangeFamily_Living}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Open_Kitchen")}
                  value={Open_Kitchen}
                  type="number"
                  onChange={handleChangeOpen_Kitchen}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Closet")}
                  value={Closet}
                  type="number"
                  onChange={handleChangeCloset}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "60%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.laundry")}
                  value={laundry}
                  type="number"
                  onChange={handleChangeLaundry}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-multiline-static"
                  multiline
                  rows={3}
                  label={t("Dashboard.FloorDescription")}
                  value={description}
                  onChange={handleChangeDescription}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-multiline-static"
                  multiline
                  rows={3}
                  label={t("Dashboard.FloorDescriptionAr")}
                  value={descriptionAr}
                  onChange={handleChangeDescriptionAr}
                />
              </FormControl>
              {/* Floor Plan Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <InputLabel>{t("Dashboard.FloorPlanImage")}</InputLabel>
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
                      {t("Dashboard.uploadFloorPlanImage")}
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
            placeHolder={t("Dashboard.FloorsPageSearchPlaceHolder")}
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
                  rowCount={FloorsList.length}
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
                            {row.area}{" "}
                            {i18n.dir() === "ltr" ? "m2" : "متر مربع"}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.percentOfResidential} %
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.percentOfAmenities} %
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.percentOfServices} %
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <FloorShowMore item={row} />
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <FloorMoreMenu Floor_id={row.id} />
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
            count={FloorsList.length}
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

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
import { getTypeById, NewTypeUrl } from "../../../constants/urls";
import TypeShowMore from "../sections/@dashboard/types/TypeShowMore";
import TypeMoreMenu from "../sections/@dashboard/types/TypeMoreMenu";

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

export default function Types() {
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
  const [count, setCount] = useState();
  const [numOfAvailable, setNumOfAvailable] = useState();
  const [price, setPrice] = useState();
  const [Maxprice, setMaxPrice] = useState();
  const [area, setArea] = useState();
  const [groundFloorArea, setGroundFloorArea] = useState();
  const [firstFloorArea, setFirstFloorArea] = useState();
  const [roofFloorArea, setRoofFloorArea] = useState();
  const [OUTDOORandTERRACES, setOUTDOORandTERRACES] = useState();
  const [numberOfBedrooms, setNumberOfBedrooms] = useState();
  const [bedroom1, setBedroom1] = useState();
  const [bedroom2, setBedroom2] = useState();
  const [bedroom3, setBedroom3] = useState();
  const [MasterBedroom, setMasterBedroom] = useState();
  const [MasterBedroom2, setMasterBedroom2] = useState();
  const [MasterBedroom3, setMasterBedroom3] = useState();
  const [MasterRoomToilet, setMasterRoomToilet] = useState();
  const [MasterRoomToilet2, setMasterRoomToilet2] = useState();
  const [MasterRoomToilet3, setMasterRoomToilet3] = useState();
  const [dinningRoom, setDinningRoom] = useState();
  const [DressingRoom, setDressingRoom] = useState();
  const [Living, setLiving] = useState();
  const [Majles, setMajles] = useState();
  const [MajlesToilet, setMajlesToilet] = useState();
  const [Office, setOffice] = useState();
  const [WashingRoom, setWashingRoom] = useState();
  const [bathroom, setBathroom] = useState();
  const [guestToilet, setGuestToilet] = useState();
  const [kitchen, setKitchen] = useState();
  const [laundry, setLaundry] = useState();
  const [reception, setReception] = useState();
  const [storage, setStorage] = useState();
  const [maidRoom, setMaidRoom] = useState();
  const [maidRoomToilet, setMaidRoomToilet] = useState();
  const [description, setDescription] = useState();
  const [descriptionAr, setDescriptionAr] = useState();

  const [previewTypePlanImage, setPreviewTypePlanImage] = useState(null);
  const [typePlanImageToUpload, setTypePlanImageToUpload] = useState("");

  const [previewTypeCardImage, setPreviewTypeCardImage] = useState(null);
  const [typeCardImageToUpload, setTypeCardImageToUpload] = useState("");

  const [TypesList, setTypesList] = useState([]);
  let navigate = useNavigate();
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      /* if (token === null) {
        navigate("/");
      } else { */
      axios
        .get(`${getTypeById}${communityId}`, {
          /* headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            }, */
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setTypesList(data);
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
      label: t("Dashboard.tableHeadTypeName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "count",
      label: t("Dashboard.tableHeadTypeCount"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "num_of_available",
      label: t("Dashboard.tableHeadTypeNumOfAvailable"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "price",
      label: t("Dashboard.tableHeadTypePrice"),
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TypesList.length) : 0;

  const filteredUsers = applySortFilter(
    TypesList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      NewType
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

  const handleCaptureLocationImage = (e) => {
    setTypeCardImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewTypeCardImage(reader.result);
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
  const handleChangeCount = (e) => {
    setCount(e.target.value);
  };
  const handleChangeNumOfAvailable = (e) => {
    setNumOfAvailable(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleChangeArea = (e) => {
    setArea(e.target.value);
  };
  const handleChangeGroundFloorArea = (e) => {
    setGroundFloorArea(e.target.value);
  };
  const handleChangeFirstFloorArea = (e) => {
    setFirstFloorArea(e.target.value);
  };
  const handleChangeRoofFloorArea = (e) => {
    setRoofFloorArea(e.target.value);
  };
  const handleChangeOUTDOORandTERRACES = (e) => {
    setOUTDOORandTERRACES(e.target.value);
  };
  const handleChangeNumberOfBedrooms = (e) => {
    setNumberOfBedrooms(e.target.value);
  };
  const handleChangeBedroom1 = (e) => {
    setBedroom1(e.target.value);
  };
  const handleChangeBedroom2 = (e) => {
    setBedroom2(e.target.value);
  };
  const handleChangeBedroom3 = (e) => {
    setBedroom3(e.target.value);
  };
  const handleChangeMasterBedroom = (e) => {
    setMasterBedroom(e.target.value);
  };
  const handleChangeMasterBedroom2 = (e) => {
    setMasterBedroom2(e.target.value);
  };
  const handleChangeMasterBedroom3 = (e) => {
    setMasterBedroom3(e.target.value);
  };
  const handleChangeMasterRoomToilet = (e) => {
    setMasterRoomToilet(e.target.value);
  };
  const handleChangeMasterRoomToilet2 = (e) => {
    setMasterRoomToilet2(e.target.value);
  };
  const handleChangeMasterRoomToilet3 = (e) => {
    setMasterRoomToilet3(e.target.value);
  };
  const handleChangeDinningRoom = (e) => {
    setDinningRoom(e.target.value);
  };
  const handleChangeDressingRoom = (e) => {
    setDressingRoom(e.target.value);
  };
  const handleChangeLiving = (e) => {
    setLiving(e.target.value);
  };
  const handleChangeMajles = (e) => {
    setMajles(e.target.value);
  };
  const handleChangeMajlesToilet = (e) => {
    setMajlesToilet(e.target.value);
  };
  const handleChangeOffice = (e) => {
    setOffice(e.target.value);
  };
  const handleChangeWashingRoom = (e) => {
    setWashingRoom(e.target.value);
  };
  const handleChangeBathroom = (e) => {
    setBathroom(e.target.value);
  };
  const handleChangeGuestToilet = (e) => {
    setGuestToilet(e.target.value);
  };
  const handleChangeKitchen = (e) => {
    setKitchen(e.target.value);
  };
  const handleChangeLaundry = (e) => {
    setLaundry(e.target.value);
  };
  const handleChangeReception = (e) => {
    setReception(e.target.value);
  };
  const handleChangeStorage = (e) => {
    setStorage(e.target.value);
  };
  const handleChangeMaidRoom = (e) => {
    setMaidRoom(e.target.value);
  };
  const handleChangeMaidRoomToilet = (e) => {
    setMaidRoomToilet(e.target.value);
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

    formData.append("count", count);

    formData.append("numberOfAvailable", numOfAvailable);

    formData.append("price", price);

    formData.append("max_price", Maxprice);

    formData.append("area", area);

    formData.append("GROUND_FLOOR_AREA", groundFloorArea);

    formData.append("FIRST_FLOOR_AREA", firstFloorArea);

    formData.append("ROOF_FLOOR_AREA", roofFloorArea);

    formData.append("OUTDOORandTERRACES", OUTDOORandTERRACES);

    formData.append("numberOfBedrooms", numberOfBedrooms);

    formData.append("bedroom1", bedroom1);

    formData.append("bedroom2", bedroom2);

    formData.append("bedroom3", bedroom3);

    formData.append("MasterBedroom", MasterBedroom);

    formData.append("Master_Bedroom2", MasterBedroom2);

    formData.append("Master_Bedroom3", MasterBedroom3);

    formData.append("MasterRoomToilet", MasterRoomToilet);

    formData.append("Master_Room_Toilet2", MasterRoomToilet2);

    formData.append("Master_Room_Toilet3", MasterRoomToilet3);

    formData.append("Dinning_room", dinningRoom);

    formData.append("DressingRoom", DressingRoom);

    formData.append("Living", Living);

    formData.append("Majles", Majles);

    formData.append("Majles_Toilet", MajlesToilet);

    formData.append("Office", Office);

    formData.append("Washing_Room", WashingRoom);

    formData.append("bathroom", bathroom);

    formData.append("guestToilet", guestToilet);

    formData.append("kitchen", kitchen);

    formData.append("laundry", laundry);

    formData.append("reception", reception);

    formData.append("storage", storage);

    formData.append("maidRoom", maidRoom);

    formData.append("maidRoomToilet", maidRoomToilet);

    formData.append("description", description);

    formData.append("description_ar", descriptionAr);

    formData.append("image", typePlanImageToUpload);

    formData.append("card_image", typeCardImageToUpload);
    axios
      .post(`${NewTypeUrl}`, formData, {
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
  return TypesList === undefined ? (
    <LinearProgress />
  ) : (
    <Page title={t("Dashboard.TypesPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.TypesPageTitle")}
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
            <DialogTitle>{t("Dashboard.typeInfo")}</DialogTitle>
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
                  label={t("Dashboard.totalCount")}
                  value={count}
                  onChange={handleChangeCount}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadTypeNumOfAvailable")}
                  value={numOfAvailable}
                  onChange={handleChangeNumOfAvailable}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadTypePrice")}
                  value={price}
                  onChange={handleChangePrice}
                />
              </FormControl>{" "}
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.tableHeadTypeMaxPrice")}
                  value={Maxprice}
                  onChange={handleChangeMaxPrice}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.TotalArea")}
                  value={area}
                  onChange={handleChangeArea}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.groundFloorArea")}
                  value={groundFloorArea}
                  onChange={handleChangeGroundFloorArea}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.firstFloorArea")}
                  value={firstFloorArea}
                  onChange={handleChangeFirstFloorArea}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.roofFloorArea")}
                  value={roofFloorArea}
                  onChange={handleChangeRoofFloorArea}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.outDoorAndTerracesArea")}
                  value={OUTDOORandTERRACES}
                  onChange={handleChangeOUTDOORandTERRACES}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.numberOfBedrooms")}
                  value={numberOfBedrooms}
                  onChange={handleChangeNumberOfBedrooms}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bedroom1")}
                  value={bedroom1}
                  onChange={handleChangeBedroom1}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bedroom2")}
                  value={bedroom2}
                  onChange={handleChangeBedroom2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bedroom3")}
                  value={bedroom3}
                  onChange={handleChangeBedroom3}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.MasterBedroom1")}
                  value={MasterBedroom}
                  onChange={handleChangeMasterBedroom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.MasterBedroom2")}
                  value={MasterBedroom2}
                  onChange={handleChangeMasterBedroom2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.MasterBedroom3")}
                  value={MasterBedroom3}
                  onChange={handleChangeMasterBedroom3}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.MasterRoomToilet")}
                  value={MasterRoomToilet}
                  onChange={handleChangeMasterRoomToilet}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Master_Room_Toilet2")}
                  value={MasterRoomToilet2}
                  onChange={handleChangeMasterRoomToilet2}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Master_Room_Toilet3")}
                  value={MasterRoomToilet3}
                  onChange={handleChangeMasterRoomToilet3}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Dinning_room")}
                  value={dinningRoom}
                  onChange={handleChangeDinningRoom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.DressingRoom")}
                  value={DressingRoom}
                  onChange={handleChangeDressingRoom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Living")}
                  value={Living}
                  onChange={handleChangeLiving}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Majles")}
                  value={Majles}
                  onChange={handleChangeMajles}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Majles_Toilet")}
                  value={MajlesToilet}
                  onChange={handleChangeMajlesToilet}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Office")}
                  value={Office}
                  onChange={handleChangeOffice}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.Washing_Room")}
                  value={WashingRoom}
                  onChange={handleChangeWashingRoom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.bathroom")}
                  value={bathroom}
                  onChange={handleChangeBathroom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.guestToilet")}
                  value={guestToilet}
                  onChange={handleChangeGuestToilet}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.kitchen")}
                  value={kitchen}
                  onChange={handleChangeKitchen}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.laundry")}
                  value={laundry}
                  onChange={handleChangeLaundry}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.reception")}
                  value={reception}
                  onChange={handleChangeReception}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.storage")}
                  value={storage}
                  onChange={handleChangeStorage}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.maidRoom")}
                  value={maidRoom}
                  onChange={handleChangeMaidRoom}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-basic"
                  label={t("Dashboard.maidRoomToilet")}
                  value={maidRoomToilet}
                  onChange={handleChangeMaidRoomToilet}
                />
              </FormControl>
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <TextField
                  variant="standard"
                  id="filled-multiline-static"
                  multiline
                  rows={3}
                  label={t("Dashboard.typeDescription")}
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
                  label={t("Dashboard.typeDescriptionAr")}
                  value={descriptionAr}
                  onChange={handleChangeDescriptionAr}
                />
              </FormControl>
              {/* comunity Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <InputLabel>{t("Dashboard.TypePlanImage")}</InputLabel>
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
                      {t("Dashboard.uploadTypePlanImage")}
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
              <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
                <InputLabel>{t("Dashboard.TypeCardImage")}</InputLabel>
                <Box className="upload__image-wrapper">
                  {previewTypeCardImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={previewTypeCardImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewTypeCardImage(null)}
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
                      {t("Dashboard.uploadTypeCardImage")}
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
            <Button onClick={handleCloseNewType}>{t("Dashboard.Close")}</Button>

            <Button onClick={handleSaveChanges}>
              {t("Dashboard.saveChanges")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* tabel */}
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.TypesPageSearchPlaceHolder")}
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
                  rowCount={TypesList.length}
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
                        count,
                        price,
                        max_price,
                        numberOfAvailable,
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
                            {count}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {numberOfAvailable}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {price}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <TypeShowMore item={row} />
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <TypeMoreMenu Type_id={id} />
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
            count={TypesList.length}
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

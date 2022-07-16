import { useEffect, useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import { IconButton, TextField, InputLabel, Stack } from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { baseImageUrl, EditTypeUrl } from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function TypeShowMore({ item }) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState(item.name_ar);
  const [nameEn, setNameEn] = useState(item.name);
  const [count, setCount] = useState(item.count);
  const [numOfAvailable, setNumOfAvailable] = useState(item.numberOfAvailable);
  const [price, setPrice] = useState(item.price);
  const [Maxprice, setMaxPrice] = useState(item.max_price);
  const [area, setArea] = useState(item.area);
  const [groundFloorArea, setGroundFloorArea] = useState(
    item.GROUND_FLOOR_AREA
  );
  const [firstFloorArea, setFirstFloorArea] = useState(item.FIRST_FLOOR_AREA);
  const [roofFloorArea, setRoofFloorArea] = useState(item.ROOF_FLOOR_AREA);
  const [OUTDOORandTERRACES, setOUTDOORandTERRACES] = useState(
    item.OUTDOORandTERRACES
  );
  const [numberOfBedrooms, setNumberOfBedrooms] = useState(
    item.numberOfBedrooms
  );
  const [bedroom1, setBedroom1] = useState(item.bedroom1);
  const [bedroom2, setBedroom2] = useState(item.bedroom2);
  const [bedroom3, setBedroom3] = useState(item.bedroom3);
  const [MasterBedroom, setMasterBedroom] = useState(item.MasterBedroom);
  const [MasterBedroom2, setMasterBedroom2] = useState(item.Master_Bedroom2);
  const [MasterBedroom3, setMasterBedroom3] = useState(item.Master_Bedroom3);
  const [MasterRoomToilet, setMasterRoomToilet] = useState(
    item.MasterRoomToilet
  );
  const [MasterRoomToilet2, setMasterRoomToilet2] = useState(
    item.Master_Room_Toilet2
  );
  const [MasterRoomToilet3, setMasterRoomToilet3] = useState(
    item.Master_Room_Toilet3
  );
  const [dinningRoom, setDinningRoom] = useState(item.Dinning_room);
  const [DressingRoom, setDressingRoom] = useState(item.DressingRoom);
  const [Living, setLiving] = useState(item.Living);
  const [Majles, setMajles] = useState(item.Majles);
  const [MajlesToilet, setMajlesToilet] = useState(item.Majles_Toilet);
  const [Office, setOffice] = useState(item.Office);
  const [WashingRoom, setWashingRoom] = useState(item.Washing_Room);
  const [bathroom, setBathroom] = useState(item.bathroom);
  const [guestToilet, setGuestToilet] = useState(item.guestToilet);
  const [kitchen, setKitchen] = useState(item.kitchen);
  const [laundry, setLaundry] = useState(item.laundry);
  const [reception, setReception] = useState(item.reception);
  const [storage, setStorage] = useState(item.storage);
  const [maidRoom, setMaidRoom] = useState(item.maidRoom);
  const [maidRoomToilet, setMaidRoomToilet] = useState(item.maidRoomToilet);
  const [description, setDescription] = useState(item.description);
  const [descriptionAr, setDescriptionAr] = useState(item.description_ar);

  const [openShowMoreDialog, setShowMoreDialog] = useState(false);
  const [disableEdits, setDisableEdits] = useState(true);

  const [TypePlanImageToShow, setTypePlanImageToShow] = useState(item.image);
  const [previewTypePlanImage, setPreviewTypePlanImage] = useState(null);
  const [typePlanImageToUpload, setTypePlanImageToUpload] = useState("");

  const [typeCardImageToShow, setTypeCardImageToShow] = useState(
    item.card_image
  );
  const [previewTypeCardImage, setPreviewTypeCardImage] = useState(null);
  const [typeCardImageToUpload, setTypeCardImageToUpload] = useState("");

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

  const handleCaptureLocationImage = (e) => {
    setTypeCardImageToShow(null);
    setTypeCardImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewTypeCardImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAllowEdit = () => {
    setDisableEdits(!disableEdits);
  };
  const handleClickopenShowMoreDialog = () => {
    setShowMoreDialog(true);
  };

  const handleCloseShowMoreDialog = () => {
    setShowMoreDialog(false);
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

    formData.append("communityId", item.communityId);
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

    dinningRoom !== null && formData.append("Dinning_room", dinningRoom);

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
      .post(`${EditTypeUrl}${item.id}`, formData, {
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
    setShowMoreDialog(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={handleClickopenShowMoreDialog}>
        <Iconify
          icon="fluent:clipboard-more-20-filled"
          width={20}
          height={20}
        />
      </IconButton>

      {/* Show More Dialog */}
      <Dialog
        fullScreen
        disableEscapeKeyDown
        open={openShowMoreDialog}
        onClose={handleCloseShowMoreDialog}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ marginTop: "1rem" }}
        >
          <DialogTitle>{t("Dashboard.typeInfo")}</DialogTitle>
          <Button
            sx={{ margin: "0 2rem", fontSize: "1.5vw" }}
            onClick={handleAllowEdit}
          >
            {disableEdits
              ? t("Dashboard.editType")
              : t("Dashboard.CancelEditType")}
          </Button>
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
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.ComunityDialogArName")}
                value={nameAr}
                onChange={handleChangeNameAr}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.ComunityDialogEnName")}
                value={nameEn}
                onChange={handleChangeNameEn}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.totalCount")}
                value={count}
                onChange={handleChangeCount}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.tableHeadTypeNumOfAvailable")}
                value={numOfAvailable}
                onChange={handleChangeNumOfAvailable}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.tableHeadTypePrice")}
                value={price}
                onChange={handleChangePrice}
              />
            </FormControl>{" "}
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.tableHeadTypeMaxPrice")}
                value={Maxprice}
                onChange={handleChangeMaxPrice}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.TotalArea")}
                value={area}
                onChange={handleChangeArea}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.groundFloorArea")}
                value={groundFloorArea}
                onChange={handleChangeGroundFloorArea}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.firstFloorArea")}
                value={firstFloorArea}
                onChange={handleChangeFirstFloorArea}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.roofFloorArea")}
                value={roofFloorArea}
                onChange={handleChangeRoofFloorArea}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.outDoorAndTerracesArea")}
                value={OUTDOORandTERRACES}
                onChange={handleChangeOUTDOORandTERRACES}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.numberOfBedrooms")}
                value={numberOfBedrooms}
                onChange={handleChangeNumberOfBedrooms}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.bedroom1")}
                value={bedroom1}
                onChange={handleChangeBedroom1}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.bedroom2")}
                value={bedroom2}
                onChange={handleChangeBedroom2}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.bedroom3")}
                value={bedroom3}
                onChange={handleChangeBedroom3}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.MasterBedroom1")}
                value={MasterBedroom}
                onChange={handleChangeMasterBedroom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.MasterBedroom2")}
                value={MasterBedroom2}
                onChange={handleChangeMasterBedroom2}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.MasterBedroom3")}
                value={MasterBedroom3}
                onChange={handleChangeMasterBedroom3}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.MasterRoomToilet")}
                value={MasterRoomToilet}
                onChange={handleChangeMasterRoomToilet}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Master_Room_Toilet2")}
                value={MasterRoomToilet2}
                onChange={handleChangeMasterRoomToilet2}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Master_Room_Toilet3")}
                value={MasterRoomToilet3}
                onChange={handleChangeMasterRoomToilet3}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Dinning_room")}
                value={dinningRoom}
                onChange={handleChangeDinningRoom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.DressingRoom")}
                value={DressingRoom}
                onChange={handleChangeDressingRoom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Living")}
                value={Living}
                onChange={handleChangeLiving}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Majles")}
                value={Majles}
                onChange={handleChangeMajles}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Majles_Toilet")}
                value={MajlesToilet}
                onChange={handleChangeMajlesToilet}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Office")}
                value={Office}
                onChange={handleChangeOffice}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.Washing_Room")}
                value={WashingRoom}
                onChange={handleChangeWashingRoom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.bathroom")}
                value={bathroom}
                onChange={handleChangeBathroom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.guestToilet")}
                value={guestToilet}
                onChange={handleChangeGuestToilet}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.kitchen")}
                value={kitchen}
                onChange={handleChangeKitchen}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.laundry")}
                value={laundry}
                onChange={handleChangeLaundry}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.reception")}
                value={reception}
                onChange={handleChangeReception}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.storage")}
                value={storage}
                onChange={handleChangeStorage}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.maidRoom")}
                value={maidRoom}
                onChange={handleChangeMaidRoom}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
                variant="standard"
                id="filled-basic"
                label={t("Dashboard.maidRoomToilet")}
                value={maidRoomToilet}
                onChange={handleChangeMaidRoomToilet}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                    disabled={disableEdits}
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
                {TypePlanImageToShow && (
                  <Box className="image-item" sx={{ margin: "1rem 0" }}>
                    <img
                      src={`${baseImageUrl}${TypePlanImageToShow}`}
                      alt=""
                      width="80%"
                    />
                    <Box className="image-item__btn-wrapper">
                      <Button
                        disabled={disableEdits}
                        sx={{ margin: "1rem 0" }}
                        variant="outlined"
                        onClick={() => setTypePlanImageToShow(null)}
                      >
                        {t("Dashboard.remove")}
                      </Button>
                    </Box>
                  </Box>
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
                        disabled={disableEdits}
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
                    disabled={disableEdits}
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
                {typeCardImageToShow && (
                  <Box className="image-item" sx={{ margin: "1rem 0" }}>
                    <img
                      src={`${baseImageUrl}${typeCardImageToShow}`}
                      alt=""
                      width="80%"
                    />
                    <Box className="image-item__btn-wrapper">
                      <Button
                        disabled={disableEdits}
                        sx={{ margin: "1rem 0" }}
                        variant="outlined"
                        onClick={() => setTypeCardImageToShow(null)}
                      >
                        {t("Dashboard.remove")}
                      </Button>
                    </Box>
                  </Box>
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
          <Button onClick={handleCloseShowMoreDialog}>
            {t("Dashboard.Close")}
          </Button>
          {!disableEdits && (
            <Button onClick={handleSaveChanges}>
              {t("Dashboard.saveChanges")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

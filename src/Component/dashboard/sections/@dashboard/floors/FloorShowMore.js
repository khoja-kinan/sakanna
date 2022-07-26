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
import {
  baseImageUrl,
  EditFloorUrl,
  EditTypeUrl,
} from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function FloorShowMore({ item, token }) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState(item.name_ar);
  const [nameEn, setNameEn] = useState(item.name);
  const [carSlots, setcarSlots] = useState(item.carSlots);
  const [numberOfApartments, setNumberOfApartments] = useState(
    item.numberOfApartments
  );
  const [numberOfPenthouses, setNumberOfPenthouses] = useState(
    item.numberOfPenthouses
  );
  const [percentOfResidential, setPercentOfResidential] = useState(
    item.percentOfResidential
  );
  const [area, setArea] = useState(item.area);
  const [percentOfAmenities, setPercentOfAmenities] = useState(
    item.percentOfAmenities
  );
  const [percentOfServices, setPercentOfServices] = useState(
    item.percentOfServices
  );
  const [totalOutdoorAreas, setTotalOutdoorAreas] = useState(
    item.totalOutdoorAreas
  );
  const [Foyer1, setFoyer1] = useState(item.Foyer1);
  const [Foyer2, setFoyer2] = useState(item.Foyer2);
  const [bedroom1, setBedroom1] = useState(item.bedroom1);
  const [bedroom2, setBedroom2] = useState(item.bedroom2);
  const [TandB1, setTandB1] = useState(item.TandB1);
  const [TandB2, setTandB2] = useState(item.TandB2);
  const [TandB3, setTandB3] = useState(item.TandB3);
  const [Master_Bedroom, setMaster_Bedroom] = useState(item.Master_Bedroom);
  const [Lobby, setLobby] = useState(item.Lobby);
  const [Majles, setMajles] = useState(item.Majles);

  const [Balcony, setBalcony] = useState(item.Balcony);
  const [Balcony1, setBalcony1] = useState(item.Balcony1);
  const [Balcony2, setBalcony2] = useState(item.Balcony2);
  const [Balcony3, setBalcony3] = useState(item.Balcony3);
  const [Family_Living, setFamily_Living] = useState(item.Family_Living);
  const [Closet, setCloset] = useState(item.Closet);
  const [Open_Kitchen, setOpen_Kitchen] = useState(item.Open_Kitchen);
  const [laundry, setLaundry] = useState(item.laundry);
  const [description, setDescription] = useState(item.description);
  const [descriptionAr, setDescriptionAr] = useState(item.description_ar);

  const [openShowMoreDialog, setShowMoreDialog] = useState(false);
  const [disableEdits, setDisableEdits] = useState(true);

  const [TypePlanImageToShow, setTypePlanImageToShow] = useState(item.image);
  const [previewTypePlanImage, setPreviewTypePlanImage] = useState(null);
  const [typePlanImageToUpload, setTypePlanImageToUpload] = useState("");

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

    formData.append("communityId", item.communityId);
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
      .post(`${EditFloorUrl}/${item.id}`, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
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
          <DialogTitle>{t("Dashboard.FloorInfo")}</DialogTitle>
          <Button
            sx={{ margin: "0 2rem", fontSize: "1.5vw" }}
            onClick={handleAllowEdit}
          >
            {disableEdits
              ? t("Dashboard.editFloor")
              : t("Dashboard.CancelEditFloor")}
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
                label={t("Dashboard.TotalArea")}
                value={area}
                type="number"
                onChange={handleChangeArea}
              />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: "30%", marginTop: "2rem" }}>
              <TextField
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                disabled={disableEdits}
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
                    disabled={disableEdits}
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

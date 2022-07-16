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

export default function InteriorSamples({ item }) {
  const ref = useRef(null);
  const { t } = useTranslation();

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

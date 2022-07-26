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
  AddNewAmenity,
  baseImageUrl,
  EditTypeUrl,
} from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function AmenityShowMore({ item, token }) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState(item.name_ar);
  const [nameEn, setNameEn] = useState(item.name);

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

  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("communityId", item.communityId);
    formData.append("name", nameEn);

    formData.append("name_ar", nameAr);

    formData.append("image", typePlanImageToUpload);

    axios
      .post(`${AddNewAmenity}/${item.id}`, formData, {
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
          <DialogTitle>{t("Dashboard.AmenityInfo")}</DialogTitle>
          <Button
            sx={{ margin: "0 2rem", fontSize: "1.5vw" }}
            onClick={handleAllowEdit}
          >
            {disableEdits
              ? t("Dashboard.editAmenity")
              : t("Dashboard.CancelEditAmenity")}
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

            {/* Amenity Image */}
            <FormControl sx={{ m: 1, maxWidth: "45%", marginTop: "2rem" }}>
              <InputLabel>{t("Dashboard.AmenityImage")}</InputLabel>
              <Box className="upload__image-wrapper">
                {previewTypePlanImage ? (
                  <Box className="image-item" sx={{ margin: "1rem 0" }}>
                    <img src={previewTypePlanImage} alt="" width="50%" />
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
                    {t("Dashboard.uploadAmenityImage")}
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
                      width="50%"
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

import { useEffect, useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputLabel,
  Select,
  DialogContentText,
} from "@mui/material";
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
import { baseImageUrl, getComunityById } from "../../../../../constants/urls";
// ----------------------------------------------------------------------

export default function ComunityMoreMenu({
  Comunity_id,
  token,
  Arabic_name,
  English_name,
  Location,
  Location_ar,
  type,
  type_ar,
  description,
  description_ar,
  comunityImage,
  Latitude,
  Longitude,
  locationDesc,
  locationDescAr,
  location_image,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const formData = new FormData();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [arName, setArname] = useState(Arabic_name);
  const [enName, setEnName] = useState(English_name);
  const [long, setLongitude] = useState(Longitude);
  const [lat, setLatitude] = useState(Latitude);
  const [loc, setLoc] = useState(Location);
  const [loc_ar, setLoc_ar] = useState(Location_ar);
  const [typ, setType] = useState(type);
  const [typ_ar, setType_ar] = useState(type_ar);
  const [Desc, setDesc] = useState(description);
  const [Desc_ar, setDesc_ar] = useState(description_ar);
  const [LocDesc, setLocDesc] = useState(locationDesc);
  const [LocDesc_ar, setLocDesc_ar] = useState(locationDescAr);

  const [state, setState] = useState("");

  const [comunityImageToShow, setComunityImageToShow] = useState(comunityImage);
  const [previewcomunityImage, setPreviewComunityImage] = useState(null);
  const [comunityImageToUpload, setcomunityImageToUpload] = useState("");

  const [locationImageToShow, setLocationImageToShow] =
    useState(location_image);
  const [previewLocationImage, setPreviewLocationImage] = useState(null);
  const [locationImageToUpload, setlocationImageToUpload] = useState("");

  const handleCaptureComunityImage = (e) => {
    setComunityImageToShow(null);
    setcomunityImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewComunityImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleCaptureLocationImage = (e) => {
    setLocationImageToShow(null);
    setlocationImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewLocationImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setIsOpen(false);
  };
  const handleConfirmEditDialog = () => {
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
    formData.append("image", comunityImageToUpload);
    formData.append("location_image", locationImageToUpload);

    axios
      .post(`${getComunityById}/${Comunity_id}`, formData, {
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
    setOpenEditDialog(false);
    setIsOpen(false);
  };

  /* Detelt Dialog */

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`${getComunityById}/${Comunity_id}`, {
        headers: {
          Accept: "application/json",
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
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenEditDialog}
        >
          <ListItemIcon>
            <Iconify icon="ant-design:edit-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.EditButton")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeleteDialog}
        >
          <ListItemIcon>
            <Iconify icon="ep:delete-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.Delete")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {/* Edit Dialog */}
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <DialogTitle>{t("Dashboard.EditComunity")}</DialogTitle>
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
                  {previewcomunityImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={previewcomunityImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewComunityImage(null)}
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
                  {comunityImageToShow && (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img
                        src={`${baseImageUrl}${comunityImageToShow}`}
                        alt=""
                        width="80%"
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setComunityImageToShow(null)}
                        >
                          {t("Dashboard.remove")}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* <ImageUploading
                  value={comunityImageToUpload}
                  onChange={onChangeComunityImages}
                  maxNumber={ComunityImagemaxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <Box className="upload__image-wrapper">
                      {!comunityImageToShow && (
                        <Button
                          variant="outlined"
                          sx={{
                            color: isDragging ? "red" : undefined,
                            margin: "1rem 0",
                          }}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          {t("Dashboard.ClickOrDrop")}
                        </Button>
                      )}

                      {comunityImageToShow && (
                        <Box className="image-item" sx={{ margin: "1rem 0" }}>
                          <img
                            src={`${baseImageUrl}${comunityImageToShow}`}
                            alt=""
                            width="80%"
                          />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                              onClick={() => setComunityImageToShow(null)}
                            >
                              {t("Dashboard.remove")}
                            </Button>
                          </Box>
                        </Box>
                      )}

                      {imageList.map((image, index) => (
                        <Box
                          key={index}
                          className="image-item"
                          sx={{ margin: "1rem 0" }}
                        >
                          <img src={image.data_url} alt="" width="80%" />
                          <Box className="image-item__btn-wrapper">
                            <Button
                              onClick={() => onImageUpdate(index)}
                              sx={{ margin: "1rem 0" }}
                              variant="outlined"
                            >
                              {t("Dashboard.EditButton")}
                            </Button>
                            <Button
                              onClick={() => onImageRemove(index)}
                              sx={{ margin: "1rem " }}
                              variant="outlined"
                            >
                              {t("Dashboard.remove")}
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </ImageUploading> */}
              </FormControl>
              {/* location Image */}
              <FormControl sx={{ m: 1, maxWidth: "45%" }}>
                <InputLabel>{t("Dashboard.locationImage")}</InputLabel>
                <Box className="upload__image-wrapper">
                  {previewLocationImage ? (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img src={previewLocationImage} alt="" width="80%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewLocationImage(null)}
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
                  {locationImageToShow && (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img
                        src={`${baseImageUrl}${locationImageToShow}`}
                        alt=""
                        width="80%"
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setLocationImageToShow(null)}
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
            <Button onClick={handleCloseEditDialog}>
              {t("Dashboard.Cancel")}
            </Button>
            <Button onClick={handleConfirmEditDialog}>
              {t("Dashboard.Ok")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("Dashboard.DeleteComunityDialogTitle")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("Dashboard.DeleteComunityDialogMessage")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>
              {" "}
              {t("Dashboard.Cancel")}
            </Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              {t("Dashboard.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}

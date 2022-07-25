import { useEffect, useRef } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import { IconButton, TextField, InputLabel, Stack } from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import useState from "react-usestateref";

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
  DeleteInteriorImage,
  EditTypeUrl,
} from "../../../../../constants/urls";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function InteriorSamples({ item }) {
  console.log(item);
  const ref = useRef(null);
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState(item.name_ar);
  const [nameEn, setNameEn] = useState(item.name);
  const [openShowMoreDialog, setShowMoreDialog] = useState(false);

  const [TypePlanImageToShow, setTypePlanImageToShow] = useState(item.images);
  const [
    previewTypePlanImage,
    setPreviewTypePlanImage,
    previewTypePlanImageRef,
  ] = useState([]);
  const [InteriorImageToUpload, setInteriorImageToUpload] = useState([]);

  const handleCaptureinteriorImages = (e) => {
    let files = Array.from(e.target.files);
    let images = [];
    files.forEach((file) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          images.push(result);
        }
      };

      reader.readAsDataURL(file);
    });
    setPreviewTypePlanImage(images);
    setInteriorImageToUpload(files);
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
  console.log(InteriorImageToUpload);
  const handleSaveChanges = () => {
    /*  formData.append("name", nameEn);
    formData.append("name_ar", nameAr); */

    InteriorImageToUpload.forEach((img) => {
      const formData = new FormData();

      formData.append("communityId", item.communityId);
      formData.append("interiorId", item.id);
      formData.append("imageUrl", img);

      axios
        .post(`${DeleteInteriorImage}`, formData, {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    });
    /*  axios
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
      }); */
    setShowMoreDialog(false);
  };
  const RemoveImage = (id) => {
    Swal.fire({
      customClass: {
        container: "InteriorDeleteDialog",
      },
      title: t("Dashboard.DeleteInteriorImage"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("Dashboard.no"),
      confirmButtonText: t("Dashboard.yes"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${DeleteInteriorImage}/${id}`, {
            headers: {
              Accept: "application/json",
            },
          })
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    });
  };
  const removeReview = () => {
    setPreviewTypePlanImage([]);
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
          <DialogTitle>{t("Dashboard.typeInfo")}dasdasd</DialogTitle>
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
            <FormControl sx={{ m: 1, maxWidth: "100%", marginTop: "2rem" }}>
              <InputLabel>{t("Dashboard.InteriorImageLabel")}</InputLabel>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ margin: "1rem 0", display: "flex" }}>
                  {previewTypePlanImageRef.current.map((item, index) => (
                    <Box sx={{ margin: "0 1rem" }} key={index}>
                      <img src={item} alt="" width={500} />
                    </Box>
                  ))}
                </Box>
                <Box className="image-item__btn-wrapper">
                  <Button
                    sx={{ margin: "1rem " }}
                    variant="outlined"
                    onClick={removeReview}
                  >
                    {t("Dashboard.remove")}
                  </Button>

                  <Button
                    sx={{ margin: "1rem 0" }}
                    variant="outlined"
                    component="label"
                  >
                    {t("Dashboard.uploadInteriorImageImage")}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      onChange={handleCaptureinteriorImages}
                    />
                  </Button>
                </Box>
              </Box>
              {TypePlanImageToShow && (
                <Box sx={{ margin: "1rem 0", display: "flex" }}>
                  {TypePlanImageToShow.map((item) => (
                    <Box sx={{ margin: "0 1rem" }} key={item.id}>
                      <img
                        src={`${baseImageUrl}${item.imageUrl}`}
                        alt=""
                        width={500}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => RemoveImage(item.id)}
                        >
                          {t("Dashboard.remove")}
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
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

          <Button onClick={handleSaveChanges}>
            {t("Dashboard.saveChanges")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

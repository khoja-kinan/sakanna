import { useRef } from "react";
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
} from "../../../../../constants/urls";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function GalleryEdit({ item, token, community_id }) {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [openShowMoreDialog, setShowMoreDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [TypePlanImageToShow, setTypePlanImageToShow] = useState(true);
  const [
    previewTypePlanImage,
    setPreviewTypePlanImage,
    previewTypePlanImageRef,
  ] = useState();
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
  console.log(previewTypePlanImage);

  const handleSaveChanges = () => {
    setLoading(true);
    InteriorImageToUpload.forEach((img) => {
      const formData = new FormData();

      formData.append("communityId", community_id);
      formData.append("imageUrl", img);

      axios
        .post(`${DeleteInteriorImage}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {})
        .catch((error) => {
          console.error("There was an error!", error);
        });
    });
    setTimeout(function refresh() {
      setLoading(false);

      setShowMoreDialog(false);

      Swal.fire({
        customClass: {
          container: "InteriorDeleteDialog",
        },
        title: t("Dashboard.GalleryImageAddedSuccess"),
        icon: "success",
        confirmButtonText: t("Dashboard.Ok"),
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }, 10000);
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
              Authorization: "Bearer " + token,
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
          <DialogTitle>{t("Dashboard.EditGallery")}</DialogTitle>
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
            <FormControl sx={{ m: 1, maxWidth: "100%", marginTop: "2rem" }}>
              <InputLabel>{t("Dashboard.newgalleryImageLabel")}</InputLabel>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ margin: "1rem 0", display: "flex" }}>
                  {previewTypePlanImageRef.current !== undefined &&
                    previewTypePlanImageRef.current.map((item, index) => (
                      <Box sx={{ margin: "0 1rem" }} key={index}>
                        <img src={item} alt="" width={350} />
                      </Box>
                    ))}
                </Box>
                <Box className="image-item__btn-wrapper">
                  {previewTypePlanImageRef.current !== undefined &&
                    previewTypePlanImageRef.current.length !== 0 && (
                      <Button
                        sx={{ margin: "1rem " }}
                        variant="outlined"
                        onClick={removeReview}
                      >
                        {t("Dashboard.remove")}
                      </Button>
                    )}

                  <Button
                    sx={{ margin: "1rem 0" }}
                    variant="outlined"
                    component="label"
                  >
                    {t("Dashboard.uploadGalleryImage")}
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
              <InputLabel>{t("Dashboard.GalleryImages")}</InputLabel>
              {TypePlanImageToShow && (
                <Box
                  sx={{ margin: "1rem 0", display: "flex", flexWrap: "wrap" }}
                >
                  {item.map((i) => (
                    <Box sx={{ margin: "0 1rem" }} key={i.id}>
                      <img
                        src={`${baseImageUrl}${i.imageUrl}`}
                        alt=""
                        width={350}
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => RemoveImage(i.id)}
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

          <LoadingButton onClick={handleSaveChanges} loading={loading}>
            {t("Dashboard.saveChanges")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

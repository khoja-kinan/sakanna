import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect } from "react";
import useState from "react-usestateref";

import { useNavigate, useParams } from "react-router-dom";
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
  Box,
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
import { UserListHead } from "../sections/@dashboard/user";
//
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  AllContactsUrl,
  DeleteInteriorImage,
  DeleteOrAddInterior,
} from "../../../constants/urls";
import InteriorSamples from "../sections/@dashboard/interior/InteriorSamples";
import InteriorDeleteDialog from "../sections/@dashboard/interior/InteriorDeleteDialog";
import Swal from "sweetalert2";

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

export default function Contacts() {
  const { communityId } = useParams();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewInterior, setOpenNewInterior] = useState(false);

  const [ContactsList, setContactsList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

  const [
    previewTypePlanImage,
    setPreviewTypePlanImage,
    previewTypePlanImageRef,
  ] = useState([]);
  const [InteriorImageToUpload, setInteriorImageToUpload] = useState([]);

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${AllContactsUrl}`, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;

              setContactsList(data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, []);

  if (ContactsList === undefined) {
    return <LinearProgress />;
  }
  console.log(ContactsList);
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
      label: t("Dashboard.tableHeadUserName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "email",
      label: t("Dashboard.tableHeadEmail"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "phone",
      label: t("Dashboard.tableHeadPhone"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "message",
      label: t("Dashboard.tableHeadMessage"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "contact_type",
      label: t("Dashboard.tableHeadContatType"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ContactsList.length) : 0;

  const filteredUsers = applySortFilter(
    ContactsList,
    getComparator(order, orderBy),
    filterName
  );

  /* 
      New Interior
  */

  const handleClickopenNewInterior = () => {
    setOpenNewInterior(true);
  };

  const handleCloseNewInterior = () => {
    setOpenNewInterior(false);
  };

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

  const handleSaveChanges = () => {
    const data = {
      name: "Interior Samples",
      description: "",
      image: "",
      communityId: communityId,
    };
    axios
      .post(`${DeleteOrAddInterior}`, data, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        InteriorImageToUpload.forEach((img) => {
          const formData = new FormData();

          formData.append("interiorId", response.data.id);
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
          setOpenNewInterior(false);

          Swal.fire({
            customClass: {
              container: "InteriorDeleteDialog",
            },
            title: t("Dashboard.InteriorImageAddedSuccess"),
            icon: "success",
            confirmButtonText: t("Dashboard.Ok"),
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 10000);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const removeReview = () => {
    setPreviewTypePlanImage([]);
  };
  return (
    <Page title={t("Dashboard.InteriotPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.InteriotPageTitle")}
          </Typography>

          <Button
            variant="contained"
            onClick={handleClickopenNewInterior}
            disabled={filteredUsers.length !== 0}
          >
            {t("Dashboard.ComunitiesAddNew")}
          </Button>
        </Stack>
        {/* Add New Dialog */}
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openNewInterior}
          onClose={handleCloseNewInterior}
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ marginTop: "1rem" }}
          >
            <DialogTitle>{t("Dashboard.NewInterior")}</DialogTitle>
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
            <Button onClick={handleCloseNewInterior}>
              {t("Dashboard.Close")}
            </Button>

            <Button onClick={handleSaveChanges}>
              {t("Dashboard.saveChanges")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* tabel */}
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ContactsList.length}
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
                            {row.contact.name}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.contact.email}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.contact.phone}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.contact.message}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.contact.isContact}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <InteriorDeleteDialog
                              interior_id={row.id}
                              token={token}
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
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

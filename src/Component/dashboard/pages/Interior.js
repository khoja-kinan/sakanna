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
import { EditFloorUrl, getComunityInterior } from "../../../constants/urls";
import FloorMoreMenu from "../sections/@dashboard/floors/FloorMoreMenu";
import { Link } from "react-router-dom";
import Iconify from "../components/Iconify";
import InteriorSamplesEdit from "../sections/@dashboard/interior/InteriorSamples";
import InteriorSamples from "../sections/@dashboard/interior/InteriorSamples";

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

export default function Interior() {
  const { communityId } = useParams();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewInterior, setOpenNewInterior] = useState(false);

  const [InteriorList, setInteriorList] = useState([]);
  let navigate = useNavigate();
  const token = localStorage.getItem("api-token");

  useEffect(() => {
    function fecthData() {
      /* if (token === null) {
        navigate("/");
      } else { */
      axios
        .get(`${getComunityInterior}${communityId}/interiorsamples`, {
          /* headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            }, */
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setInteriorList(data);
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
      label: t("Dashboard.tableHeadInteriorName"),
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - InteriorList.length) : 0;

  const filteredUsers = applySortFilter(
    InteriorList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New Interior
  */

  const handleClickopenNewInterior = () => {
    setOpenNewInterior(true);
  };

  const handleCloseNewInterior = () => {
    setOpenNewInterior(false);
  };
  const [nameAr, setNameAr] = useState();
  const [nameEn, setNameEn] = useState();
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

  const handleChangeNameAr = (e) => {
    setNameAr(e.target.value);
  };
  const handleChangeNameEn = (e) => {
    setNameEn(e.target.value);
  };

  const handleSaveChanges = () => {
    const formData = new FormData();

    formData.append("communityId", communityId);
    formData.append("name", nameEn);

    formData.append("name_ar", nameAr);

    formData.append("image", InteriorImageToUpload);

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
    setOpenNewInterior(false);
  };
  const removeReview = () => {
    setPreviewTypePlanImage([]);
  };
  return InteriorList === undefined ? (
    <LinearProgress />
  ) : (
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
          <Button variant="contained" onClick={handleClickopenNewInterior}>
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
          <UserListToolbar
            placeHolder={t("Dashboard.InteriorPageSearchPlaceHolder")}
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
                  rowCount={InteriorList.length}
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
                            {row.name}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            <InteriorSamples item={row} />
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
            count={InteriorList.length}
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

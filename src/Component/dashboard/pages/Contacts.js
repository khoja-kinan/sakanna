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
import {
  AllContactsUrl,
  EditFloorUrl,
  getComunityFloor,
  NewTypeUrl,
} from "../../../constants/urls";
import FloorMoreMenu from "../sections/@dashboard/floors/FloorMoreMenu";
import FloorShowMore from "../sections/@dashboard/floors/FloorShowMore";

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
  const [openNewFloor, setOpenNewFloor] = useState(false);

  const [ContactsList, setContactsList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

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
    {
      id: "unit_number",
      label: t("Dashboard.tableHeadUnitNumber"),
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ContactsList.length) : 0;

  const filteredUsers = applySortFilter(
    ContactsList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;
  console.log(filteredUsers);
  return (
    <Page title={t("Dashboard.sideBarContacts")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.sideBarContacts")}
          </Typography>
        </Stack>

        {/* tabel */}
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.ContactsPageSearchPlaceHolder")}
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
                  rowCount={ContactsList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {ContactsList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.contact.id}
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
                          {row.contact.isContact === 0
                            ? t("Dashboard.contactMessage")
                            : row.contact.isContact === 1
                            ? t("Dashboard.contactRegisterInterestMessage")
                            : t("Dashboard.contactJoinClubMessage")}
                        </TableCell>
                        <TableCell
                          align={i18n.dir() === "ltr" ? "left" : "right"}
                        >
                          {row.contact.unit_number}
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
            count={ContactsList.length}
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

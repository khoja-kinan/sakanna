import { filter } from "lodash";
import axios from "axios";
import { privilegesListUrl, AllRolesListUrl } from "../constants/urls";

/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  PrivilegesMoreMenu,
  RolesCheckbox,
  RolesCheckboxNew,
} from "../sections/@dashboard/user";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Privileges() {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [privilegeRolesList, setPrivilegeRolesList] = useState([]);
  const [openPrivilege, setOpenPrivilege] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [PrivilegeName, setPrivilegeName] = useState("");
  const [newPrivilegeName, setNewPrivilegeName] = useState("");
  const [PrivilegeDetailsNew, setPrivilegeDetailsNew] = useState([]);
  const [state, setState] = useState("");

  const [privilegeList, setPrivilegeList] = useState([]);
  let navigate = useNavigate();
  let result;

  const token = localStorage.getItem("api-token");
  useEffect(() => {
    async function fecthData() {
      if (token == null) {
        navigate("/");
      } else {
        axios
          .get(privilegesListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                result = data.data;
                setPrivilegeList(result);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });

        axios
          .get(AllRolesListUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              if (data.status === 1) {
                let result = data.data;
                setPrivilegeRolesList(result);
              }
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (privilegeList.length === 0 && privilegeRolesList.length === 0) {
    return null;
  }
  const TABLE_HEAD = [
    { id: "name", label: t("description.NewPrivilegeName"), alignRight: false },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = privilegeList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - privilegeList.length) : 0;

  const filteredUsers = applySortFilter(
    privilegeList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  /* 
      New Privilege
   */
  const handleCloseNewPrivilege = () => {
    setOpenPrivilege(false);
    setIsOpen(false);
  };
  const handleClickOpenNewPrivilege = () => {
    setOpenPrivilege(true);
  };
  const handleChangeNewPrivilegeName = (event) => {
    setNewPrivilegeName(event.target.value);
  };
  const handleConfirmAddNew = () => {
    const data = { name: newPrivilegeName, roles: PrivilegeDetailsNew };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(
        `http://90.153.255.50/socialmediafamous/public/api/admin/privileges/create`,
        data,
        { headers }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenPrivilege(false);
  };
  return (
    <Page title={t("description.PrivilegepageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("description.PrivilegepageTitle")}
          </Typography>
          {roles.includes(6) && (
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              onClick={handleClickOpenNewPrivilege}
            >
              {t("description.PrivilegepageNewButton")}
            </Button>
          )}
        </Stack>
        <Dialog
          disableEscapeKeyDown
          open={openPrivilege}
          onClose={handleCloseNewPrivilege}
          className="PrivilegeDialog"
        >
          <DialogTitle>{t("description.PrivilegepageNewButton")} </DialogTitle>
          <DialogContent sx={{ width: "30rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label={t("description.NewPrivilegeName")}
                  variant="outlined"
                  onChange={handleChangeNewPrivilegeName}
                  value={newPrivilegeName}
                />
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <RolesCheckboxNew
                privilegeRolesList={privilegeRolesList}
                setPrivilegeDetailsNew={setPrivilegeDetailsNew}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseNewPrivilege}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleConfirmAddNew}>{t("description.Ok")}</Button>
          </DialogActions>
        </Dialog>
        <Card>
          <UserListToolbar
            placeHolder={t("description.PrivilegepageSearchPlaceholder")}
            numSelected={selected.length}
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
                  rowCount={privilegeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>

                          <TableCell align="left">{name}</TableCell>
                          {roles.includes(7) && (
                            <TableCell align="right">
                              <PrivilegesMoreMenu
                                Privilege_Name={name}
                                Privilege_Id={id}
                                Privilege_RolesURL={privilegesListUrl}
                                token={token}
                                privilegeRolesList={privilegeRolesList}
                              />
                            </TableCell>
                          )}
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
            count={privilegeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("description.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}

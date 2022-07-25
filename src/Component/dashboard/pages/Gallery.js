/* import { sentenceCase } from "change-case"; */
import { useEffect } from "react";
import useState from "react-usestateref";

import { useNavigate, useParams } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import { UserListHead } from "../sections/@dashboard/user";
//
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getComunityById } from "../../../constants/urls";
import GalleryEdit from "../sections/@dashboard/gallery/GalleryEdit";

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

export default function Gallery() {
  const { communityId } = useParams();
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [GalleryList, setGalleryList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("SakanaApi-token");

  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(`${getComunityById}/${communityId}/images`, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;

              setGalleryList(data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, []);

  if (GalleryList === undefined) {
    return <LinearProgress />;
  }
  console.log(GalleryList);
  const TABLE_HEAD = [
    {
      id: "name",
      label: t("Dashboard.comunityTabeHeadName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "show_more",
      label: t("Dashboard.showgesAndEdit"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - GalleryList.length) : 0;

  return (
    <Page title={t("Dashboard.comunityTabeHeadCommunityGallery")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.comunityTabeHeadCommunityGallery")}
          </Typography>
        </Stack>

        {/* tabel */}
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={GalleryList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  <TableRow hover tabIndex={-1} role="checkbox">
                    <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                      {i18n.dir() === "ltr"
                        ? GalleryList.community_name
                        : GalleryList.community_name_ar}
                    </TableCell>

                    <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                      <GalleryEdit
                        item={GalleryList.images}
                        token={token}
                        community_id={GalleryList.communityId}
                      />
                    </TableCell>
                  </TableRow>
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

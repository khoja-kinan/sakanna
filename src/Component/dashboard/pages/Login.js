/* import { Link as RouterLink } from 'react-router-dom'; */
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography, Button, Box } from "@mui/material";
// layouts
/* import AuthLayout from '../layouts/AuthLayout'; */
// components
import Page from "../components/Page";
import { LoginForm } from "../sections/authentication/login";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import loginPic from "../../Image/logo.png";
import sakannaLogo from "../../Image/logo.png";
/* import AverroesArrow from "../../assets/dashboard/login/AverroesArrow.png"; */
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
const pages = [
  { nameEn: "Home", nameAr: "الرئيسية", href: "/" },
  { nameEn: "About Us", nameAr: "من نحن", href: "/" },

  { nameEn: "Contact", nameAr: "تواصل معنا", href: "/" },
];
// ----------------------------------------------------------------------

export default function Login() {
  const { setAuth } = useAuth();
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const remember_Token = cookies.remember_token;
  const api_Token = localStorage.getItem("api-token");
  const { t } = useTranslation();

  return (
    <RootStyle title="Login | Sakanna">
      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography
          variant="h3"
          sx={{ px: 5, mt: 10, mb: 5, color: "#d4d4d4" }}
        >
          {t("Dashboard.signInWelcome")}
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t("Dashboard.signInTitle")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("Dashboard.signInInstructions")}
            </Typography>
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

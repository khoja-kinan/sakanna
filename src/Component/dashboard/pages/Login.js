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
    height: "100vh",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  backgroundColor: " #E87B5A",
  borderRadius: "0",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 2rem",
}));
const pages = [
  { nameEn: "Home", nameAr: "الرئيسية", href: "/" },
  { nameEn: "About Us", nameAr: "من نحن", href: "/" },
  { nameEn: "Services", nameAr: "خدماتنا", href: "/" },
  { nameEn: "Testimonials", nameAr: "التوصيات", href: "/" },
  { nameEn: "Contact", nameAr: "تواصل معنا", href: "/" },
];
// ----------------------------------------------------------------------

export default function Login() {
  const { setAuth } = useAuth();
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const remember_Token = cookies.remember_token;
  const api_Token = localStorage.getItem("api-token");
  const { i18n } = useTranslation();

  return (
    <RootStyle /* title="Login | Sakanna" */>
      <Container
        maxWidth="sm"
        sx={{
          "&.MuiContainer-root": {
            maxWidth: "620px",
          },
        }}
      >
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <img
              src={sakannaLogo}
              alt="login"
              width={300}
              style={{ margin: "0 auto" }}
            />
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>
      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          {pages.map((page) => (
            <HashLink
              smooth
              to={page.href}
              style={{ textDecoration: "none" }}
              key={page.nameEn}
            >
              <Button
                sx={{
                  my: 2,
                  fontSize: "clamp(0.8rem, 3vw, 1.1rem);",
                  color: "#3C4A53",
                  display: "block",
                  textTransform: "none",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent",
                  },
                  "&.MuiButtonBase-root:after": {
                    content: '" "',
                    position: "absolute",
                    left: "0",
                    bottom: "-2px",
                    width: "0px",
                    height: "2px",
                    background: "#3C4A53",

                    transition: "all 0.45s",
                  },
                  "&.MuiButtonBase-root:hover:after": {
                    width: "60%",
                    left: "8px",
                  },
                  "&.MuiButtonBase-root:focus": {
                    color: "#E87B5A",
                  },
                  "&.MuiButtonBase-root:focus:after": {
                    width: "60%",
                    left: "8px",
                    background: "#3C4A53",
                  },
                }}
              >
                {i18n.dir() === "ltr" ? page.nameEn : page.nameAr}
              </Button>
            </HashLink>
          ))}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridAutoColumns: "1fr",
          }}
        >
          <img
            src={sakannaLogo}
            alt="login"
            width={300}
            style={{ margin: "0 auto", gridColumn: "span 12" }}
          />
          <img
            src={loginPic}
            alt="login"
            style={{
              margin: "0 auto",
              width: "90%",
              height: "auto",
              gridColumn: "span 12",
            }}
          />
        </Box>
      </SectionStyle>
    </RootStyle>
  );
}

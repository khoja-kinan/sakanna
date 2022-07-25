import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// component
import Iconify from "../../../components/Iconify";
// login function
//
import { useTranslation } from "react-i18next";
import { login } from "../../../controller/AuthController";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const loginUser = async () => {
    const result = await login(formik.values.email, formik.values.password);
    if (result != null && result != undefined) {
      localStorage.setItem("SakanaEmail", result.data.email);

      localStorage.setItem("SakanaApi-token", result.data.token);

      navigate("/dashboard/app", { replace: true });
    } else {
      setError(result.data.message);
      setShowError(true);
      formik.setSubmitting(false);
    }
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Dashboard.loginFormValidEmail"))
      .required(t("Dashboard.loginFormRequiredEmail")),
    password: Yup.string().required(t("Dashboard.loginFormRequiredPass")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ outlineColor: "#495676" }}>
          {showError ? (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          ) : (
            ""
          )}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t("Dashboard.loginFormEmail")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={t("Dashboard.loginFormPass")}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
              "& .MuiOutlinedInput-root": {
                flexDirection: i18n.dir() === "ltr" ? "row" : "row-reverse",
              },
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
            underline="hover"
            style={{
              color: "#172120",
            }}
          >
            {t("Dashboard.loginFormForgetPass")}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{
            background:
              "linear-gradient(88.21deg,#375958 -25.83%,#172120 96.08%)",
          }}
        >
          {t("Dashboard.loginFormLoginButton")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

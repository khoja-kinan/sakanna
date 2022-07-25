import "bootstrap/dist/css/bootstrap.min.css";
import Zoom from "react-reveal/Zoom";
import axios from "axios";
import { contactUs } from "../../constants/urls";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ContactFormClub = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState();
  const [nameError, setNameError] = useState(false);
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailError2, setEmailError2] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [state, setState] = useState();

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeContact = (e) => {
    setContact(e.target.value);
  };

  const handleSubmit = () => {
    setNameError(name ? false : true);
    setEmailError(email ? false : true);
    if (email && !emailError) {
      setEmailError2(isValidEmail(email) ? false : true);
    }

    if (name && email && !nameError && !emailError && !emailError2) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }

    const data = {
      communityId: "",
      typeId: "",
      name: name,
      email: email,
      phone: contact,
      isContact: 2,
    };
    const headers = {
      Accept: "application/json",
    };
    axios
      .post(contactUs, data, { headers })
      .then((response) => {
        setState({ Postmessage: response.data });
      })
      .catch((error) => {
        setState({ PostErrorMessage: error.message });
        /*  console.error("There was an error!", error); */
      });
  };
  if (!formValid) {
    return (
      <>
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 bg-light w-57">
          {/* <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{this.props.title}</h3></div> */}
          <div className="card-body">
            <form action="/" encType="multipart/form-data" autoComplete="off">
              <div className="form-group">
                <label className="mb-0 labcon">
                  {t("contactus.Your name")}
                  <span className="text-danger gray">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control incon"
                  value={name}
                  onChange={handleChangeName}
                />
                {nameError ? (
                  <div className="alert alert-danger mt-2">
                    {t("contactus.Name is a required field.")}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label className="mb-0 labcon">
                  {t("contactus.Your email")}
                  <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control incon"
                  value={email}
                  onChange={handleChangeEmail}
                />
                {emailError ? (
                  <div className="alert alert-danger mt-2">
                    {t("contactus.Email is a required field.")}
                  </div>
                ) : (
                  ""
                )}
                {emailError2 ? (
                  <div className="alert alert-danger mt-2">
                    {t("contactus.Email invalid.")}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label className="mb-0 labcon">
                  {t("contactus.Your number")}{" "}
                  <span className="smaller"> ({t("contactus.opt")}) </span>
                </label>
                <input
                  name="contact"
                  type="text"
                  className="form-control incon"
                  onChange={handleChangeContact}
                  value={contact}
                />
              </div>

              <p className="text-center mb-0 labcon">
                <input
                  type="button"
                  className="btn  btn-lg  text-uppercase ioigold"
                  value="Submit Now"
                  onClick={handleSubmit}
                />
              </p>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="thankyou_details">
        <div className="alert alert-success mt-3">
          {t("contactus.Mail sent successfully.")}
        </div>
      </div>
    );
  }
};

export default ContactFormClub;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Zoom from "react-reveal/Zoom";
import axios from "axios";
import { contactUs } from "../../constants/urls";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: false,
      contact: "",
      email: "",
      emailError: false,
      emailError2: false,
      message: "",
      messageError: false,
      formValid: false,
      state: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // isValidcontact(contactno) {
  //   return /^[6-9]\d{9}$/.test(contactno);
  // }

  handleBlur(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });

    if (value.length <= 0 && name === "name") {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }

    if (value.length <= 0 && name === "email") {
      this.setState({ emailError: true });
      this.setState({ emailError2: false });
    } else {
      this.setState({ emailError: false });
      if (this.isValidEmail(value)) {
        this.setState({ emailError2: false });
      } else {
        this.setState({ emailError2: true });
      }
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const {
      name,
      email,
      message,
      contact,
      nameError,
      emailError,
      emailError2,
      messageError,
    } = this.state;

    this.setState({ nameError: name ? false : true });
    this.setState({ messageError: message ? false : true });
    this.setState({ emailError: email ? false : true });
    if (email && !emailError) {
      this.setState({ emailError2: this.isValidEmail(email) ? false : true });
    }

    if (
      name &&
      email &&
      message &&
      !nameError &&
      !emailError &&
      !emailError2 &&
      !messageError
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }

    e.preventDefault();
    const data = {
      communityId: "",
      typeId: "",
      name: name,
      email: email,
      phone: contact,
      message: message,
      isContact: 1,
    };
    const headers = {
      Accept: "application/json",
    };
    axios
      .post(contactUs, data, { headers })
      .then((response) => {
        /* this.setState({ Postmessage: response.data.message }); */
        console.log(response.data.message);
      })
      .catch((error) => {
        /* this.setState({ PostErrorMessage: error.message }); */
        console.error("There was an error!", error);
      });
  }

  render() {
    const {
      name,
      email,
      message,
      nameError,
      emailError,
      emailError2,
      messageError,
      formValid,
    } = this.state;

    if (!formValid) {
      return (
        <>
          <Zoom top>
            <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 bg-light w-57">
              {/* <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{this.props.title}</h3></div> */}
              <div className="card-body">
                <form
                  action="/"
                  onSubmit={(e) => this.handleSubmit(e)}
                  encType="multipart/form-data"
                  autoComplete="off"
                >
                  <div className="form-group">
                    <label className="mb-0 labcon">
                      Your name<span className="text-danger gray">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control incon"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {nameError ? (
                      <div className="alert alert-danger mt-2">
                        Name is a required field.
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label className="mb-0 labcon">
                      Your email<span className="text-danger">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control incon"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {emailError ? (
                      <div className="alert alert-danger mt-2">
                        Email is a required field.
                      </div>
                    ) : (
                      ""
                    )}
                    {emailError2 ? (
                      <div className="alert alert-danger mt-2">
                        Email invalid.
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label className="mb-0 labcon">
                      Your number <span className="smaller"> (Optional) </span>
                    </label>
                    <input
                      name="contact"
                      type="text"
                      className="form-control incon"
                      placeholder="number"
                      onChange={this.handleChange}
                      value={this.state.contact}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-0 labcon">
                      Message<span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="message"
                      type="text"
                      className="form-control incon"
                      placeholder="Message"
                      value={this.state.message}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {messageError ? (
                      <div className="alert alert-danger mt-2">
                        Message is a required field.
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-center mb-0 labcon">
                    <input
                      type="submit"
                      className="btn  btn-lg  text-uppercase ioi"
                      value="Submit Now"
                    />
                  </p>
                </form>
              </div>
            </div>
          </Zoom>
        </>
      );
    } else {
      return (
        <div className="thankyou_details">
          <div className="alert alert-success mt-3">
            Mail sent successfully.
          </div>
        </div>
      );
    }
  }
}

//   ReactDOM.render(
//     <ContactForm title="Contact Form" />,
//     document.getElementById('root')
//   );

export default ContactForm;

import React from "react";
import { useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import Select from "react-select";
import Button from "@mui/material/Button";
import Fade from "react-reveal/Fade";
import { NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTranslation } from "react-i18next";
import CustomPopup from "../CustomPopup/CustomPopup";
import Community from "../Community/Community";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContactForm from "../ContactForm/ContactForm";
import { width } from "@mui/system";
import "../CustomPopup/CustomPopup.scss";
import AlertDialog from "../CustomPopup/CustomPopup";

const Communities = [
  { label: "ALL COMMUNITIES", value: 0 },
  { label: "Orced", value: 3 },
  { label: "Lana", value: 4 },
  { label: "Melia", value: 1 },
  { label: "Carmen", value: 2 },
];
const typesOptions = [
  { label: "ANY ", value: 0 },
  { label: "1 ", value: 1 },
  { label: "2 ", value: 2 },
  { label: "3 ", value: 3 },
  { label: "4 ", value: 4 },
];
const priceOptions = [
  { label: "ANY ", value: 0 },
  { label: "1000$ - 2000$", value: 100 },
  { label: "4000$ - 6000$", value: 200 },
  { label: "7000$ - 10000$", value: 300 },
  { label: "11000$ - 14000$", value: 400 },
];

const SearchContact = () => {
  const { t, i18n } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="ser-con">
        <div className="home-fun">
          <div className="filterss">
            <div className="sele">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7">
                  <g clipPath="url(#clip0_2_3660)">
                    <path
                      d="M20.1073 19.4966C20.1073 19.7489 20.0085 19.9909 19.8327 20.1693C19.6569 20.3477 19.4185 20.4479 19.1699 20.4479H4.17176C3.92315 20.4479 3.68472 20.3477 3.50893 20.1693C3.33314 19.9909 3.23438 19.7489 3.23438 19.4966V9.49762C3.23428 9.35264 3.26682 9.20956 3.32953 9.0793C3.39224 8.94904 3.48346 8.83505 3.59621 8.74603L11.0953 2.82658C11.2598 2.69666 11.4624 2.62613 11.6708 2.62613C11.8793 2.62613 12.0818 2.69666 12.2464 2.82658L19.7455 8.74603C19.8582 8.83505 19.9494 8.94904 20.0121 9.0793C20.0748 9.20956 20.1074 9.35264 20.1073 9.49762V19.4966ZM18.2325 18.5452V9.96189L11.6708 4.7826L5.10914 9.96189V18.5452H18.2325Z"
                      fill="#414263"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_2_3660">
                    <rect
                      x="0.422119"
                      y="0.469086"
                      width="22.4972"
                      height="22.833"
                      rx="11.2486"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="selecty">
                <label className="l-b">{t('SearchBar.com')}</label>
                <Select options={Communities} defaultValue={Communities[1]} />
              </div>
            </div>
            <div className="sele">
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1856 11.0828H17.5881L14.682 0H6.31823L3.41211 11.0828H9.81468V17.7596H5.89179V19H15.1085V17.7596H11.1856V11.0828V11.0828ZM5.14633 9.84246L7.40198 1.24034H13.5983L15.8539 9.84246H5.14633Z"
                  fill="#414263"
                />
              </svg>

              <div className="selecty">
                <label className="l-b">{t('SearchBar.bed')}</label>
                <Select
                  defaultValue={[typesOptions[0]]}
                  options={typesOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
            <div className="sele">
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0026 8.58513L9.31429 4.3614C9.01277 4.14014 8.63007 4.01721 8.22998 4.01721C7.82988 4.01721 7.44718 4.14014 7.14566 4.3614L5.12779 5.86109C5.01182 5.49723 4.94804 5.11371 4.94804 4.71543C4.94804 3.75169 5.30755 2.84696 5.95698 2.17333C6.57161 1.53411 7.3834 1.18009 8.22998 1.18009C10.0391 1.18009 11.5119 2.76337 11.5119 4.71543C11.5119 5.03995 11.825 5.30547 12.2077 5.30547C12.5904 5.30547 12.9035 5.03995 12.9035 4.71543C12.9035 2.11432 10.8045 0 8.22998 0C6.95431 0 5.76563 0.506454 4.87846 1.42594C4.02608 2.311 3.55641 3.47634 3.55641 4.71543C3.55641 5.41364 3.70717 6.08728 3.99129 6.70682L1.46316 8.58513C0.831125 9.05716 0.46582 9.73571 0.46582 10.4487V21.04C0.46582 22.6724 2.03141 24 3.9565 24H12.5093C14.4343 24 15.9999 22.6724 15.9999 21.04V10.4487C15.9999 9.73571 15.6346 9.05716 15.0026 8.58513ZM14.6083 21.04C14.6083 22.0234 13.6689 22.8199 12.5093 22.8199H3.9507C2.79101 22.8199 1.85166 22.0234 1.85166 21.04V10.4487C1.85166 10.075 2.04301 9.71604 2.37352 9.47019L4.66392 7.7689C4.7335 7.84757 4.80308 7.92624 4.87266 8.00492C5.75983 8.9244 6.94851 9.43085 8.22418 9.43085C8.60688 9.43085 8.92 9.16534 8.92 8.84081C8.92 8.51629 8.60688 8.25077 8.22418 8.25077C7.3718 8.25077 6.56582 7.89674 5.95118 7.25753C5.87 7.16902 5.78882 7.08052 5.71344 6.98709L8.05602 5.24647C8.11401 5.20221 8.17779 5.19238 8.22418 5.19238C8.27057 5.19238 8.33435 5.20221 8.39234 5.24647L14.0806 9.47019C14.4112 9.71604 14.6025 10.075 14.6025 10.4487V21.04H14.6083V21.04Z"
                  fill="#414263"
                />
                <path
                  d="M8.99539 14.9232H7.46459C6.92534 14.9232 6.48465 14.5495 6.48465 14.0922C6.48465 13.6349 6.92534 13.2612 7.46459 13.2612H10.1609C10.5436 13.2612 10.8567 12.9957 10.8567 12.6712C10.8567 12.3466 10.5436 12.0811 10.1609 12.0811H8.92581V11.3141C8.92581 10.9895 8.61269 10.724 8.22999 10.724C7.84729 10.724 7.53418 10.9895 7.53418 11.3141V12.0811H7.46459C6.15414 12.0811 5.09302 12.9859 5.09302 14.0922C5.09302 15.2034 6.15994 16.1033 7.46459 16.1033H8.99539C9.53465 16.1033 9.97533 16.4769 9.97533 16.9342C9.97533 17.3915 9.53465 17.7652 8.99539 17.7652H6.24691C5.86422 17.7652 5.5511 18.0307 5.5511 18.3553C5.5511 18.6798 5.86422 18.9453 6.24691 18.9453H7.53418V19.7271C7.53418 20.0516 7.84729 20.3171 8.22999 20.3171C8.61269 20.3171 8.92581 20.0516 8.92581 19.7271V18.9453H9.00699C9.01279 18.9453 9.01859 18.9453 9.02439 18.9453C10.3174 18.9305 11.367 18.0356 11.367 16.9342C11.367 15.823 10.3 14.9232 8.99539 14.9232Z"
                  fill="#414263"
                />
              </svg>

              <div className="selecty">
                <label className="l-b">
                {t('SearchBar.price')}
                  <Select
                    defaultValue={[priceOptions[0]]}
                    options={priceOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="">
            <Button
              onClick={handleClickOpen}
              variant="contained"
              className="kop"
            >
              {t('SearchBar.reg')}
              
            </Button>
            {/* <Button variant="outlined" onClick={handleClickOpen}> */}
            {/* Open alert dialog
        </Button> */}
            <Zoom top>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Register Your Interest"}
                  <button onClick={handleClose} className="klos">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 2L2 13M2 2L7.5 7.5L13 13"
                        stroke="black"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </DialogTitle>
                <DialogContent className="content-pop">
                  <DialogContentText id="alert-dialog-description">
                    <ContactForm />
                  </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
              </Dialog>
            </Zoom>
          </div>
        </div>
      </section>
    </>
  );
};
export default SearchContact;

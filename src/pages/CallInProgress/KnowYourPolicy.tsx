import { FC, useCallback, useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Switch } from "@progress/kendo-react-inputs";
import { useAppDispatch, useAppSelector } from "hooks";
import styles from "./KnowYourPolicy.module.scss";
import {
  setPolicyInfo as setReduxPolicyInfo,
  setIsLoggedIn as setReduxIsLoggedIn,
  setPatientName,
} from "store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const patientDetails = [
//   {
//     id: 1,
//     name: "Brian Lopez",
//     policyId: "1154452254",
//     dob: "1982-09-11",
//     claimStatus: "yes",
//   },
//   {
//     id: 2,
//     name: "Donald Morris",
//     policyId: "1325548609",
//     dob: "1985-05-25",
//     claimStatus: "No",
//   },
//   {
//     id: 3,
//     name: "Randy Ball",
//     policyId: "2534695766",
//     dob: "1935-11-03",
//     claimStatus: "No",
//   },
//   {
//     id: 4,
//     name: "Angela Walker",
//     policyId: "3766541398",
//     dob: "1963-07-07",
//     claimStatus: "yes",
//   },
//   {
//     id: 5,
//     name: "John Allen",
//     policyId: "4103201178",
//     dob: "1941-07-28",
//     claimStatus: "yes",
//   },
//   {
//     id: 6,
//     name: "Julie Miller",
//     policyId: "4538805632",
//     dob: "2004-07-20",
//     claimStatus: "No",
//   },
//   {
//     id: 7,
//     name: "Eugene Valentine",
//     policyId: "6260204182",
//     dob: "1981-07-06",
//     claimStatus: "yes",
//   },
//   {
//     id: 8,
//     name: "Raymond York",
//     policyId: "6277863306",
//     dob: "1943-10-23",
//     claimStatus: "No",
//   },
//   {
//     id: 9,
//     name: "Teresa Mercado",
//     policyId: "7088421100",
//     dob: "1964-11-24",
//     claimStatus: "No",
//   },
//   {
//     id: 10,
//     name: "Linda Briggs",
//     policyId: "7774308098",
//     dob: "1941-03-25",
//     claimStatus: "yes",
//   },
// ];

export const KnowYourPolicy: FC = () => {
  const {isLoggedIn } = useAppSelector(state=>state.config);
  const [showLogIn, setShowLogIn] = useState(false);
  const dispatch = useAppDispatch();

  const [policyId, setPolicyId] = useState("");
  const [dob, setDob] = useState("");
  const [checking, setChecking] = useState(false);

  const [error, setError] = useState<string>("");

  const authenticate = useCallback(async () => {
    const response = await fetch(
      "https://func-hlsbot-v1.azurewebsites.net/api/sql-auth?",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          policy_id: policyId,
          dob: dob,
        }),
      }
    );
    const details = await response.json();
    if (details.status === "success") {
      setError("");
      dispatch(setReduxIsLoggedIn(true));
      dispatch(setReduxPolicyInfo(details.data[0]));
      dispatch(
        setPatientName(details.data[0].first_name + " " + details.data[0].last_name)
      );
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      setShowLogIn(false);
      setPolicyId("");
      setDob("");
      setChecking(false);
    } else if (details.status === "failed") {
      setError(details.message);
      setChecking(false);
    }
  }, [dob, policyId, dispatch]);

  const validateForm = useCallback(() => {
    // Validate Policy ID
    if (!policyId.trim()) {
      setError("Policy ID is required");
      return;
    }
    if (!/^\d{5,10}$/.test(policyId)) {
      setError("Policy ID must be 5-10 digits");
      return;
    }

    // Validate Date of Birth
    const dobDate = new Date(dob);
    const today = new Date();

    if (isNaN(dobDate.getTime())) {
      setError("Invalid date format");
      return;
    }
    if (dobDate > today) {
      setError("Date of Birth cannot be in the future");
      return;
    }
    authenticate();
  }, [dob, policyId, authenticate]);

  const handleLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setError("");
      setChecking(true);
      validateForm();
    },
    [validateForm]
  );

  const handleToggle = useCallback(() => {
    if (!isLoggedIn) {
      setShowLogIn(true);
    } else {
      dispatch(setReduxIsLoggedIn(false));
      dispatch(setReduxPolicyInfo({}));
      dispatch(setPatientName("Guest"));
    }
  }, [isLoggedIn, dispatch]);

  const handleCloseLogin = () => {
    setShowLogIn(false);
    setPolicyId("");
    setDob("");
    setError("");
  };

  return (
    <>
      <ToastContainer />
      <div style={{ cursor: "pointer" }} onClick={handleToggle}>
        {!isLoggedIn ? "Know your Policy " : "Switch to General Details "}
        <Switch onChange={handleToggle} checked={isLoggedIn} />
      </div>
      {showLogIn && (
        <Dialog onClose={() => handleCloseLogin()} title="Login Form">
          <form onSubmit={(e) => handleLogin(e)}>
            <div className={styles.loginContainer}>
              <div className={styles.fieldContainer}>
                <label htmlFor="policyId" className={styles.label}>
                  Policy ID:{" "}
                </label>
                <input
                  type="text"
                  name="policyid"
                  id="policyId"
                  placeholder="Please enter your Policy ID here"
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                  autoFocus
                  className={styles.input}
                />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="DOB" className={styles.label}>
                  DOB
                </label>
                <input
                  type="date"
                  name="dateofbirth"
                  id="DOB"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={styles.input}
                />
              </div>
              {error ? (
                <p className={styles.fieldError}>{error}</p>
              ) : checking ? (
                <p style={{ color: "orange" }}>Checking details...</p>
              ) : null}
              <div>
                <button type="submit" className={styles.submitBtn}>
                  Authenticate
                </button>
              </div>
            </div>
          </form>
        </Dialog>
      )}
    </>
  );
};

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageHeader: {
    fontSize: "14px",
    fontColor: "#293a65",
    fontWeight: "bolder",
  },
  loanEmi: {
    maxWidth: "95%",
    marginRight: "auto",
    textAlign: "center",
    backgroundColor: "#ffe7a7",
    borderRadius: "10px",
  },
  header: {
    fontWeight: "bolder",
    padding: "4px",
  },
  divider: {
    border: "2px",
    marginBottom: "10px",
  },
  interestPayable: {
    maxWidth: "95%",
    marginLeft: "auto",
    textAlign: "center",
    backgroundColor: "#e2fffd",
    borderRadius: "10px",
  },
  totalInterest: {
    marginTop: "10px",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#dfe7fe",
    borderRadius: "10px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "#293a65",
    margin: theme.spacing(3, 0, 2),
    maxWidth: "50%",
  },
  label: {
    margin: "auto",
  },
  inrLabel: {
    margin: "auto",
    paddingLeft: "10px",
  },
}));

export default function App() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    amount: "",
    tenure: "",
    interestRate: "",
  });

  const [results, setResults] = useState({
    loanEmi: "",
    interestPayable: "",
    totalInterest: "",
  });

  const calculateInterests = () => {
    let principle = formValues.amount;
    let rate = formValues.interestRate / 100 / formValues.interestRate;
    let initial = Math.pow(1 + rate, formValues.tenure);
    let second = Math.pow(1 + rate, formValues.tenure) - 1;
    let last = principle * rate;

    let EMI = (last * initial) / second;
    setResults({
      ...results,
      loanEmi: Math.round(EMI),
      interestPayable: Math.round(EMI * formValues.tenure),
      totalInterest: Math.round(EMI * formValues.tenure - formValues.amount),
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" className={classes.pageHeader} variant="h5">
          Loan EMI Calculator
        </Typography>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid
                item
                xl={3}
                lg={3}
                md={6}
                sm={12}
                xs={12}
                className={classes.label}
                align="center"
              >
                Loan Amount
              </Grid>
              <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onKeyPress={(event) => {
                    return event.charCode >= 48 && event.charCode <= 57
                      ? event
                      : event.preventDefault();
                  }}
                  placeholder="Enter amount"
                  fullWidth
                  id="amount"
                  value={formValues.amount}
                  onChange={(event) =>
                    setFormValues({ ...formValues, amount: event.target.value })
                  }
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                className={classes.inrLabel}
              >
                INR
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid
                item
                xl={3}
                lg={3}
                md={6}
                sm={12}
                xs={12}
                className={classes.label}
                align="center"
              >
                Loan Tenure
              </Grid>
              <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  onKeyPress={(event) => {
                    return event.charCode >= 48 && event.charCode <= 57
                      ? event
                      : event.preventDefault();
                  }}
                  fullWidth
                  placeholder="Enter months"
                  fullWidth
                  id="tenure"
                  value={formValues.tenure}
                  onChange={(event) =>
                    setFormValues({ ...formValues, tenure: event.target.value })
                  }
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                className={classes.inrLabel}
              >
                Months
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid
                item
                xl={3}
                lg={3}
                md={6}
                sm={12}
                xs={12}
                className={classes.label}
                align="center"
              >
                Interest Rate
              </Grid>
              <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  // onKeyPress={(event) => {
                  //   return event.charCode >= 48 && event.charCode <= 57
                  //     ? event
                  //     : event.preventDefault();
                  // }}
                  fullWidth
                  placeholder="NN. NN"
                  fullWidth
                  id="interestRate"
                  value={formValues.interestRate}
                  onChange={(event) =>
                    setFormValues({
                      ...formValues,
                      interestRate: event.target.value,
                    })
                  }
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                className={classes.inrLabel}
              >
                %
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {results.loanEmi === "" ? (
          <Button
            onClick={calculateInterests}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Calculate
          </Button>
        ) : (
          <Button
            onClick={() => {
              setResults({
                loanEmi: "",
                interestPayable: "",
                totalInterest: "",
              });
              setFormValues({
                amount: "",
                tenure: "",
                interestRate: "",
              });
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset
          </Button>
        )}
        {results.loanEmi !== "" ? (
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Box className={classes.loanEmi}>
                    <Typography className={classes.header}>Loan EMI</Typography>
                    <Typography className={classes.header}>
                      {" "}
                      &#8377; {results.loanEmi}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Box className={classes.interestPayable}>
                    <Typography className={classes.header}>
                      Interest Payable
                    </Typography>
                    <Typography className={classes.header}>
                      {" "}
                      &#8377; {results.interestPayable}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Box className={classes.totalInterest}>
                    <Typography className={classes.header}>
                      Total Interest{" "}
                      <span className={classes.subHeading}>
                        (Principle + Interest)
                      </span>
                    </Typography>
                    <Typography className={classes.header}>
                      {" "}
                      &#8377; {results.totalInterest}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}

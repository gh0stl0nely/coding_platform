import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';

const themeColor = createMuiTheme({
  palette: {
    primary: {
      main: "#305c8a",
      contrastText: '#fff',
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [userInput, setInput] = useState({
    username: "",
    password: ""
  });

  const [loginStatus, setStatus] = useState({
    isError: false,
    msg: ""
  });

  async function signInUser(e) {
    e.preventDefault();
    const response = await axios.post("/api/login", userInput);
    if (response.data.token) {
      localStorage.setItem("jwt", response.data.token);
      window.location.href = "/";
    } else {

      setStatus({
        isError: true,
        msg: response.data.msg
      });

      setInput({
        username: "",
        password: ""
      });

    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setInput({
      ...userInput,
      [name]: value
    })
  }

  return (
    <ThemeProvider theme={themeColor}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form onSubmit={signInUser} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={userInput.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={userInput.password}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item style={{ display: loginStatus.isError ? "block" : "none" }} item xs={12}>
                <Alert variant="filled" severity="error">
                  {loginStatus.msg == "User not found" ? "Credentials don't exist. Please try again." : "Incorrect credentials. Please try again."}
                </Alert>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>

  );
}
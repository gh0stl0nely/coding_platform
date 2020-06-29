import React, {useState} from 'react';
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
import Alert from '@material-ui/lab/Alert';
import axios from "axios";


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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [userInput, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isDuplicate, setIsDuplicate] = useState(false);

  async function signUpUser(e){
    e.preventDefault();
    const user = await axios.post("/api/signup", {
      username: userInput.username.trim(),
      email: userInput.email.trim(),
      password: userInput.password
    });

    // If found duplicate
    if(user.data.msg == "User existed"){
      setInput({
        username: "",
        email: "",
        password: ""
      });
      setIsDuplicate(true);
    } else {
      // If not found duplicate
      localStorage.setItem('jwt', user.data.token);
      window.location.href = "/";
    }
  }

  function handleChange(e){
    const value = e.target.value;
    const name = e.target.name;

    setInput({
      ...userInput,
      [name] : value
    })
  }

  return (
    <ThemeProvider theme={themeColor}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form onSubmit={signUpUser} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  value={userInput.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={userInput.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={userInput.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item style={{display: isDuplicate ? "block" : "none"}} item xs={12}>
                <Alert variant="filled" severity="error">
                  {isDuplicate ? "User already existed. Please try again with another credentials." : ""}
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
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>

  );
}
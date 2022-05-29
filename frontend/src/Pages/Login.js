import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControl, IconButton, Input, InputAdornment, Paper, TextField } from '@mui/material'
import React from 'react'
import { Container, FieldWrapper } from "../theme/GlobalTheme"
import { BootstrapButton } from '../theme/MuiStyled';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../redux/reducer/snackbar';
import Loader from "../components/Styles/Loader"
import axios from 'axios';


const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDisable, setIsDisable] = React.useState(true)
  const [error, setError] = React.useState("")

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const valid = /\S+@\S+\.\S+/;
    if (!valid.test(email)){
      dispatch(
        setSnackbar(
          true,
          "error",
          "Invalid Email!"
        )
      )
      return false;
    }
    if (password.length ===0 ){
      dispatch(
        setSnackbar(
          true,
          "warning",
          "Password field cannot be empty"
        )
      )
      return false;
    }

    try {
      const config = {
        Headers: {
          "Content-type": "application/json"
        }
      }
      setIsLoading(true)
        const { data } = await axios.post("/api/users/login",{
          email, password
        }, 
          config
       )
       console.log(data)
       localStorage.setItem("userInfo", JSON.stringify(data))
       setIsLoading(false)
    } catch (error) {
      setError(error.response.data.message)
      setIsLoading(false)
    }

  }

  React.useEffect(() => {
    if (error){
      dispatch(
        setSnackbar(
          true,
          "error",
          error
        )
      )
    }
  }, [ error, dispatch ])

  React.useEffect(() => {
    if (email.length > 0 && password.length > 0){
      setIsDisable(false)
    }
    if (email.length === 0 || password.length === 0){
      setIsDisable(true)
    }
  }, [ email, password ])

  return (
    <Container login>
      <Paper sx={{padding: "1em 3em", marginTop: "3vh"}}>
      {isLoading && <Loader />}
      <h2>LOGIN</h2>
      <Box sx={{padding: "0 1em"}}>
        <FieldWrapper>
          <label htmlFor="email">Email Address</label>
          <TextField 
            id="email" 
            placeholder="Email" 
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FieldWrapper>
        <br/>
        <FieldWrapper>
          <label htmlFor="email">Password</label>
          <FormControl sx={{ width: '100%' }} variant="standard">
              <Input
                placeholder="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              </FormControl>
        </FieldWrapper>
        <br/>
        <div style={{textAlign: "right", margin: "0px auto 0px auto"}}>
          <BootstrapButton
            disabled={isDisable}
            style={{marginTop: "1em",height: "2.4em", fontSize: "12px"}}
            onClick={handleLogin}
          >
            Continue
          </BootstrapButton>

          <p>No account yet? <a style={{textDecoration: "none", color: "lightblue"}} href="/register">Register Here</a></p>
        </div>

      </Box>
      </Paper>
    </Container>
  )
}

export default Login
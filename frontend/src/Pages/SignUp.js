import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Box, FormControl, IconButton, Input, InputAdornment, Paper, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSnackbar } from '../redux/reducer/snackbar'
import { Container, FieldWrapper, UserImage } from "../theme/GlobalTheme"
import { BootstrapButton } from '../theme/MuiStyled'
import Loader from "../components/Styles/Loader"


const SignUp = () => {
  const dispatch = useDispatch();
  const initialState = {name: "", email: "", password: ""}
  const [userFields, setUserFields] = React.useState(initialState)

  const userInfoFieldChange = (field, value) => {
    setUserFields({
      ...userFields,
      [field]: value,
    })
  }
  // const [name, setName] = React.useState("")
  // const [email, setEmail] = React.useState("")
  // const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React. useState(null)
  const [isLoading, setIsLoading] = React. useState(false)
  const [isDisable, setIsDisable] = React.useState(true)
  const [userImg, setUserImg] = React.useState("")
  const [statusCode, setStatusCode] = React.useState({status: 0, statusText: ""})

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {

      if (userFields.name.length > 0 && userFields.email.length > 0 && userFields.password.length > 0 && confirmPassword.length > 0){
        setIsDisable(false)
      }
      if (userFields.name.length === 0 || userFields.email.length === 0 || userFields.password.length === 0 || confirmPassword.length === 0){
        setIsDisable(true)
      }
  }, [ userFields, userImg, confirmPassword, isDisable ])
  

  const handleImagePreview = (e) => {
    if (e.target.files){
      setUserImg(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleRegister = async () => {
    const valid = /\S+@\S+\.\S+/;
    if (!valid.test(userFields.email)){
      dispatch(
        setSnackbar(
          true,
          "error",
          "Invalid Email!"
        )
      )
      return;
    }

    if (userFields.password !== confirmPassword) {
      dispatch(setSnackbar(
        true,
        "error",
        "Passwords do not match!"
      ))
      return;
    }

    if (userFields.password.trim().length < 8){
      dispatch(setSnackbar(
        true,
        "warning",
        "Password should 8 or more characters"
      ))
      return;
    }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }
      setIsLoading(true)

      const { data, status, statusText } = await axios.post("/api/users",
        { ...userFields, userImg},
        config
      )
      console.log( data, "here" )
      setStatusCode({...statusCode, status: status, statusText: statusText})
      setIsLoading(false)
      localStorage.setItem("userInfo", JSON.stringify(data))

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
      setUserFields(initialState)
      setConfirmPassword("")
    }

    if (statusCode.length !== 0){
      if (statusCode.status === 201) {
        dispatch(
          setSnackbar(
            true,
            "success",
            `Account successfully ${statusCode.statusText}`
          )
        )
        setUserFields(initialState)
        setConfirmPassword("")
      }
    }
  }, [ error, dispatch, statusCode ])

  // React.useEffect(() => {
  //   console.log({...userFields, userImg})
  // }, [userFields])

  return (
    <Container login>
       <Paper sx={{padding: "1em 3em", marginTop: "3vh"}}>
       {isLoading && <Loader />}
          <h2>Sign up here</h2>
          <Box sx={{padding: "0 1em"}}>
              <UserImage>
                <label htmlFor="avatar">
                  <Avatar id="user-image" src={userImg} />
                </label>
                 <input 
                  id="avatar" 
                  type="file" 
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImagePreview}
                />
              </UserImage>
            <FieldWrapper>
              <label htmlFor="name">Name</label>
              <TextField
                id="name" 
                placeholder="Name" 
                variant="standard"
                type="text"
                // autoComplete="off"
                value={userFields.name}
                onChange={(e) => userInfoFieldChange("name", e.target.value)}
              />
            </FieldWrapper>
            <br/>
            <FieldWrapper>
              <label htmlFor="email">Email Address</label>
              <TextField 
                id="email" 
                placeholder="Email" 
                variant="standard"
                type="email"
                value={userFields.email}
                onChange={(e) => userInfoFieldChange("email", e.target.value)}
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
                    value={userFields.password}
                    onChange={(e) => userInfoFieldChange("password", e.target.value)}
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
          <FieldWrapper>
              <label htmlFor="email">Confirm Password</label>
              <FormControl sx={{ width: '100%' }} variant="standard">
                  <Input
                    placeholder="Password"
                    id="c-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
              />
              </FormControl>
            </FieldWrapper>
            <br/>
            <div style={{ textAlign: "right", margin: "0px auto 0px auto"}}>
              <BootstrapButton 
                style={{marginTop: "1em",height: "2.4em", fontSize: "12px"}}
                disabled={isDisable}
                onClick={handleRegister}
              >
                Register
              </BootstrapButton>

              <p>Already have an account?&nbsp;
                <a style={{textDecoration: "none", color: "lightblue"}} href="/login">Login Here</a>
              </p>
            </div>
        
         </Box>
       </Paper>
    </Container>
  )
}

export default SignUp
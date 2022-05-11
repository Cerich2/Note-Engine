import React from 'react'
import "./LandingPage.css"
import { StyledLandingPage, } from "../theme/GlobalTheme"
import { BootstrapButton, } from "../theme/MuiStyled"
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

// const ButtonIcon = styled(Button)(({theme}) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: "white",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.light
//   },
//   "&:disabled": {
//     backgroundColor: "gray",
//   },
// }))

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <StyledLandingPage>
      <main>
        <h1>Welcome to Note Engine</h1>
        <p>Where you can add note to increase your productivity</p>
        <div className="buttonContainer">
          <BootstrapButton
           className="mainButton"
            sx={{marginRight: "1em", boxShadow: "10px"}}
            onClick={() => navigate("/login")}
            startIcon={<LoginIcon/>}
            >
              Login
            </BootstrapButton>
          <BootstrapButton
            className="mainButton"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </BootstrapButton>
          </div>
      </main>
    </StyledLandingPage>
  )
}

export default LandingPage
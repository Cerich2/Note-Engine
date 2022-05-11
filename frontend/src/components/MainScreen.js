import React from 'react'
import { Container } from "../theme/GlobalTheme"
import { Box } from "@mui/material";
import "./MainScreen.css"

const MainScreen = ({title, children}) => {
    
  return (
    <Container>
        <div className="page">
            {
                title && <>
                <h6  className="heading">{title}</h6>
                <hr/>
                </>
            }
            {children}
        </div>
    </Container>
  )
}

export default MainScreen
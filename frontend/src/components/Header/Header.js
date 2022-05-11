import React from 'react'
import { AppBar, Toolbar, Typography, styled, Box, InputBase, Avatar, Menu, MenuItem } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from "react-router-dom";
import { main } from "../../theme/GlobalTheme"


const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})

const Search = styled("div")(({theme})=>({
    position: "relative",
    backgroundColor: "white",
    padding: "0 20px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
}))

const Icons = styled(Box)(({theme})=>({
    display: "flex",
}))

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  return (
    <AppBar sx={{backgroundColor: `${main}` }}position="sticky">
        <StyledToolBar>
            <Typography 
                variant="h5" 
                sx={{ display: {
                        xs: "none", sm: "block"
                    }}}
            > 
            <Link 
                style={{color: "white", textDecoration: "none"}} 
                to="/"
                >
                    Note Engine
            </Link> 
            </Typography>
            <EventNoteIcon sx={{ display: {xs: "block", sm: "none"}}} />
            <Search>
                <InputBase placeholder="Search..."/>
            </Search>
            <Icons>
                <Typography 
                    sx={{ display: {
                            xs: "none", 
                            sm: "block", 
                            marginRight: "1em",
                        }}}
                > 
                <Link style={{color: "white", textDecoration: "none"}} to="/my-notes" >My Notes</Link>
                </Typography>
                <Avatar 
                    sx={{width: 30, height: 30, cursor: "pointer"}}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            </Icons>
        </StyledToolBar>
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={isMenuOpen}
            onClick={()=> setIsMenuOpen(!isMenuOpen)}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
        <MenuItem onClick={()=> setIsMenuOpen(!isMenuOpen)} >Profile</MenuItem>
        <MenuItem onClick={()=> setIsMenuOpen(!isMenuOpen)}>My account</MenuItem>
        <MenuItem onClick={()=> setIsMenuOpen(!isMenuOpen)}>Logout</MenuItem>
      </Menu>
   </AppBar>
  )
}

export default Header
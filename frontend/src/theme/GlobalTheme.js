import { Button } from '@mui/material';
import styled from 'styled-components';
import note from "../Assets/note.jpg"

export const main = "#3abf7e"
export const StyledLandingPage = styled.div`
    position: relative;
    min-height: 93vh;
    display: flex;
    align-items: center;
    background-image: url(${note});
    background-position: center;
    background-size: cover;
    h1 {
        font-size: 95px;
    }
    p {
        font-size: 25px;
    }
    main {
        margin-top: -5vh;
        width: 100%;
        text-align: center;
    }
    @media only screen and (min-width: 1200px) {
        h1 {
            padding: 0 100px;
        }
      }
    @media only screen and (max-width:768px) {
        h1 {
            font-size: 50px;
            padding: 0 50px;
        }
}
`
export const Container = styled.div`
    min-height: 93vh;
    display: flex;
    width: 90%;
    margin: auto;
`

export const Cards = styled.div`
    width: 100%;
    height: 5vh;
    background-color: pink;
    margin-top: 1em;
    position: relative;
`
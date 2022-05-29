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
    min-height: 94vh;
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
    // background-color: #F4F4F4;
    width: 90%;
    margin: auto;
    ${(props) => props.login && `
        width: 50%;
    `}
`

export const Cards = styled.div`
    width: 100%;
    height: 5vh;
    margin-top: 1em;
    position: relative;
`
export const FieldWrapper = styled.div`
    font-size: 0.9em;
    display: grid;
    #email, #password, #name, #c-password {
        font-size: 0.8em;
    }
  
`
export const UserImage = styled.div`
    display: flex;
    justify-content: right;
    input {
        display: none;
    }
    #user-image {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        width: 3.9em;
        height: 3.9em;
    }
`
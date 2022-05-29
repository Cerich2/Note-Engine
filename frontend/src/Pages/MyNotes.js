import React, { useEffect } from 'react'
import {Paper, Chip, Card} from '@mui/material';
import  MainScreen  from "../components/MainScreen"
import { MainActionButton, ActionButton, Accordion, AccordionSummary, AccordionDetails } from "../theme/MuiStyled"
import "./LandingPage.css"
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from "axios"
import {notes} from "../data/notes"

const MyNotes = () => {
    const welcome = "Welcome Back Spencer"
    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState(0);
    const [noteData, setNoteData] = React.useState([])

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    
    const handleDelete = (id) => {
      if (typeof id === "number"){
       window.confirm("Are you sure?")
      }
    }

    const getNotes = async () => {
      const { data } = await axios.get("/api/notes");
      console.log(data, "here")

      if (data !== undefined || data.length !== 0){
        setNoteData(data)
      }
    } 

    useEffect(()=> {
      getNotes();
    },[])

    return (
      <MainScreen title={welcome}>
          <div style={{ margin: "1.5em 0 0 0"}}>
            <Grid columns={16}  sx={{marginBottom: "2em"}}>
              <MainActionButton>
                    Create new Note
                </MainActionButton>
            </Grid>
          
              {
                noteData.map((note) => {
                  return (
                    <Paper key={note._id}>
                      <Accordion expanded={expanded === note._id} onChange={handleChange(note._id)}>
                          <Card variant="outlined" sx={{ marginBottom: "10px", minHeight: "2.6em", position: "relative"}} columns={16}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                              <Grid item xs={16}>
                                &nbsp;&nbsp;{note.title}
                              </Grid>
                              </AccordionSummary>
                              <Grid sx={{position: "absolute", right: 0, bottom: 7}}>
                                <ActionButton 
                                    className="ActionButton"
                                    sx={{marginRight: "0.5em", 
                                    backgroundColor: "#0E86D4"
                                    }}
                                    onClick={()=> navigate(`/note/${note._id}`)}
                                  >
                                    Edit
                                </ActionButton>
                                <ActionButton
                                  onClick={ ()=>handleDelete(note._id)}
                                >
                                  Delete
                                </ActionButton>
                              </Grid>
                           </Card>
       
                       <AccordionDetails>
                      <h4>
                        <Chip 
                          sx={{marginLeft: "5px", fontWeight: 500}}
                          label={`Category ${note.category}`} 
                          color="success"
                        />
                      </h4>
                      <Grid sx={{minHeight: "3em"}}>
                        <div style={{marginLeft: "1em"}}>
                          <p>{note.content}</p>
                          <p style={{fontStyle: "italic", opacity: 0.5}}>Created on {moment(Date.now()).format('MMMM Do YYYY')}</p>
                        </div>
                        </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Paper>
                  )
                })
              }
          </div>
      </MainScreen>
    )
}

export default MyNotes
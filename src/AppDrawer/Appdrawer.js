import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Autocomplete, Avatar, Button, IconButton, ListItemAvatar, TextField, Tooltip, createTheme, useMediaQuery,useTheme } from '@mui/material';


import { useEffect } from 'react';
import { useState } from 'react';


import { useLocation } from 'react-router-dom';
import axios from "axios"

import SearchEmployee from '../SearchEmployee/SearchEmployee';
import Chatv1 from '../Chatscreen/Chatv1';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { PostAPI } from '../Services/Services';
import { API } from '../API';
import { useNavigate } from 'react-router-dom';
// import SearchEmployee from '../SearchEmployee/SearchEmployee';



const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate=useNavigate()
  const location=useLocation()
  console.log("location",location)
  const username=location.state.name;
  const email=location.state.email;
  const password=location.state.password;
const[localvalue,setLocalvalue]=useState("")
const[message,setMessage]=useState("")
const[emp,setEmp]=useState([])
const[name,setName]=useState("")
const[filterEmployee,setFilterEmployee]=useState([])
const [open, setOpen] = React.useState(false);
const [selectedIndex, setSelectedIndex] = React.useState(null);
const [profileImg, setProfileImg] = React.useState(null);
// const[lastmsg,setLastmsg]=useState("")
const theme = useTheme();

const isXsScreen = useMediaQuery(theme.breakpoints.down('md'));


const themes = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        selected: {
          backgroundColor: 'red', // Replace with your desired selected background color
        },
      },
    },
  },
});


useEffect(()=>{
  
  let data = {
    
    email: email,
    password: password
  }

  PostAPI(API.fetchFilteremoloyee,data).then((response)=>{
    setEmp(response.data)
  }).catch((error)=>{
    console.log(error);
  })
  
 
},[])




const getEmpId=(data,index)=>{
  setSelectedIndex(index)
  console.log("click on id ",data);
  // localStorage.setItem("userid",name)
  // setLocalvalue(localStorage.getItem("userid"))
  setLocalvalue(data.name)
  setProfileImg(data.image)
  // console.log("click on id ",id);
  // console.log(localStorage.getItem("userid"));

}

const sendMessage=(e)=>{
 setMessage( document.getElementById("message").value)
//  setMessage(msg)
console.log(message)

}


const searchName=(e)=>{
  setName(e.target.value)
 
 

}

const handleClick=()=>{
setOpen(true)
}

useEffect(()=>{
  const FormData = require('form-data');
  let data = new FormData();
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.0.103:4000/api/v1/search/'+name,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    setFilterEmployee(response.data)
    console.log(JSON.stringify(response.data));
  }) 
  .catch((error) => {
    console.log(error);
  });
},[name])

const Logout=()=>{
  navigate("/login")
}



console.log("emp",emp); 
console.log("Istrue1===>",profileImg);
  return (
    <Box sx={{ display: 'flex',backgroundColor:"" }}>
      <CssBaseline />
      {isXsScreen? <AppBar 
        position="fixed"
        sx={{ width: `calc(100% - 0px)`, ml: `0px`,backgroundColor:"#524ea8" }}
      >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
        {/* <AccountCircleIcon  /> */}
        {/* <Box sx={{    display: "flex",
              alignItems: "center"}}> */} 
              <Box sx={{display:"flex"}}>
        <IconButton onClick={handleClick}><StorageRoundedIcon/></IconButton>
          {/* <Typography variant="h6" noWrap component="div">
           {localvalue}
          </Typography></Box> */}
          {localvalue? <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`http://192.168.0.103:4000/${profileImg}`} /> 
                 
        </ListItemAvatar>:null}
       
          <Typography variant="h6" noWrap component="div">
           {localvalue}
          </Typography></Box>
          <Box sx={{    display: "flex",
              alignItems: "center"}}>
          <Typography >{"Welcome :) "+username}</Typography>
          <Tooltip title="Logout"><IconButton onClick={Logout} sx={{color:"white"}}><LogoutTwoToneIcon/></IconButton></Tooltip></Box>
        </Toolbar>
      </AppBar>:
      <AppBar 
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,backgroundColor:"#524ea8" }}
      >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
        {/* <AccountCircleIcon  /> */}
        <Box sx={{display:"flex"}}>
        {localvalue?<ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`http://192.168.0.103:4000/${profileImg}`} /> 
                  
        </ListItemAvatar>:null}
          <Typography variant="h6" noWrap component="div">
           {localvalue}
          </Typography></Box>
          <Box sx={{    display: "flex",
              alignItems: "center"}}>
          <Typography >{"Welcome :) "+username}</Typography>
        <Tooltip title="Logout"><IconButton onClick={Logout}  sx={{color:"white"}}><LogoutTwoToneIcon/></IconButton></Tooltip> </Box>
        </Toolbar>
      </AppBar>}
      
    {
isXsScreen?null:
<Drawer
sx={{
  backgroundColor:"red",
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
   
  },
 
}}
variant="permanent"
anchor="left"
>
<Toolbar  sx={{backgroundColor:"#62839e91",}}>
<Button onClick={handleClick} variant='contained' sx={{width:"15vw",backgroundColor:"purple" , ":hover":{backgroundColor:"#642e64"} }}>Find user</Button>
  {/* <TextField type='search' placeholder='Search' size='small' value={name} onChange={searchName} /> */}
  {/* <Autocomplete
disablePortal
id="combo-box-demo"
options={filterEmployee}
sx={{ width: 300 }}
renderInput={(params) => <TextField {...params} label="Movie" />}
/> */}


</Toolbar>
<Divider />

<List sx={{paddingTop:'0px',overflow:"auto"}}>
  {emp?.map((text, index) => (
    <>
    <ListItem key={text}  

    disablePadding>
      <ListItemButton selected={selectedIndex==index} sx={{ bgcolor: '#383c8dd4',color:"black","&:hover":{color:"black"} }} onClick={()=>getEmpId(text,index)}>
        {/* <ListItemIcon>
          {index % 2 === 0 ? <AccountCircleIcon  /> : <AccountCircleIcon  />}
        </ListItemIcon> */}

                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`http://192.168.0.103:4000/${text.image}`} /> 
                  {/* <Avatar alt="Remy Sharp" src="http://localhost:4000/uploads//1697040910853-IMG-20190510-WA0001.jpg" />  */}
        </ListItemAvatar>

        <ListItemText  primary={text.name}  
        sx={selectedIndex==index?{color:"black"}:{color:"white","&:hover":{color:"black"}}}
        // sx={{color:"white","&:hover":{color:"black"}}}
        // secondary={text.name=="sujit"&&lastmsg.message} 
        />
      </ListItemButton>
    </ListItem> <Divider />
    </>
  ))}
</List>


</Drawer>

    }
      
    
    
    <Chatv1 email={email} localvalue={localvalue} username={username}/>
       <SearchEmployee open={open} setOpen={setOpen} emp={emp} filterEmployee={filterEmployee} setName={setName}  name={name} setLocalvalue={setLocalvalue}/>
      </Box>
      
    
  );
}

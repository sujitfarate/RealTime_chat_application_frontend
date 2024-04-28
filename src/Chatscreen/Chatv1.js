
import io from "socket.io-client"
import {
    Box,
    Typography,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Button,
    List,
    IconButton,
    ListItemAvatar,
    Avatar,
    useMediaQuery,useTheme, Dialog, DialogTitle
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./chat.css";
  import { datetime } from "../Common_funtions/common_function";
  import SendIcon from "@mui/icons-material/Send";
  import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';


  
  let socket=io("http://192.168.0.103:4000")
const Chatv1 = (props) => {

const theme = useTheme();

const isXsScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [message, setMessage] = useState(null);
    const[inputMessage,setInputMessage]=useState("")
    const[isTyping,setIsTyping]=useState(false)
    const [typingTimeout, setTypingTimeout] = useState(null);
    const[selectChatid,setSelectChatid]=useState(null)
    const[chooseFile_or_text,setChooseFile_or_text]=useState(true)

socket.on("getData",(msg)=>{
          console.log("msgs",msg)
          setMessage(msg)
        })

    useEffect(()=>{

     
      let msg = JSON.stringify({
        // key:`${props.email}+${props.localvalue}`
        Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
      });

        socket.emit("recieveMsg",msg)
      
       

        setInputMessage("")

    },[props.localvalue])


  
socket.on("checkTyping",(msg)=>{
  console.log("checkTyping",msg)
  setSelectChatid(msg.chatId)
  setIsTyping(msg.isTyping)
})
    

   

   
  




const handleMessage=(e)=>{
  console.log("events",e.target.ke)
setInputMessage(e.target.value)
   
}


const handleKeyDown = (e) => {
  console.log("eevnt",e.keyCode);
  // if(e.keyCode==16||e.keyCode==18) return 
    
  
  socket.emit("isTyping", JSON.stringify({
        
    Chat_Id1: `${props.username}_${props.localvalue}`,
    Chat_Id2: `${props.localvalue}_${props.username}`,
    isTyping:true
  }))
  clearTimeout(typingTimeout);
  setIsTyping(true);
 
};

const handleKeyUp = () => {
 
  clearTimeout(typingTimeout);
  setTypingTimeout(
    setTimeout(() => {

      setIsTyping(false);
      socket.emit("isTyping", JSON.stringify({
        
        Chat_Id1: `${props.username}_${props.localvalue}`,
        Chat_Id2: `${props.localvalue}_${props.username}`,
        isTyping:false
      }))
    }, 2000) // Adjust the duration as needed (in milliseconds)
  );

};

useEffect(() => {
  return () => {
    clearTimeout(typingTimeout);
  };
}, [typingTimeout]);






  
    const sendMessage = () => {
     
      // let message = document.getElementById("msg").value;
      if (inputMessage.trim() == "") {
        alert("please enter message to send");
      } 
      else {
        let data = JSON.stringify({
          from: props.username,
          to: props.localvalue,
          message: inputMessage,
        });

       socket.emit("storeData",data)
       
  
     
    }
  
     
      setInputMessage("")
      console.log("clicked button")
    };

    const sendMessage1=()=>{
    
      const img=document.getElementById("img").files[0]
      console.log("img==>",typeof img);
      console.log("text==>",typeof inputMessage);
      let data ={
        from: props.username,
        to: props.localvalue,
        message: inputMessage?inputMessage:img,
        
      }
      if(inputMessage){
        data.type="text"
      }else if(img){
        data.type="image"
      }else{
        alert("please enter message to send");
      }
     
     
    console.log("data====>",data);
      socket.emit('storeData',data)

      setInputMessage("")
      document.getElementById("img").value=""
//       const inputElement = document.getElementById("img");
// const file = inputElement.files[0];
// console.log("img===>",file);

// const reader = new FileReader();
// reader.onloadend = function () {
//   const imageData = reader.result;
//   let data = {
//       from: props.username,
//         to: props.localvalue,
//     message: imageData,
//   };
//   socket.emit('img', data);
// };

// reader.readAsDataURL(file);

    }
    
    const handleDialog_To_Choose_or_text=()=>{
      setChooseFile_or_text(!chooseFile_or_text)
      
    }
    
   console.log("props.username===>",props.username);
    return (
      <div style={{ width: "-webkit-fill-available" }}>
     
        {props?.localvalue?
        <Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // bgcolor: "background.default",
              backgroundColor:"#bcbcd9",
              p: 3,
              overflowY: "scroll",
              height: "90vh",
            }}
          >
            <Toolbar />
           
            <List>
              {message?.map((val) => {
                // console.log("message==>", `http://localhost:4000/img/${val.message}}`);
                return (
                  <>
                    <ListItem
                      sx={{
                        textAlign: val.from == `${props.username}`
                        ? "right"
                        : "left",
                          // val.Chat_Id == `${props.username}_${props.localvalue}`
                          //   ? "right"
                          //   : "left",
                        display: "grid",
                        justifyContent:
                        val.from == `${props.username}`
                            ? "end"
                            : "flex-start",
                        // justifyContent:
                        //   val.Chat_Id == `${props.username}_${props.localvalue}`
                        //     ? "end"
                        //     : "flex-start",
                      }}
                    > 
                    {/* <ListItemAvatar> */}
                    {/* <Avatar alt="Remy Sharp" src="/images/profile.JPG" />  */}
          
         {/* </ListItemAvatar> */}
         
         {val.type=="image"?<img src={`http://192.168.0.103:4000/img/${val.Chat_Id}/${val.message}`}width="auto" height="300px"/>: <ListItemText
                        primary={
                          val.from == `${props.username}`
                          // val.Chat_Id == `${props.username}_${props.localvalue}`
                            ? `you: ${val.message}`
                            : `${props.localvalue} : ${val.message}`
                        }
                        secondary={datetime(val.datetime)}
                        sx={{
                          backgroundColor:val.from == `${props.username}`
                          //  val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"#3052c4a1":"white",
                          color:val.from == `${props.username}`
                          // val.Chat_Id == `${props.username}_${props.localvalue}`
                          ?"white":"black",
                          border: "1px aqua",
                          borderRadius: "5px",
                          padding: "8px",
                        }}
                      />}
                     
                      {/* {val?.type=="image"?<img src="http://localhost:4000/img/file_1705155406347.jpg" width="300px" height="300px"/>:null} */}
                    </ListItem>
                  </>
                );
              })}
            </List>
            
            
            <div style={{position:"fixed",bottom:"11vh"}}>{isTyping?"Typing...":null}</div>
          </Box>

          <footer className="message">
          
            
             <input
              type="text"
              placeholder="Enter Message..."
              style={{
                // minWidth: isXsScreen? "89%":"94%",
                minWidth: isXsScreen? "76%":"89%",
                // height: "5vh",
                padding:"18px",
                // borderRadius: "13px",
                border: "1px solid white" ,
              }}
              value={inputMessage}
              onChange={handleMessage}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              // id="msg"
            />
             <IconButton   sx={{marginRight:"10px"}}>
              <label>
          <input
              type="file"
             
              style={{
                display: "none",
                minWidth: isXsScreen? "76%":"89%",
                // height: "5vh",
                padding:"18px",
                // borderRadius: "13px",
                border: "1px solid white" ,
              }}
              // value={inputMessage}
              // onChange={handleMessage}
              // onKeyDown={handleKeyDown}
              // onKeyUp={handleKeyUp}
              id="img"
            />
         <AttachmentRoundedIcon/>
            </label></IconButton>
            {/* <IconButton sx={{marginRight:"10px"}} onClick={handleDialog_To_Choose_or_text}><AttachmentRoundedIcon/></IconButton>  */}
             <IconButton onClick={sendMessage1} sx={{ backgroundColor: "#383c8dd4",margingLeft:"15px",'&:hover': {
          backgroundColor: '#383c8dd4', 
        }, }}>
              <SendIcon sx={{color:"white",   
              }}/>
            </IconButton>
           
            
            {/* <IconButton onClick={sendMessage} sx={{ backgroundColor: "#383c8dd4",margingLeft:"15px",'&:hover': {
          backgroundColor: '#383c8dd4', 
        }, }}>
              <SendIcon sx={{color:"white",   
              }}/>
            </IconButton> */}
            {/* <SendIcon/> */}
          </footer>
        </Box>:<img src="./medium-shot-people-using-apps-make-friends_23-2150580359.jpg" style={{    width: "80.9vw",
    height: "41.4vw",
    position: "absolute",
    top: "64px"}}/>}
       
      </div>
    );
}

export default Chatv1
import React, {useState,useEffect} from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import {useStateValue} from './StateProvider'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';




function Chat() {
    
    const [input,setInput]=useState('');
    const [seed,setSeed]=useState('');
    const {roomId} = useParams()
    const [roomName,setRoomName]=useState("")
    const [messages,setMessages]=useState([])
    const [{user},dispatch]=useStateValue()




    useEffect(() => {
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
            setRoomName(snapshot.data().name)
        ));
        db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map((doc)=>doc.data()))
        ))
        
      }
    
      
      
    }, [roomId]);
    

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
        var ele=document.getElementById("bottom")
        ele.scrollTop=(2000000000);
    },[roomId])

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log('text message>>> ',input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("")
        
        var ele=document.getElementById("bottom")
        ele.scrollTop=(2000000000);

    }


    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className='chat__headerinfo'>
                    <h3>{roomName}</h3>
                    <p>Last message at {" "}
                    
                        {new String((messages?.[messages.length-1]?.timestamp?.toDate().toUTCString())).slice(-12)}
                        {" on "}
                        {new String((messages?.[messages.length-1]?.timestamp?.toDate().toUTCString())).slice(0,-12)}

                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <ManageSearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>

            </div>
            <div className='chat__body' id='bottom'>
                {/* <p className='chat__message'>
                    Message
                    <span className='chat__name'>Abhi Pal</span>
                    <span className='chat__time'>3:58pm</span>

                </p>
                <p className='chat__message'>
                    Mwsadasddsfsdfsdfsdfdsfdgfdgfdgdfgdfghfdhgfhgfhgfhfghfghfghfghfghfghfghsefsfsdfsdfdsfdsfsdfsdfsdfsdfsdfsdfsdfsdfdsfsdfdsfsdfsdfsdfsdfdsdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfffffffffffffffffsdfsdfsdfsdfsdfsdfsdfsd
                    <span className='chat__name'>Abhi Pal</span>
                    <span className='chat__time'>3:58pm</span>
                </p>
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    Mwsadasddsfsdfsdfsdfdsfdgfdgfdgdfgdfghfdhgfhgfhgfhfghfghfghfghfghfghfghsefsfsdfsdfdsfdsfsdfsdfsdfsdfsdfsdfsdfsdfdsfsdfdsfsdfsdfsdfsdfdsdsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfffffffffffffffffsdfsdfsdfsdfsdfsdfsdfsd
                    <span className='chat__name'>Me</span>
                    <span className='chat__time'>3:58pm</span>
                </p>
                <p className='chat__message chat__receiver'>
                    Message
                    <span className='chat__name'>Me</span>
                    <span className='chat__time'>3:59pm</span>

                </p> */}
                {messages.map(message=>(
                <p className={`chat__message ${message.name===user.displayName && 'chat__receiver'}`}>
                    {message.message}
                    <span className='chat__name'>{message.name===user.displayName ?"me":message.name}</span>
                    <span className='chat__date'>{new String((message.timestamp?.toDate().toUTCString())).slice(0,12)}</span>

                    <span className='chat__time'>{new String((message.timestamp?.toDate().toUTCString())).slice(-12)}</span>
                </p>))}
            </div>
            <div className='chat__footer'>
                <IconButton>

                    <InsertEmoticonIcon/>
                </IconButton>

                <form>
                    <input type="text" placeholder='Type a message' value={input} onChange={(e)=>setInput(e.target.value)}></input>
                        
                    <Button variant="contained"  type="submit" onClick={sendMessage}><SendIcon/> </Button>
                </form>

                <IconButton>
                    <MicIcon/>
                </IconButton>

            </div>
        </div>
    )
}

export default Chat

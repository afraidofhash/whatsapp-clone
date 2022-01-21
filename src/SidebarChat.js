import React ,{useState,useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {

    const [seed,setSeed]=useState('a');
    const [messages,setMessages]=useState("")

    useEffect(() => {
      if(id){
          db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>doc.data()))
          )
      }
      console.log("messages",messages)
    }, [id]);
    

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])


    const createChat=()=>{
        const roomName=prompt("Please enter room name for chat")

        if(roomName)
        {
            //do some database
            db.collection('rooms').add({
                name:roomName,
            })
        }
    }

    return !addNewChat?(

        <Link to={`/rooms/${id}`}>

            <div className='sidebarchat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className="sidebarchat__info">
                    <h2>{name}    
                    <div className='time'>{messages[0]?new String((messages[0]?.timestamp?.toDate().toUTCString())).slice(-12):""}</div>
                     </h2>
                    <p>{messages[0]?.name.slice(0,10) }{ messages[0]?":":"No messages yet"}  {messages[0]?.message.slice(-20)}{messages[0]?.message.length>=(20)?"...":""}</p>
                </div>
            </div>
        </Link>
    )
    :
    (
        <div onClick={createChat} className="sidebarchat">
            <div className='sidebarchataddnew'>

                <h2><AddIcon/>Add new Chat </h2>
            </div>
        </div>
    )
}

export default SidebarChat

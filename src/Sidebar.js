import React,{useState,useEffect} from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from "./firebase"
 import { useStateValue } from './StateProvider';

function Sidebar() {
    const [{user},dispatch]=useStateValue()

    const[rooms,setRooms] = useState([])

    useEffect(() => {
        const unsubscribe=
        db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        ))

        return()=>{
            unsubscribe();
        }
    }, [])


    return (
        <div className='sidebar'>
        
            <div className="sidebar__header">
                <div className='sidebar__headerLeft'>
                
                    <Avatar src={user?.photoURL}></Avatar>
                    
                    Beta test
                </div>
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className='search__container'>
                    <SearchIcon ></SearchIcon>
                    <input placeholder='Search or start new chat' type="text"></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} style={{ textDecoration: 'none' }}/>
                ))}
                
            </div>
        </div>
    );
}

export default Sidebar

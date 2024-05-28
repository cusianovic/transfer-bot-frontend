import { useEffect, useState, forwardRef} from 'react';
import './css/ChatBody.css'
import Message from "./Message"

function ChatBody({history, searchRef, loading}){

    const [messageObject, setMessageObject] = useState([])

    function generateMessageLogs(){
        console.log(history.length)
        let messageList = []
        
        history.forEach((element, index) => {
            
            let msg;
            if(index == history.length - 1){ 
                msg = <Message key={index} message={element} ref={searchRef}/>
            }
            else{
                msg = <Message key={index} message={element}/>
            }


            messageList.push(msg)
        });

        setMessageObject(<>{messageList}</>)
    }

    useEffect(()=>{
        console.log(loading)
        if(!loading){
            generateMessageLogs()
        }
    }, [history])

    if(loading){ return <div className='loading'>loading</div> }
    else if(history.length === 0){ return <div className='noMessage'>Type a Message to start</div> }
    else { return <div className='chatbody'>{messageObject}</div> }

}


export default ChatBody;
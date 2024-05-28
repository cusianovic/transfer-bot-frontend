
import { forwardRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './css/Message.css'

const Message = forwardRef(({message}, ref) => {

    function determineName(type){
        let str = "";
        if(type == "User") str = "You";
        else str = "Bot";
        return str;
    }

    useEffect(()=>{
        ref?.current.scrollIntoView({behavior: "smooth"})
    }, [])

    return(
        <div className='message'>
            <span className="messageUser">{determineName(message['type'])}:</span>
            <div className="messageText"><ReactMarkdown className="markdownParser">{message['message']}</ReactMarkdown>
            {(ref != null) ? <div style={{all:'unset', height: '0px'}} ref={ref}></div> : <></>}</div> 
        </div>

    )
});


export default Message
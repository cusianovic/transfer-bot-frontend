import './css/MessageBox.css'
import { useState } from 'react'


// We need a prop to keep track of 

function MessageBox({queryText, setQueryText, submitQuery}){

    const [textAreaHeight, setTextAreaHeight] = useState(1);
    const [minRows, setMinRows] = useState(1);
    const [rows, setRows] = useState(1);
    const [maxRows, setMaxrows] = useState(9);

    function commentEnter(e){
        if (e.key === "Enter" && e.shiftKey == false && queryText.length != 0){
            e.preventDefault()
            setRows(1) 
            return submitQuery()
        }
    }

    function updateBox(event){
        const lineHeight = 15;
        const previousRows = event.target.rows;
        event.target.rows = minRows;

        const currentRows = ~~(event.target.scrollHeight / lineHeight)

        if(currentRows == previousRows){
            event.target.rows = currentRows;
        }

        if(currentRows >= maxRows){
            event.target.rows = maxRows;
        }

        setRows( (currentRows < maxRows) ? currentRows : maxRows )   
    }



    return(
        <div height={`${textAreaHeight}em`} className="messagebox">
            <textarea value={queryText} onKeyDown={ commentEnter } onChange={(e)=>{ setQueryText(e.target.value) }} rows={rows} id="prompt-textarea" placeholder='Ask UCLA a question about transfer!' onInput={updateBox}></textarea>
            <button onClick={(e) => { submitQuery(e) }} className='submit'>
                <svg id="submit-icon"><path fill="none" stroke="#000000" stroke-width="2" d="M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"/></svg>
            </button>
        </div>
            
    );
}


export default MessageBox;
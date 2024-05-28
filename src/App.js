import logo from './logo.svg';
import './App.css';
import './components/css/header.css'

import Header from './components/Header'
import MessageBox from './components/MessageBox';
import ChatBody from './components/ChatBody'; 
import { useEffect, useMemo, useRef, useState } from 'react';


function App() {

  const [history, setHistory] = useState([])
  const [messageinProgress, setMessageInProgress] = useState(false)
  const [loadinginProgress, setLoadingInProgress] = useState(true)
  const [queryText, setQueryText] = useState("")
  const [isSSESet, setIsSSESet] = useState(true)
  const endSearchRef = useRef(null)


  useEffect(() => {
    let sse = new EventSource('http://localhost:5000/listen', {withCredentials: true}); 

    console.log("making new SSE")
    function startup(e){
        let data = e.data
        data = data.replaceAll("%0A", "\n")
        console.log("History:")
        let h = JSON.parse(data)
        setHistory((state) =>{
          return h;
        })
        setLoadingInProgress(false)
        sse.removeEventListener("startup", startup)
    }

    function getQuery(data){
        data = data.replaceAll("%0A", "\n")
        console.log("Query")
        console.log(data)

        let historyElement = {
          "type": "Bot",
          "message": data
        }

        console.log("getQuery: ")
        console.log(history)

        setHistory((state) => {
          return [...state, historyElement]
        })
      }

      sse.onopen = (() => {
        sse.addEventListener("startup", startup)
      })

      sse.onerror = (() =>{
        setIsSSESet(false)
      });

      sse.addEventListener("queryResponse", (e) => getQuery(e.data))
      
      return () => {
        sse.close();
      }
  }, [isSSESet]);
    
    
  function submitQuery(event){
    if(event){ event.preventDefault() }
    
    console.log("submitQuery: ")
    console.log(history)
    
    let historyElement = {
      'type': "User",
      'message': queryText
    }
    setHistory((state) => {
      return [...state, historyElement]
    })
    setQueryText("")
    
    fetch('http://localhost:5000/query', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(queryText),
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      if(response.status >= 200 && response.status < 300){
        console.log("Client request went through")
        setMessageInProgress(true)
        return response.status
      }
    })
  }

  return (
    <div className='app'>
      <Header/>
      <ChatBody history={history} searchRef={endSearchRef} loading={loadinginProgress}/>
      <div style={(loadinginProgress) ? {'pointerEvents': 'none'} : {}}>
        <MessageBox queryText={queryText} setQueryText={setQueryText} submitQuery={submitQuery}/>
        <p className='footnote'>Not affiliated with the University of California or UCLA</p>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import LoginForm from './templates/loginform';

const clientId = "486049257205-vd8d0oiflg1hq8qt0cl0l3m75olibr7e.apps.googleusercontent.com";

function App() {

  useEffect(() =>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });

  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;

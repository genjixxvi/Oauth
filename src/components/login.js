import { GoogleLogin } from 'react-google-login';

const clientId = "486049257205-vd8d0oiflg1hq8qt0cl0l3m75olibr7e.apps.googleusercontent.com";

function Login({ onSuccess, onFailure }) {
  return (
    <div id="signInButton" style={{ width: '350px', display: 'flex-end' }}>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        className='span'
      />
    </div>
  );
}

export default Login;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <GoogleOAuthProvider clientId="198663761522-osnjd48065j34p2k59162s0hg0trvvp9.apps.googleusercontent.com">

        <App />

    </GoogleOAuthProvider>

    // </StrictMode>,
)

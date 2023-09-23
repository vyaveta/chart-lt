/* eslint-disable no-unused-vars */
import './App.css'
import IntroPage from './components/intro/page'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Navbar from './components/nav-bar/nav-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const clerkPubKey = "pk_test_YmVsb3ZlZC1saXphcmQtODAuY2xlcmsuYWNjb3VudHMuZGV2JA"

function App() {

  return (
    <div className='wrapper' >
      <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Navbar />
        <IntroPage />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
    <ToastContainer />
    </div>
  )
}

export default App

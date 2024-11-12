import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
            try {
                const provider = new GoogleAuthProvider();
                const auth = getAuth(app );

                const result = await signInWithPopup(auth, provider);
                const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
                });
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/');
            } catch (error) {
                console.log("could not sign in with google", error);
            }
        }
    
    return (
        <button onClick={handleGoogleClick} type="button" className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-gray-100 w-4/5 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
        </button>
    );
}

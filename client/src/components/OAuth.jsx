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
        <button onClick={handleGoogleClick} type="button" className="text-white bg-gradient-to-br from-orange-400 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-300 font-medium rounded-lg uppercase text-sm p-3 w-full text-center me-2 mb-2">Continue with GOOGLE</button>
    );
}

import { auth, provider } from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

function Auth() {
  const navigateTo = useNavigate();
  const {userIsAuth} = useGetUserInfo()

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
    const authInfo = {
      userID: results.user.uid,
      userPfp: results.user.photoURL,
      usersProfileName: results.user.displayName,
      userIsAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigateTo("/expense-tracker");
  };

   if (userIsAuth){
    return <Navigate to= "/expense-tracker" />
   }


  return (
    <div className="login-page">
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        {""}
        Sign in with Google
      </button>
    </div>
  );
}

export default Auth;

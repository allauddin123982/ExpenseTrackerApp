//Google Authentication page
import { useNavigate } from "react-router-dom";
//4
import {auth, provider} from "../../config/firebase-config";
import {signInWithPopup} from "firebase/auth"; 
export const Auth = () => {
  const navigate = useNavigate();
  const signInGoogle = async() => {
    //1 will call a part firebase packege that we define in config 
    
    //5 call popup
    const results = await signInWithPopup(auth, provider)//user just signed in
    console.log({results})
    //6 keep track of user_id, user_name, userProfilepic and login or not 
    //7 then store that info to local storage and when refresh info still remain 
    const userAuth = {
      userID: results.user.uid,
      name:results.user.displayName,
      profilePhoto:results.user.photoURL,
      isAuth:true
    }
    localStorage.setItem("auth", JSON.stringify(userAuth)); //in local we cannot store objects but only boolean,strin Numbers    

    //after login 
    //8 we want user expense-tracker page
    navigate("/expense-tracker")

  };

  return (
    <>
      <div>
        <p>Sign in with Google</p>
        <button className="btn btn-primary" onClick={signInGoogle}>Sign in</button>
      </div>
      Hello world
    </>
  );
};

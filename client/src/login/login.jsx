import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Login = () => {

    const navigation = useNavigate();

    const [authData, setAuthData] = useState({
        phone: '',
        password: ''
    });

    const goAuth = async (e) => {
        e.preventDefault();
        if(!authData.phone.length < 2  && !authData.password.length < 2) {
            try {
                await axios.post('http://localhost:3001/user/loginU', {
                    phone_number: authData.phone,
                    password: authData.password
                })
                localStorage.setItem("user_auth", authData.phone)
                navigation("/")
            } catch (error) {
                alert(error.response.data.message)
            }
        } else {
            alert('Check fields!');
        }
    }

    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <form className="login-form" onSubmit={goAuth}>
                    <h3>Sign in</h3>
                    <p>Phone number :</p>
                    <input type="text" onChange={event => {setAuthData({...authData, phone: event.target.value})}}/>
                    <p>Password :</p>
                    <input type="password" onChange={event => {setAuthData({...authData, password: event.target.value})}}/>
                    <button>Sign in</button>
                    <span>You do not have an account - <a href="./registration">register</a></span>
                </form>
            </div>
        </div>
    );
}

export default Login;
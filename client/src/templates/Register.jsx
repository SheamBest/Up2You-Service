import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigation = useNavigate();

    const [regData, setRegData] = useState({
       second_name: '',
       first_name: '',
       phone: '',
       password: '',
       funds: 0
    });

    const goReg = async (e) => {
        e.preventDefault();
        let isnum = /^\d+$/.test(regData.phone);
        if (!isnum) {
            alert("Phone number must contains only digits with max value 9")
            return;
        }
        if(!regData.second_name.length < 2  && !regData.first_name.length < 2  && !regData.phone.length < 4 && !regData.password.length < 2) {
            const requestme = await axios.post('http://localhost:3001/user/registrationU', {
                second_name: regData.second_name,
                first_name: regData.first_name,
                password: regData.password,
                phone_number: regData.phone,
                funds_number: regData.funds 
            })
            alert('Account created!')
            navigation("/login")
        } else {
            alert('Check fields!');
        }
    }

    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <form className="login-form" onSubmit={goReg}>
                    <h3>Register:</h3>
                    <p>First Name :</p>
                    <input type="text" onChange={event => {setRegData({...regData, first_name: event.target.value})}}/>
                    <p>Second Name :</p>
                    <input type="text" onChange={event => {setRegData({...regData, second_name: event.target.value})}}/>
                    <p>Phone number :</p>
                    <input type="text" onChange={event => {setRegData({...regData, phone: event.target.value})}}/>
                    <p>Password :</p>
                    <input type="password" onChange={event => {setRegData({...regData, password: event.target.value})}}/>
                    <button>Register</button>
                    <span>Do you have an account - <a href="./login">log in</a></span>
                </form>
            </div>
        </div>
    );
}

export default Register;
import '../App.css';
import logo from '../Images/logo.png';
import {useEffect} from "react";
import imageslogo from '../Images/user-interface.png'

const Header = () => {

  const logout = () => {
    localStorage.removeItem("user_auth");
  }

    return (
        <div class="header_inner">
            <div class="header__logo"> <img src={logo} alt="" />Up2You</div>
            <div className="menu">
                <nav class="nav">
                    <a class="nav__link"
                        href="./">Home</a>
                  {localStorage.getItem("user_auth") &&
                      <a className="nav__link" href="https://www.ukr.net/news/main.html">News</a>}

                    <a class="nav__link"
                        href="./about">About
                        Us</a>
                    {localStorage.getItem("user_auth") &&
                    <a class="nav__link"
                        href="./service">Services</a>}
                  {!localStorage.getItem("user_auth") && <a className="nav__link"
                                                           href="./login"> <img className="images-logo" src={imageslogo} alt="" /> </a>}
                  {localStorage.getItem("user_auth") && <a className="nav__link"
                                                           href="./" onClick={logout}>Logout</a>}
                </nav>
            </div>
        </div>
    )
}

export default Header;
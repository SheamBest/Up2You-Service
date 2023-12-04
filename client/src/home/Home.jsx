import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';

const Home = () => {
    return (
        <div className="main-wrap">
           <Header />
           
           <div className="content-home">
           <Timer />
               <h1>Together we are strong</h1>
               <p className="desc">
               On the morning of February 24, 2022, Russia launched a full-scale invasion of Ukraine without declaring war. All the money will be used to help Ukraine.
               </p>
               <div className="btn">
                   <a href="./registration">
                       <p>Join us now</p>
                   </a>
                   {localStorage.getItem("user_auth") &&
                   <a href="./service">
                   <p>Buy services now</p></a>}
                   {!localStorage.getItem("user_auth") && <a href="#">
                       <p>Buy services now</p>
                   </a>}
               </div>
           </div>
        </div>
    );
}

export default Home;

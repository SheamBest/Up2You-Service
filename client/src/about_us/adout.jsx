import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';

const About = () => {
    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <p className="mainA">About Us</p>
                <p className="textA"> 
                    My team includes only one person and it is me, Maksym Shelvakh.
                    I am creating and promoting assistance to Ukraine, which is not in the best position at the moment.
                    This website was written and launched by me, so that everyone could help Ukraine and the people living in it.
                    Every hryvnia or unit of currency that you send helps a lot.
                </p>
<p className="textA">Thank you all for your support.</p>
<p className="textA">Together we will win</p>


            </div>
        </div>
    );
}

export default About;
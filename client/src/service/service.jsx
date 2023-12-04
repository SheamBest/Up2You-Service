import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';
import {useEffect, useState} from "react";
import axios from "axios";

const Service = () => {

    const [mm, setMm] = useState(false)

    const fetchServices = () => {
        const request = axios.get('http://localhost:3001/service')
            .then(data => {
                document.getElementsByClassName('block-service')[0].innerHTML = '';
                for(let i = 0; i < data.data.length; i++) {
                    document.getElementsByClassName('block-service')[0].innerHTML += `
            <div class="service">
                    <p class="service-name">${data.data[i].name_service}</p>
                    <p class="service-category">${data.data[i].category}</p>
                    <p class="service-price">${data.data[i].price}</p>
                    <p class="service-hryvnia-char">₴</p>
            </div>
            `;
                }
            });
    }

    useEffect(() => {
        if(!mm) {
            setMm(true)
            console.log('me')
            fetchServices()
        }
    }, [])

    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <h3 className='service-h3'>Services</h3>
                <div className="block-service">
                </div>
            </div>
        </div>
    );
}

export default Service;

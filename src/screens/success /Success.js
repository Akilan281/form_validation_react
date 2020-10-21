import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SCREEN } from '../../common/Constant';
import './styles/success.css'

function Success(props) {
    let location = useLocation();

    const [userlist, setUserlist] = useState(location.state)
    return (
        <div className='container'>
            {console.log("userlist", location.state)}
            { userlist.map((item) => {
                return (

                    <div className="card" >
                        <div className="card-body">
                            <h1 className="card-title">{item.name} Successfully Registered !!</h1>
                            <h6 className="card-subtitle mb-2 ">Job Title: {item.jobTitle}</h6>
                            <h6 className="card-subtitle mb-2 ">Company Name: {item.company}</h6>
                            <h6 className="card-subtitle mb-2 ">Experiince: {item.experience}</h6>
                            <h6 className="card-subtitle mb-2 ">Country: {item.country}</h6>
                            <h6 className="card-subtitle mb-2 ">State: {item.state}</h6>
                            <h6 className="card-subtitle mb-2 ">Mobile: {item.mobile}</h6>
                            <h6 className="card-subtitle mb-2 ">Email Address: {item.email}</h6>
                        </div>
                    </div>

                )
            })
            }
            <div className="form-group">
                <button className="btn btn-danger btn-lg" onClick={() => props.history.push(SCREEN.PERSONAL)}>Back</button>
            </div>

        </div>
    )
}

export default Success

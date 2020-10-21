import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { SCREEN, LOCAL_STORAGE } from '../../common/Constant';

function OfficeDetailsComponent(props) {
    let location = useLocation();

    const [company, setCompany] = useState('')
    const [jobdetails, setJobdetails] = useState('')
    const [email, setEmail] = useState('')
    const [experience, setExperience] = useState('')
    const [checkboxset, setCheckbox] = useState(false)
    const [officeDetails, setOffice] = useState(location.state)

    useEffect(() => {
        if (location.state == null) {
            props.history.goBack()
        }
    }, [])

    function handleInput(value, type) {
        if (type === "company") {
            setCompany(value)
        } else if (type === "email") {
            setEmail(value)
        }
        else if (type === "job") {
            setJobdetails(value)
        } else {
            setExperience(value)
        }
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setCheckbox(true)
        } else {
            setCheckbox(false)
        }

    }

    function handleVerify(e) {
        e.preventDefault()
        let jobinfo = jobdetails.trim()
        let emailinfo = email
        let companyinfo = company
        let experinenceinfo = experience;
        let checkValidEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));

        if (companyinfo == '') {
            alert("Please enter Company name")
        } else if (!checkValidEmail) {
            alert("please enter valid email")
        } else if (jobinfo == '') {
            alert("please enter JobTitle")
        } else if (experinenceinfo == '') {
            alert("please enter valid experience")
        } else if (checkboxset != true) {
            alert("please accept the terms and conditions")
        } else {
            handleOffice(companyinfo, emailinfo, jobinfo, experinenceinfo)
        }

    }

    function handleOffice(companyinfo, emailinfo, jobinfo, experinenceinfo) {
        var getUserDetails = localStorage.getItem(LOCAL_STORAGE.USER_DETAILS);
        var parseUserDetails = JSON.parse(getUserDetails);
        var userdetails = parseUserDetails != null ? parseUserDetails : [];

        var isUserExist = userdetails.find((item) => (item.email == emailinfo));

        if (isUserExist) {
            alert('Email Already exist')
        } else {

            let userList = officeDetails
            console.log("userList", userList)
            userList.company = companyinfo
            userList.email = emailinfo
            userList.jobTitle = jobinfo
            userList.experience = experinenceinfo
            console.log("userList", userList)
            props.history.push({
                pathname: SCREEN.VERIFICATION,
                state: userList
            });
        }

    }
    return (location.state != null ?
        <div className='container-fluid formbox'>
            <div className="form-container ">
                <div className='form-group'>
                    <h2 className='form-head'>Add Your Company Details </h2>
                </div>
                <div className='form-group'>
                    <a className="text-wanted">Upload Your Company Logo</a>
                </div>
                <div className="form-group">
                    <label >Company Name</label>
                    <input placeholder="Enter your company" type="text" onChange={(e) => { handleInput(e.target.value, "company") }} className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Email Id</label>
                    <input placeholder="Enter your Email Id" type="email" onChange={(e) => { handleInput(e.target.value, "email") }} className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Job Title</label>
                    <input placeholder="Enter your Job Title" onChange={(e) => { handleInput(e.target.value, "job") }} type="text" className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Years of Experience</label>
                    <input placeholder="Enter your Experience" onChange={(e) => { handleInput(e.target.value) }} type="number" className="input form-control" />
                </div>
                <div className="form-group">
                    <input type="checkbox" onChange={(e) => handleCheck(e)} defaultChecked={checkboxset} /><span><a> I accept the <a className="text-wanted">Terms and Conditions</a></a></span>
                </div>
                <div className=" form-group">
                    <button className="btn btn-light" onClick={() => props.history.goBack()}>Back</button>
                    <span>
                        <button className="btn btn-next" onClick={(e) => handleVerify(e)}>Send OTP</button>
                    </span>
                </div>
            </div>
        </div > : null
    )
}

export default OfficeDetailsComponent

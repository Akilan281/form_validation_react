import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { SCREEN, LOCAL_STORAGE } from '../../common/Constant';
import profileImage from '../../assets/images/profile_image.jpg'
import { connect } from 'react-redux'
import { formList } from '../../redux/action/Action';

function OfficeDetailsComponent(props) {
    let location = useLocation();

    const [company, setCompany] = useState('')
    const [jobdetails, setJobdetails] = useState('')
    const [email, setEmail] = useState('')
    const [experience, setExperience] = useState('')
    const [checkboxset, setCheckbox] = useState(false)
    const [officeDetails, setOffice] = useState(props.formlist)
    const [file, setFile] = useState('')

    useEffect(() => {
        if (Object.keys(props.formlist).length > 0 && company == '') {
            var object = props.formlist;
            console.log("office",props.formlist)
            setCompany(object.company);
            setEmail(object.email);
            setJobdetails(object.jobTitle)
            setExperience(object.experience);
          
     
        }
    }, [props.formlist])

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
            userList.company = companyinfo
            userList.email = emailinfo
            userList.jobTitle = jobinfo
            userList.experience = experinenceinfo
            props.formdata(userList)
            props.history.push(SCREEN.VERIFICATION);
        }

    }
    function handleChange(event) {
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    { console.log("officeDetails", officeDetails) }
    return (
        //location.state != null ?

        <div className='container-fluid formbox'>
            <div className="form-container ">
                <div className='form-group'>
                    <h2 className='form-head'>Add Your Company Details </h2>
                </div>
                <div className='form-group'>

                    <img src={file != '' ? file : profileImage} className="profile-image" />
                    <span>
                        <input type="file" className="upload-button" onChange={(e) => handleChange(e)} />
                       <a className="upload-text">Upload Your Company Logo</a> 
                    </span>
                </div>
                <div className="form-group">
                    <label >Company Name</label>
                    <input placeholder="Enter your company" value={company} type="text" onChange={(e) => { handleInput(e.target.value, "company") }} className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Email Id</label>
                    <input placeholder="Enter your Email Id" value={email} type="email" onChange={(e) => { handleInput(e.target.value, "email") }} className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Job Title</label>
                    <input placeholder="Enter your Job Title" value={jobdetails} onChange={(e) => { handleInput(e.target.value, "job") }} type="text" className="input form-control" />
                </div>
                <div className="form-group">
                    <label >Years of Experience</label>
                    <input placeholder="Enter your Experience" value={experience} onChange={(e) => { handleInput(e.target.value) }} type="number" className="input form-control" />
                </div>
                <div className="form-group">
                    <input type="checkbox" onChange={(e) => handleCheck(e)} defaultChecked={checkboxset} /><span><a> I accept the <a className="text-wanted">Terms and Conditions</a></a></span>
                </div>
                <div className=" form-group">
                    <button className="btn btn-light" onClick={() => props.history.goBack(props)}>Back</button>
                    <span>
                        <button className="btn btn-next" onClick={(e) => handleVerify(e)}>Send OTP</button>
                    </span>
                </div>
            </div>
        </div >
        //: null
    )
}

const mapStateToProps = ({ FormReducerComponent }) => {

    console.log("formlist", FormReducerComponent.formlist)
    return {

        formlist: FormReducerComponent.formlist

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        formdata: (data) => (dispatch(formList(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeDetailsComponent)

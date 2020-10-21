import React, { useState } from 'react'
import './styles/componentstyle.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import PhoneInput from 'react-phone-number-input/input'
// import flags from 'react-phone-number-input/flags'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { SCREEN, LOCAL_STORAGE } from '../../common/Constant';
import { Link } from 'react-router-dom';
function PersonalDetailsComponent(props) {
    const [username, setUserName] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [phone, setPhone] = useState('')

    function handleUser(value) {
        setUserName(value)
    }
function handleGender(e){
  
        setGender(e.target.value)
        console.log(e.target.value)
   
}
    function handleCountryState(val, type) {
        if (type === "country") {
            setCountry(val)
        } else {
            setRegion(val)
        }
    }
    function handlephone(value) {
        setPhone(value)
    }

    function handleNext(e) {
        e.preventDefault();
        let user = username
        let sex = gender
        let mobile = phone
        let nation = country
        let state = region
        if (user == '') {
            alert('Please fill valid full name')
        } else if (sex == '') {
            alert('Please select Gender')
        } else if (nation == '') {
            alert('Please select Country')
        } else if (state == '') {
            alert('Please select state')
        } else if (phone.length < 10) {
            alert('Please enter valid number')
        } else
            navigateOfficepage(user,sex, mobile, nation, state)
    }

    function navigateOfficepage(user,sex, mobile, nation, state) {
        var getUserDetails = localStorage.getItem(LOCAL_STORAGE.USER_DETAILS);
        var parseUserDetails = JSON.parse(getUserDetails);
        var userdetails = parseUserDetails != null ? parseUserDetails : [];
        var isUserExist = userdetails.find((item) => (item.name == user));
        if (isUserExist) {
            alert('User Already exist')
        } else {
            let userinfo = {
                name: user,
                gend: sex,
                mobile: mobile,
                country: nation,
                state: state,
            }
            props.history.push({
                pathname: SCREEN.OFFICE,
                state: userinfo
            });
            console.log("userinfo", userinfo)
        }
    }
    return (
        <div className='container-fluid formbox'>
            <form className="form-container ">
                <div className='form-group'>
                    <h2 className='form-head'> Add Your Personal Details</h2>

                </div>
                <div className="form-group">
                    <label >Full name</label>
                    <input placeholder="Enter Fullname" onChange={(e) => { handleUser(e.target.value) }} type="email" className="input form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <input type="radio" id="radio1" name="radios" value="male"  onChange={ handleGender} />
                    <label for="radio1">Male</label>
                    <input type="radio" id="radio2" name="radios" value="female" onChange={ handleGender} />
                    <label for="radio2">Female</label>
                    <input type="radio" id="radio3" name="radios" value="other" onChange={ handleGender} />
                    <label for="radio3">Other</label>
                </div>
                <div className="form-group">
                    <label >Country</label>
                    <CountryDropdown
                        className="input form-control"
                        value={country}
                        onChange={(val) => handleCountryState(val, "country")}
                    />
                </div>
                <div className="form-group">
                    <label >State</label>
                    <RegionDropdown
                        className="input form-control"
                        country={country}
                        value={region}
                        onChange={(val) => handleCountryState(val)}
                    />
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <PhoneInput
                        style={{
                            inputClass: "input form-control"
                        }}
                        country={country ? country.substring(0, 2).toLocaleLowerCase() : 'in'}
                        onChange={(e) => handlephone(e)}
                    />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn1 btn-block" onClick={(e) => handleNext(e)} value='Next'>
                        Next
                    </button>
                </div>
                <div className="form-group">
                <p className='form-head'>Already have an account? <a href="">Log in</a></p>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetailsComponent

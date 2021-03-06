import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCAL_STORAGE, SCREEN } from '../../common/Constant'
import './styles/verify.css'
import { connect } from 'react-redux'
import { formList } from '../../redux/action/Action';

function VerificationComponent(props) {
    let location = useLocation()

    const [Otp, setOtp] = useState(new Array(5).fill(""));

    // useEffect(() => {
    //     if (location.state == null) {
    //         props.history.goBack()

    //     }
    // }, [])
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        console.log("value", element.value)

        setOtp([...Otp.map((d, idx) => (idx === index) ? element.value : d)])

        //Focus next input
        if (element.nextElementSibling) {
            element.nextElementSibling.focus();
        }

    };

    function handleverify(e) {
        e.preventDefault()
        let otp = Otp.join('');
        if (otp.length != 5) {
            alert("enter valid OTP")
        } else {
            let userDetails = []
            let userInfo = props.formlist
            userDetails.push(userInfo)
            localStorage.setItem(LOCAL_STORAGE.USER_DETAILS, JSON.stringify(userDetails))
            console.log("userDetails", userDetails)
            props.history.push({
                pathname: SCREEN.SUCCESS,
            });

            props.formdata(userDetails)
        }

    }

    return (
        //location.state != null ?

            <div className='container-fluid formbox'>
                <div className="form-container">
                    <div className='form-group'>
                        <h2 className='form-head'>Email Verification</h2>
                    </div>
                    <div className='form-group'>
                        <p className='form-head'>For your security</p>
                    </div>
                    <div className="form-group">
                        <div className="form-head">
                            <label >Enter the OTP</label>
                            <div className="user-input">
                                {
                                    Otp.map((data, index) => {
                                        return (
                                            <input
                                                className="input1"
                                                type="text"
                                                maxlength="1"
                                                key={index}
                                                value={data}
                                                onChange={e => handleChange(e.target, index)}
                                                onFocus={e => e.target.select()}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-light" onClick={() => props.history.goBack()}>Back</button><span> <button className="btn  btn-next" onClick={(e) => { handleverify(e) }}>Verify</button></span>
                    </div>
                </div>
            </div>
          //  : null
    )
}

const mapStateToProps = ({ FormReducerComponent }) => {

    console.log("formlist",FormReducerComponent.formlist)
    return {

        formlist : FormReducerComponent.formlist

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        formdata: (data) => (dispatch(formList(data))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationComponent)

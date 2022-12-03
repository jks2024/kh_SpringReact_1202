import React, {useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import './App.css';
import AxiosApi from './api/AxiosApi'
import Modal from './util/Modal'
import imgLogo from './images/tier_logo.png'
import imgBottom from './images/nedbank_s.png'

const Login = () => {
    const navigate = useNavigate();
    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState("");
    const [isPw, setIsPw] = useState("");

    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };

    const onChangId = (e) => {
        setInputId(e.target.value)
        if (e.target.value.length < 5 || e.target.value.length > 12) {
            setIdMessage("5자리 이상 12자리 미만으로 입력해 주세요.");
            setIsId(false);
        } else {
            setIdMessage("올바른 형식 입니다.");
            setIsId(true);
        }
    }
    const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value;
        setInputPw(passwordCurrent)
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }
    }
    const onClickLogin = async() => {
        //로그인을 위한 axios 호출
        const res = await AxiosApi.memberLogin(inputId, inputPw);
        console.log(res.data);
        if (res.data === true) {
            window.localStorage.setItem("userId", inputId);
            window.localStorage.setItem("userPw", inputPw);
            window.localStorage.setItem("isLogin", "TRUE");
            navigate('/home');
        } else {
            setModalOpen(true);
        }
    }
    return (
        <div>
            <div className="container">
                <div className="item1">
                    <img src={imgLogo} alt="Logo" />
                </div>
                <div className="item2">
                    <input className="input" placeholder="아이디" value ={inputId} onChange={onChangId}/>
                </div>
                <div className="hint">
                    {inputId.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}
                </div>
                <div className="item2">
                    <input className="input" placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
                </div>
                <div className="hint">
                    {inputPw.length > 0 && (
                        <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
                </div>
                <div className="item3">
                    {/* <Link to="/FindId" className="find_id">
                        <span>Forgot Your ID/Password?</span>
                    </Link> */}

                </div>
                <div className="item2">
                    {(isId && isPw) ?
                        <button className="enable_button"
                                onClick={onClickLogin}>SING IN</button>  :
                        <button className="disable_button"
                                onClick={onClickLogin}>SING IN</button>}
                    <Modal open={modalOpen} close={closeModal} header="오류">아이디 및 패스워드를 재확인해 주세요.</Modal>
                </div>
                <div className="signup">
                    <Link to="/Signup" className="link_style">
                        <span>Sign Up</span>
                    </Link>
                </div>
                <div className="bdlogo">
                    <img src={imgBottom} alt="NedBank" />
                </div>
            </div>
        </div>
    )
};
export default Login;

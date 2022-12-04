import React, { useState } from 'react';
import imgArrow from '../images/left_b.png'
import {Link, useNavigate} from "react-router-dom";
import Modal from '../util/Modal.js';
import AxiosApi from '../api/AxiosApi';

const SignupS1 = () =>{
    const navigate = useNavigate();
    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputConPw, setInputConPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputAddr, setInputAddr] = useState("");

    // 오류 메시지
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [mailMessage, setMailMessage] = useState("");

    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isAddr, setIsAddr] = useState(false);
    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModelText] = useState("중복된 아이디 입니다.");

    const closeModal = () => {
        setModalOpen(false);
    };

    const onChangePw = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }
    }

    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다. )')
            setIsConPw(true);
        }
    }

    const onChangeName = (e) => {
        setInputName(e.target.value);
        setIsName(true);
    }

    const onChangeMail = (e) => {
        setInputEmail(e.target.value);
        setIsMail(true);
    }
    const onChangeAddr = (e) => {
        setInputAddr(e.target.value);
        setIsAddr(true);
    }

    const onClickLogin = async() => {
        console.log("Click 회원가입");
        const memberReg = await AxiosApi.memberReg(inputName, inputEmail, inputPw, inputAddr);
        console.log(memberReg);
        if(memberReg.data === true) {
            navigate('/');
        } else {
            setModalOpen(true);
            setModelText("회원 가입에 실패 했습니다.");
        }
    }

    return(
        <div>
            <div className="container">
                <Link to="/" className="left_arrow">
                    <img src={imgArrow} alt="left" />
                </Link>

                <div className="sign">
                    <span>Sign Up</span>
                </div>
                <div className="item2">
                    <input className="input" type="text" placeholder="이름" value ={inputName} onChange={onChangeName}/>
                </div>
                <div className="hint">
                    {inputId.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{idMessage}</span>}
                </div>
                <div className="item2">
                    <input className="input" type="password" placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
                </div>
                <div className="hint">
                    {inputPw.length > 0 && (
                        <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
                </div>
                <div className="item2">
                    <input className="input" type="password" placeholder="패스워드 확인" value ={inputConPw} onChange={onChangeConPw}/>
                </div>
                <div className="hint">
                    {inputPw.length > 0 && (
                        <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
                </div>
                <div className="item2">
                    <input className="input" type="email" placeholder="이메일" value ={inputEmail} onChange={onChangeMail}/>
                </div>
                <div className="item2">
                    <input className="input" type="text" placeholder="주소" value ={inputAddr} onChange={onChangeAddr}/>
                </div>

                <div className="item2">
                    {(isName && isPw && isConPw && isMail && isAddr) ?
                        <button className="enable_button" onClick={onClickLogin}>NEXT</button> :
                        <button className="disable_button" onClick={onClickLogin}>NEXT</button>}
                    <Modal open={modalOpen} close={closeModal} header="오류">{modalText}</Modal>
                </div>
            </div>
        </div>
    )
};

export default SignupS1;
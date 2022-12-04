import React, { useState, useEffect } from 'react';
import AxiosApi from "../api/AxiosApi";
import alarmGo from '../images/bell.png'
import nowGo from '../images/short_cut.png'
import logoWhite from '../images/tier_logo_white.png'
import imgPhone from '../images/ned_phone.png'
import Modal from '../util/Modal'

const Home = () => {
    const localId = window.localStorage.getItem("userId");
    const localPw = window.localStorage.getItem("userPw");
    const [memberInfo, setMemberInfo] = useState("");

    useEffect(() => {
        const memberData = async () => {
            const response = await AxiosApi.memberGet("ALL"); // 원래는 전체 회원 조회용
            if(response.status === 200) setMemberInfo(response.data);
            console.log(response.data)
        };
        memberData();
    }, []);

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const confirmModal = async() => {
        // setModalOpen(false);
        // const memberReg = await KhApi.memberDelete(localId);
        // console.log(memberReg.data.result);
        // if(memberReg.data.result === "OK") {
        //     window.location.replace("/");
        // } else {
        //
        // }
    };
    const onClickMemberReg = () => {
        console.log("회원 가입으로 이동");
        window.location.replace("/Signup");
    }

    const onClickMemberDelete = () => {
        setModalOpen(true);
    }

    const onClickLogout = () => {
        console.log("Logout 추가");
        window.localStorage.setItem("userId", "");
        window.localStorage.setItem("userPw", "");
        window.localStorage.setItem("isLogin", "FALSE");
        window.location.replace("/");
    }

    return(
        <div>
            <div className="container">
                <div className="mainhead">
                    <div className="logo2">
                        <img src={logoWhite} alt="White" />
                    </div>
                    <div className="bell">
                        <img src={alarmGo} alt="alarm" />
                    </div>
                </div>
                <div className="linkwallet" >
                    <img src={imgPhone} className="nedlogo" alt="bigN" />
                    <span className="linkwallet1">There is no wallet connected.</span>
                    <span className="linkwallet2">Test CK</span>
                </div>
                <div className="EFT" >
                    <img src={nowGo} className="imgEFT" alt="GoEFT" />
                    <span className="EFTtypo">전체 회원 리스트</span>
                </div>
                <div className="ATM" onClick={onClickMemberReg}>
                    <img src={nowGo} className="imgATM" alt="onClickMemberReg" />
                    <span className="ATMtypo">회원 추가</span>
                </div>
                <div className="Peer" onClick={onClickMemberDelete}>
                    <img src={nowGo} className="imgPeer" alt="GoPeer" />
                    <span className="Peertypo">회원 탈퇴</span>
                </div>
                <div className="QR" onClick={onClickLogout}>
                    <img src={nowGo} className="imgQrblack" alt="GoQrpay" />
                    <span className="QRtypo">로그아웃</span>
                </div>
                <div className="QR" >
                    <img src={nowGo} className="imgQrblack" alt="GoQrpay" />
                    <span className="QRtypo">회원 정보 설정</span>
                </div>
                <div className="history" >
                    {memberInfo && memberInfo.map(member => (
                        <div key={member.id}>
                            <p>{member.id}</p>
                            <p>{member.name}</p>
                            <p>{member.email}</p>
                            <p>{member.join}</p>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && <Modal open={modalOpen} confirm={confirmModal} close={closeModal} type={true} header="확인">정말 탈퇴하시겠습니까?</Modal>}
        </div>
    )
};

export default Home;
import '../App.css'
import logo from '../images/kafe_logo_192.png';
import {useNavigate} from "react-router-dom";
import { useCookies} from 'react-cookie';
import React from 'react';
import axios from "axios";

function Header({user}) {
    let navigate = useNavigate();

    const [cookies, removeCookie] = useCookies(['id']);
    // console.log(cookies);
    // console.log(user);

    const btnGoToMain=()=>{
        // navigate("/", {
        //     state: info
        // });
        navigate("/")
        window.location.replace("/")
    }

    const btnGoToLogin=()=>{
        navigate("/login")
    }

    const btnGoToSignup=()=>{
        navigate("/signup")
    }

    const btnMyPage=()=>{
        axios.get(`https://kafe.one/api/shorturl`,{
            headers: {
                authorization: `${cookies.id}`
            },
        }).then(function (res){
            //console.log(res.data.data.shortUrlList);
            navigate('/list', {
                state: {
                    user: user,
                    list: res.data.data.shortUrlList
                }
            });
        }).catch(function (err){
            //console.log(err);
        });


    }

    const btnLogout=()=>{
        if (window.confirm('로그아웃하시겠습니까?')) {
            removeCookie('id');
            navigate('/');
            window.location.replace("/")
        }
    }

    return(

    <nav className="bg-white drop-shadow-[4px_2px_2px_rgba(0,0,0,0.11)]">
        <div className="mx-auto max-w-full px-4 sm:px-6 md:px-6 lg:px-10 xl:px-10 2xl:px-10">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    {/*<div className="flex-shrink-0">*/}
                    <div className="items-center flex flex-shrink-0 cursor-pointer select-none" onClick={btnGoToMain} >
                        <img className="h-10 w-10" src={logo} alt="Your Company"/>
                        <p className="text-[#000000] font-suit font-bold text-[30px] mx-3 sm:mx-3">Kafe</p>
                    </div>
                    {/*<div className="hidden md:block">*/}
                    {/*</div>*/}
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        {(cookies.id==='undefined')||(cookies===null)
                            ?
                            <div>
                                <button className="mx-[15px] px-4 text-[#81664D] font-suit font-bold  text-[17px] cursor-pointer" onClick={btnGoToLogin}>로그인</button>
                                <button className="py-[8px] w-[77px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF] font-suit font-extrabold text-[15px] cursor-pointer" onClick={btnGoToSignup}>회원가입</button>
                            </div>
                            :
                            <div>
                                <button className="mx-[15px] px-2 text-[#81664D] font-suit font-bold text-[16px] cursor-pointer" onClick={btnMyPage}>{user.name}</button>
                                <button className="mx-[15px] py-[8px] w-[77px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF] font-suit font-extrabold text-[15px] cursor-pointer" onClick={btnLogout}>로그아웃</button>
                            </div>
                        }

                    </div>
                </div>

                <div className="flex md:hidden">

                    {(cookies.id==='undefined')||(cookies===null)
                        ?
                        <div>
                            <button className="mx-[15px] px-4 text-[#81664D] font-suit font-bold  text-[17px] cursor-pointer" onClick={btnGoToLogin}>로그인</button>
                            <button className="py-[6px] px-3 rounded-[8px] bg-[#FEDB82] text-[#FFFFFF] font-suit font-extrabold text-[13px] cursor-pointer" onClick={btnGoToSignup}>회원가입</button>
                        </div>
                        :
                        <div>
                            <button className="mx-[15px] px-2 text-[#81664D] font-suit font-bold text-[16px] cursor-pointer" onClick={btnMyPage}>{user.name}</button>
                            <button className="py-[6px] px-3 rounded-[8px] bg-[#FEDB82] text-[#FFFFFF] font-suit font-extrabold text-[13px] cursor-pointer" onClick={btnLogout}>로그아웃</button>
                        </div>
                    }
                </div>
            </div>
        </div>

    </nav>
    );
}
export default React.memo(Header);

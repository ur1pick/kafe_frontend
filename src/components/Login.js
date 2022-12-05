import google from '../images/btnGmail.png';
import logo from '../images/kafe_logo_192.png';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { useCookies,Cookies } from 'react-cookie';

function Login(){

    const [email,setEmail]= useState('');
    const [pw,setPw]= useState('');
    const [cookies, setCookie] = useCookies(['id']); // 쿠키 훅

    let navigate = useNavigate();
    const btnGoToMain=()=>{
        navigate("/")
    }

    const btnGoToLogin=()=>{
        navigate("/login")
    }

    const inputEmail=(e)=>{
        setEmail(e.target.value);
    }

    const inputPw=(e)=>{
        setPw(e.target.value);
    }

    const btnLogin=()=>{
        if((email.length===0)||(email===null)||(email.match(/\s/g))){
            alert('이메일을 입력해주세요!');
        }else if((pw.length===0)||(pw===null)||(pw.match(/\s/g))){
            alert('비밀번호를 입력해주세요!');
        }else {
            axios.post(`https://kafe.one/api/signin`, {
                email: `${email}`,
                password: `${pw}`
            }).then(function (res){
                //console.log(res.headers.authorization);
                setCookie('id', res.headers.authorization);// 쿠키에 토큰 저장
                //console.log(cookies);
                navigate('/')
            }).catch(function (err){
                //console.log(err.response);
                if(err.response.status===401){
                    alert('등록되지 않은 이메일이거나 비밀번호를 잘못 입력했습니다!')
                }else{
                    alert('일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 이용해 주세요!')
                }
            });
        }

    }


    const keyLogin=(e)=>{
        if(e.key==='Enter'){
            if((email.length===0)||(email===null)||(email.match(/\s/g))){
                alert('이메일을 입력해주세요!');
            }else if((pw.length===0)||(pw===null)||(pw.match(/\s/g))){
                alert('비밀번호를 입력해주세요!');
            }else{
                btnLogin()
            }
        }
    }

    const btnGoToSignup=()=>{
        navigate("/signup")
    }

    const btnGoogle=()=>{
        alert('google oauth');
    }

    const btnForget=()=>{
        alert('google oauth');
    }


    return(
        <div className="grid grid-cols-3 h-screen">
            <div className="bg-[#fffff] place-self-center">
                <div className="items-center flex cursor-pointer self-center" onClick={btnGoToMain}>
                    <img className="mr-[30px] h-[100px] w-auto float-left" src={logo} alt=""/>
                    <strong className="text-[#000000] font-suit font-bold text-[44px]">Kafe</strong>
                </div>
            </div>

            <div className="col-span-2 bg-[#FFEEC3] flex justify-center ">
                <div className="bg-[#ffffff] self-center mx-auto place-items-center items-center basis-[55%]">
                {/*<div className="bg-[#ffffff] self-center">*/}
                    <div className="w-full justify-between flex flex-row">
                        <span className="py-[15px] w-full bg-[#ffffff] font-suit font-semibold text-[18px] text-center align-middle cursor-pointer" onClick={btnGoToLogin}>로그인</span>
                        <span className="py-[15px] w-full bg-[#D9D9D9] font-suit font-semibold text-[18px] text-center align-middle cursor-default cursor-pointer" onClick={btnGoToSignup}>회원가입</span>
                    </div>
                    <div className="px-[40px] py-[20px]">
                        <input type="text" className="w-full my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="이메일" onChange={inputEmail} onKeyPress={keyLogin}/>
                        <input type="password" className="w-full my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium  placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="비밀번호" onChange={inputPw} onKeyPress={keyLogin}/>

                        <p className="my-[20px] py-[8px] rounded-[5px] bg-[#FEDB82] text-[#FFFFFF] font-suit font-bold text-[20px] text-center align-middle cursor-pointer" onClick={btnLogin}>로그인</p>
                        <p className="my-[30px] mx-[15px] text-[#6A5440] font-suit font-semibold text-[16px] text-center underline cursor-pointer" onClick={btnForget}>비밀번호를 잊으셨나요?</p>

                        <img src={google} alt="sign in with Google" className=" block mx-auto cursor-pointer" onClick={btnGoogle}/>
                    </div>

                    {/*<div className="px-[40px] justify-between items-center flex flex-nowrap cursor-default">*/}
                    {/*    <span className="h-[1px] bg-[#767676] block basis-1/4 "></span>*/}
                    {/*    <p className="block text-center font-suit font-medium text-[#767676] text-[16px] basis-1/3">SNS 계정으로 로그인</p>*/}
                    {/*    <span className="h-[1px] bg-[#767676] block basis-1/4 "></span>*/}
                    {/*</div>*/}

                    {/*<div className="flex justify-center px-[38px] mt-[22px] px-[40px] pb-[40px]">*/}
                        {/*<span className="inline-block mx-[12px]">*/}
                        {/*    <img src={kakao} alt="" className="w-[60px] block mx-auto cursor-pointer"/>*/}
                        {/*</span>*/}
                        {/*<span className="inline-block mx-[12px]" >*/}
                        {/*    <img src={google} alt="" className="w-[60px] block mx-auto cursor-pointer" onClick={btnGoogle}/>*/}
                        {/*</span>*/}

                    {/*</div>*/}

                </div>
            </div>
        </div>
    );
}
export default Login;

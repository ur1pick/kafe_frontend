import {useNavigate} from "react-router-dom";
import logo from '../images/kafe_logo_192.png';
import {Fragment, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

function Signup(){

    let navigate = useNavigate();

    const [username,setUsername]= useState('');
    const [email,setEmail]= useState('');
    const [pw,setPw]= useState('');
    const [pwCheck,setPwCheck]= useState('');
    //let policyCheck= useRef(false);
    const [isPolicyCheck,setIsPolicyCheck] = useState(false);
    const inputUserName=(e)=>{
        setUsername(e.target.value);
    }
    const inputEmail=(e)=>{
        setEmail(e.target.value);
    }
    const inputPw=(e)=>{
        setPw(e.target.value);
    }

    const inputPwCheck=(e)=>{
        setPwCheck(e.target.value);
    }

    const checkPolicy=()=>{
        //policyCheck=!(policyCheck.current.checked);
	setIsPolicyCheck(!isPolicyCheck);
    }

    const btnGoToMain=()=>{
        navigate("/")
    }

    const btnGoToLogin=()=>{
        navigate("/login")
    }

    const btnGoToSignup=()=>{
        navigate("/signup")
    }

    const btnSignup=()=>{
        console.log(`${username},${email},${pw},${pwCheck},${isPolicyCheck}`);
        if(pw!==pwCheck){
            alert('비밀번호를 다시 한번 확인해주세요!');
        }else{
            if (isPolicyCheck===false){
                alert('이용약관에 동의해주세요!');
            }else{
                axios.post(`${window.location.origin}/api/signup`,{
                    email: `${email}`,
                    password: `${pw}`,
                    name: `${username}`
                }).then(function (res){
                    console.log(res.data);
                    alert('입력하신 메일 주소로 인증메일을 전송했습니다. 메일인증을 완료해주세요!')
                    navigate('/')
                }).catch(function (err){
		    console.log(err)	
                    //if(err.response.status===404){
                    //    alert('비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야합니다.')
                    //}else{
                    //    alert('예기치 못한 오류가 발생했습니다..')
                    //}
                });
            }

        }
    }

    const [open, setOpen] = useState(false);

    const handleOpen=()=>{
        setOpen(!open);
    }

    const btnConfirm=()=>{
        setIsPolicyCheck(true);
        setOpen(!open);
    }

    const btnCancel=()=>{
        setIsPolicyCheck(false);
        setOpen(!open);
    }

    return(
        <div className="grid grid-cols-3 h-screen">
            <div className="bg-[#fffff] place-self-center">
                <div className="items-center flex cursor-pointer self-center" onClick={btnGoToMain}>
                    <img className="mr-[30px] h-[100px]  w-auto float-left" src={logo} alt=""/>
                    <strong className="text-[#000000] font-suit font-bold text-[44px]">Kafe</strong>
                </div>
            </div>

            <div className="col-span-2 bg-[#FFEEC3] flex justify-center ">
                <div className="bg-[#ffffff] self-center mx-auto place-items-center items-center basis-[55%]">
                    <div className=" justify-between grid-cols-2 gird flex ">
                        <span className="py-[15px] w-full bg-[#D9D9D9] font-suit font-semibold text-[18px] text-center align-middle cursor-pointer" onClick={btnGoToLogin}>로그인</span>
                        <span className="py-[15px] w-full bg-[#fffff] font-suit font-semibold text-[18px] text-center align-middle cursor-default cursor-pointer" onClick={btnGoToSignup}>회원가입</span>
                    </div>
                    <div className="block p-[40px]">
                        <input type="text" className="w-full inline-block my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium  placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="사용자 이름" onChange={inputUserName}/>
                        <input type="text" className="w-full inline-block my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium  placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="이메일" onChange={inputEmail}/>
                        <input type="password" className="w-full inline-block my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium  placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="비밀번호" onChange={inputPw}/>
                        <input type="password" className="w-full inline-block my-[20px] font-suit font-medium text-[16px] text-[#000000] border-0 border-b-[2px] border-[#CACACA] bg-[#ffffff]/[0]
                    placeholder:font-suit placeholder:font-medium  placeholder:text-[16px]  placeholder:text-[#767676]
                    focus:border-b-[2px] focus:border-[#FEDB82] focus:ring-0" placeholder="비밀번호" onChange={inputPwCheck}/>
                        <div>
                            <input
                                type="checkbox"
                                className="rounded bg-white/0 border-[#CACACA] border-2 focus:border-transparent focus:bg-gray-200 text-[#FEDB82]
                                focus:ring-1 focus:ring-offset-2 focus:ring-[#FEDB82]" onClick={checkPolicy}/>
                            <Fragment>
                                <span className="ml-2 font-suit font-medium text-[16px] text-[#FEDB82] underline cursor-pointer" onClick={handleOpen}>
                                이용약관
                                </span>
                                <Dialog open={open} handler={handleOpen} size={"md"}>
                                    <DialogHeader>이용약관</DialogHeader>
                                    <DialogBody divider className="overflow-y-scroll font-suit font-medium " >
                                                제1조 목적
                                                이 약관은 ur1pick(이)가 운영하는 kafe 이하 "kafe"라 한다.
                                                kafe의 서비스를 이용함에 있어 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

                                                제6조 회원가입
                                                ① 이용자는 "kafe"가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                                                ② "kafe"는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다.
                                                1. 가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조 제3항에 의한 회원자격 상실후 1년이 경과한 자로서 "kafe"의 회원재가입 승낙을 얻은 경우에는 예외로 한다.
                                                2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                                                3. 기타 회원으로 등록하는 것이 "kafe"의 기술상 현저히 지장이 있다고 판단되는 경우
                                                ③ 회원가입계약의 성립시기는 "kafe"의 승낙이 회원에게 도달한 시점으로 합니다.
                                                ④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 방법으로 "kafe"에 대하여 그 변경사항을 알려야 합니다.
                                    </DialogBody>
                                    <DialogFooter>
                                        <Button
                                            variant="text"
                                            color="red"
                                            onClick={btnCancel}
                                            className="mr-1"
                                        >
                                            <span>취소</span>
                                        </Button>
                                        <Button variant="gradient" color="yellow" onClick={btnConfirm}>
                                            <span className="text-[#ffffff]  font-suit font-medium ">확인</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                                <span className=" font-suit font-medium  text-[16px] text-[#6A5440]">에 동의합니다.</span>
                            </Fragment>


                        </div>

                        <p className="my-[20px] py-[8px] rounded-[5px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-bold  text-[20px] text-center align-middle cursor-default cursor-pointer" onClick={btnSignup}>회원가입</p>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default Signup


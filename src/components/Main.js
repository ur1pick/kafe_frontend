import link from '../images/link.png';
import {React, Fragment, useEffect, useState} from "react";
import Footer from "./Footer";
import Feature from "./Feature";
import Header from "./Header";
import More from "./More";
import {Popover,PopoverHandler,PopoverContent, Dialog, DialogBody, DialogFooter, DialogHeader, Tooltip} from "@material-tailwind/react";
import {QRCodeCanvas} from "qrcode.react";
import {useCookies} from "react-cookie";
import axios from "axios";
function Main() {

    const [more,setMore]=useState(false);
    const [result,setResult]=useState(false);
    const [randomUrl,setRandomUrl]=useState("");
    const [original,setOriginal]= useState('');

    const [cookies,setCookies] = useCookies(['id']);
    const [user, setUser] = useState({});

    useEffect(() => {
        //console.log(cookies);
        axios.get(`https://kafe.one/api/user`,{
            headers: {
                Authorization: `${cookies.id}`
            }
        }) // 토큰으로 서버에 인증 요청
            .then((res)=>{
                setUser(res.data.data.user);
                //console.log(res.data.data.user);
            })
            .catch((err) => {
                //console.log(err);
                setCookies('id', undefined);
            }); // 로그인 체크 함수
    },[cookies]);

    const btnMore = () => {
        //console.log(cookies);
        (cookies.id===undefined) || (cookies.id==='undefined') || (cookies===null)
            ?alert('회원만 사용가능합니다!')
            :setMore(!more);
    }

    const inputOriginal=(e)=>{
        setOriginal(e.target.value);
    }
    const btnRandom = () => {
        if(original.length!==0){
            //console.log(cookies.id)
            if((cookies.id==='undefined')||(cookies===null)||(cookies.id===undefined)){
                axios.post(`https://kafe.one/api/shorturl`, {
                    "customURL": false,
                    "hasPassword": false,
                    "isCustomURL": false,
                    "originalUrl": `${original}`,
                }).then(function (res){
                    //console.log(res.data.data.shortUrl);
                    if(res.data.length!==0){
                        setResult(!result);
                        setRandomUrl(`kafe.one/${res.data.data.shortUrl}`);
                    }else{
                        alert('앗! 예기치 못한 오류가 발생했습니다..!다시 시도해주세요!');
                    }
                }).catch(function (err){
                    //console.log(err);
                    alert('원주소의 길이가 너무 길어요..!');
                });
            }else{
                axios.post(`https://kafe.one/api/shorturl`,
                {
                    "customURL": false,
                    "hasPassword": false,
                    "isCustomURL": false,
                    "originalUrl": `${original}`,
                }
                ,
                {
                    headers: {
                        authorization: `${cookies.id}`
                    },
                }
            ).then(function (res){
                //console.log(res.data.data.shortUrl);
                if(res.data.length!==0){
                    setResult(!result);
                    setRandomUrl(`kafe.one/${res.data.data.shortUrl}`);
                }else{
                    alert('앗! 예기치 못한 오류가 발생했습니다..!다시 시도해주세요!');
                }
            }).catch(function (err){
                //console.log(err);
            });
        }
        } else{
            alert('단축할 URL을 입력해주세요!');
        }
    }

    const btnCopy = (url) => {
        //alert(url);
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }

        // 흐름 2.
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.position = "fixed";

        // 흐름 3.
        document.body.appendChild(textarea);
        // focus() -> 사파리 브라우저 서포팅
        textarea.focus();
        // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
        textarea.select();
        // 흐름 4.
        document.execCommand("copy");
        // 흐름 5.
        document.body.removeChild(textarea);
        //alert("클립보드에 복사되었습니다.");
    }

    const [qr, setQr] = useState(false);

    const handleQr=(url)=>{
        setQr(!qr);
        //alert(url);
    }

    const btnSave=(url)=>{
        const canvas = document.getElementById('canvas');
        let img = canvas.toDataURL("image/png");
        let dl = document.getElementById('btnSave');
        dl.setAttribute('href', img);
        dl.setAttribute('download', 'urQr.png');
        setQr(!qr);
    }

    return (
        <div className="min-h-screen flex flex-col w-full h-full">
            {/*Header*/}
            <Header user={user}/>


            <main>
                <div className="mx-auto max-w-full my-6 sm:px-6 lg:px-8">
                    <div className="px-4 my-6 sm:px-0">

                        <div className="mx-[20px]">
                            <div className="cursor-default select-none my-3">
                                <p className="font-suit font-semibold text-[22px] text-center">단축 URL을 커피처럼 빠르게</p>
                                <p className="text-[#81664D] font-suit font-medium text-[20px] text-center">생성부터 분석까지</p>
                            </div>

                            <div className="items-center">

                                <div className="relative">
                                    <div className="absolute w-full bottom-[-10px]">
                                        <input className="font-suit font-medium text-center text-[20px] text-[#000000] border-b-[3px] border-[#CACACA] w-full bg-[#ffffff]/[0] py-[8px]
                          placeholder:text-center placeholder:font-suit placeholder:font-medium  placeholder:text-[20px]  placeholder:text-[#000000]
                          focus:border-b-[3px] focus:border-[#FEDB82] focus:outline-none" placeholder="단축할 긴 주소를 입력하세요" spellCheck={false} onChange={inputOriginal}/>
                                    </div>
                                    <img className="block m-auto select-none" src={link} alt=""/>
                                </div>
                                {result
                                    ?
                                    <div className="flex flex-row justify-center cursor-default mt-[25px] mb-[20px] select-none cursor-pointer">
                                        <div className="flex justify-center">
                                            <div onClick={()=>btnCopy(randomUrl)}>
                                                <Popover>
                                                    <PopoverHandler>
                                                        <div className="flex justify-center cursor-pointer" >
                                                            <span className="group items-center text-[#000000] font-suit font-semibold text-[26px] text-center align-middle  mx-[10px] border-b-[7px] border-[#FEDB82]" >{randomUrl}</span>
                                                            <svg width="30" height="30" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"  className="my-auto">
                                                                <path d="M29.9553 0.966797H5.10843C2.8308 0.966797 0.967285 2.5762 0.967285 4.54324V29.5783H5.10843V4.54324H29.9553V0.966797ZM36.167 8.11968H13.3907C11.1131 8.11968 9.24957 9.72908 9.24957 11.6961V36.7312C9.24957 38.6982 11.1131 40.3076 13.3907 40.3076H36.167C38.4446 40.3076 40.3081 38.6982 40.3081 36.7312V11.6961C40.3081 9.72908 38.4446 8.11968 36.167 8.11968ZM36.167 36.7312H13.3907V11.6961H36.167V36.7312Z" fill="black"/>
                                                            </svg>
                                                        </div>
                                                    </PopoverHandler>
                                                    <PopoverContent>
                                                        Copied!
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <Fragment>
                                                <div className="mx-[10px] flex justify-center cursor-pointer bg-[#FEDB82] rounded-[11px]" onClick={()=>handleQr(randomUrl)}>
                                                    <svg width="30" height="30" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-auto mx-[5px]">
                                                        <path d="M4.91128 2.52968V4.15493H3.28603V2.52968H4.91128ZM5.72391 1.71705H2.4734V4.96756H5.72391V1.71705ZM4.91128 6.86369V8.48894H3.28603V6.86369H4.91128ZM5.72391 6.05106H2.4734V9.30157H5.72391V6.05106ZM9.24529 2.52968V4.15493H7.62004V2.52968H9.24529ZM10.0579 1.71705H6.80741V4.96756H10.0579V1.71705ZM6.80741 6.05106H7.62004V6.86369H6.80741V6.05106ZM7.62004 6.86369H8.43266V7.67631H7.62004V6.86369ZM8.43266 6.05106H9.24529V6.86369H8.43266V6.05106ZM6.80741 7.67631H7.62004V8.48894H6.80741V7.67631ZM7.62004 8.48894H8.43266V9.30157H7.62004V8.48894ZM8.43266 7.67631H9.24529V8.48894H8.43266V7.67631ZM9.24529 6.86369H10.0579V7.67631H9.24529V6.86369ZM9.24529 8.48894H10.0579V9.30157H9.24529V8.48894ZM11.6832 2.80055H10.5997V1.1753H8.97441V0.0917969H11.6832V2.80055ZM11.6832 10.9268V8.21807H10.5997V9.84332H8.97441V10.9268H11.6832ZM0.848145 10.9268H3.5569V9.84332H1.93165V8.21807H0.848145V10.9268ZM0.848145 0.0917969V2.80055H1.93165V1.1753H3.5569V0.0917969H0.848145Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <Dialog open={qr} handler={handleQr} size={"xs"}>
                                                    <DialogHeader>QR</DialogHeader>
                                                    <DialogBody divider className="font-medium justify-center" >
                                                        <QRCodeCanvas id="canvas" value={randomUrl}/>
                                                    </DialogBody>
                                                    <DialogFooter>
                                            <span
                                                className="cursor-pointer mx-[15px] font-suit font-semibold text-[#81664D]" onClick={handleQr}>취소</span>
                                                        <p id="btnSave" className="cursor-pointer bg-[#FEDB82] px-[10px] rounded-[6px] font-suit font-semibold text-[#ffffff]" onClick={()=>btnSave(randomUrl)}>저장</p>
                                                    </DialogFooter>
                                                </Dialog>
                                            </Fragment>
                                        </div>
                                    </div>
                                    :
                                    <Tooltip content="* 줄이기 기능을 이용하시면 입력된 원 URL은 저장됩니다." className="bg-[#CACACA]/[0.16] text-[#A7A7A7] font-suit font-medium py-[3px] text-[12px]">
                                        <div className="flex justify-center cursor-pointer mt-[40px] mb-[20px] select-none">
                                            <p className="w-[103px] py-[5px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-semibold text-[20px] text-center align-middle cursor-default cursor-pointer" onClick={btnRandom}>줄이기 ✂️</p>
                                        </div>
                                    </Tooltip>
                                }



                                {more?
                                    <div className="flex justify-center select-none" >
                            <span className="group flex items-center text-[#593412] font-suit font-bold text-[20px] align-middle cursor-pointer" onClick={btnMore}>
                                더 다양한 옵션
                                <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-none w-[26px] h-[17px] mx-[5px]">
                                    <path d="M22.8782 16.0078L12.9622 6.11338L3.04613 16.0078L3.05176e-05 12.9617L12.9622 -0.000432968L25.9243 12.9617L22.8782 16.0078Z" fill="#593412"/>
                                </svg>
                            </span>
                                    </div>
                                    :
                                    <div className="flex justify-center select-none" >
                            <span className="group flex items-center text-[#593412] font-suit font-bold text-[20px] align-middle cursor-pointer" onClick={btnMore}>
                                더 다양한 옵션
                                <svg viewBox="0 0 26 17" xmlns="http://www.w3.org/2000/svg" className="fill-none w-[26px] h-[17px] mx-[5px]">
                                    <path d="M3.0461 0L12.9621 9.89443L22.8782 0L25.9243 3.0461L12.9621 16.0082L0 3.0461L3.0461 0Z" fill="#593412"/>
                                </svg>
                            </span>
                                    </div>
                                }

                                {more?
                                    <More result={result} setResult={setResult} original={original}/>
                                    :null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/*기능설명 component*/}
            <Feature/>
            {/*하단 component*/}
            <Footer/>
        </div>

    );
}

export default Main;

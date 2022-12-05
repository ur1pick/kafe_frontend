import {Fragment, useState} from "react";
import {
    Popover,
    PopoverHandler,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    PopoverContent,
    Tooltip
} from "@material-tailwind/react";
import {QRCodeSVG} from "qrcode.react";
import axios from "axios";
import {useCookies} from "react-cookie";

function More({result,setResult,original}){
    const [customResult,setCustomResult]=useState(false);
    const [customUrl,setCustomUrl]=useState("");

    const [cookies] = useCookies(['id']);

    const [isCustom,setIsCustom]=useState(false);
    const [activate,setActivate]=useState(false);
    const [isPass,setIsPass]=useState(false);
    const [isDuplicate,setIsDuplicate]=useState(false);

    const [custom,setCustom]=useState('');
    const [start,setStart]=useState(`${new Date().toISOString()}`);
    const [end,setEnd]=useState(`${new Date(new Date().setMonth(new Date().getMonth()+1)).toISOString()}`);
    const [pass,setPass]=useState('');

    const [customqr, setCustomqr] = useState(false);

    const checkCustom = () => {
        setIsCustom(!isCustom);
    }
    const checkActivate = () => {
        setActivate(!activate)
    }
    const checkPass = () => {
        setIsPass(!isPass)
    }

    const handleCustom=(e)=>{
        setCustom(e.target.value);
    }
    const handleStart=(e)=>{
        setStart(new Date(`${e.target.value}`).toISOString());
    }
    const handleEnd=(e)=>{
        setEnd(new Date(`${e.target.value}`).toISOString());
    }
    const handlePass=(e)=>{
        setPass(e.target.value);
    }
    const handleCustomQr=(url)=>{
        setCustomqr(!customqr);
    }


    const btnSearch = () => {
        //console.log(`${original} ${start}~${end} ${pass}`)
        if(custom.length!==0){
            axios.get(`https://kafe.one/api/shorturl/check/${custom}`,{
                headers: {
                    authorization: `${cookies.id}`
                },
            }).then(function (res){
                //console.log(res.data.data);
                if(res.data.data.check) {
                    setIsDuplicate(true);
                    alert('이미 존재하는 단축 URL입니다!')
                    //setCustom(`${custom}`);
                }else{
                    setIsDuplicate(false);
                    alert('사용가능합니다!')
                }
            }).catch(function (err){
                //console.log(err);
            });
        }else{
            alert('원하는 단축 URL을 입력해주세요!');
        }
    }

    const btnCustom = () => {
        if(original.length!==0){
            if(isCustom){
                if(custom.length===0){
                    alert('단축 URL을 입력해주세요!')
                }else{
                    if(isDuplicate){
                        alert('이미 사용중인 단축 URL입니다!');
                    }else{
                        if(activate){
                            if(start.length===0||end.length===0){
                                if (window.confirm('시작일과 만료일을 설정하지 않으시면 단축 URL은 생성일로부터 30일동안 사용가능합니다!')) {
                                    if(isPass){
                                        if(pass.length===0){
                                            alert('비밀번호를 입력해주세요!');
                                        }else{
                                            axios.post(`https://kafe.one/api/shorturl`,
                                                {
                                                    "originalUrl": `${original}`,
                                                    "isCustomURL": isCustom,
                                                    "shortUrl": `${custom}`,
                                                    "startDate": `${start}`,
                                                    "endDate": `${end}`,
                                                    "hasPassword": isPass,
                                                    "password": `${pass}`,
                                                },
                                                {
                                                    headers: {
                                                        authorization: `${cookies.id}`
                                                    },
                                                }).then(function (res) {
                                                //console.log(res.data);
                                                //console.log(new Date(new Date().setMonth(new Date().getMonth()+1)).toISOString())
                                                setResult("");
                                                setCustomResult(!customResult);
                                                setCustomUrl(`https://kafe.one/${res.data.data.shortUrl}`);
                                            }).catch(function (err) {
                                                //console.log(err);
                                            });
                                        }
                                    }else{
                                        axios.post(`https://kafe.one/api/shorturl`,
                                            {
                                                "originalUrl": `${original}`,
                                                "isCustomURL": isCustom,
                                                "shortUrl": `${custom}`,
                                                "startDate": `${start}`,
                                                "endDate": `${end}`,
                                            },
                                            {
                                                headers: {
                                                    authorization: `${cookies.id}`
                                                },
                                            }).then(function (res) {
                                            //console.log(res.data);
                                            setResult("");
                                            setCustomResult(!customResult);
                                            setCustomUrl(`https://kafe.one/${res.data.data.shortUrl}`);
                                        }).catch(function (err) {
                                            //console.log(err);
                                        });
                                    }
                                }
                            }else{
                                if(isPass){
                                    if(pass.length===0){
                                        alert('비밀번호를 입력해주세요!');
                                    }else{
                                        axios.post(`https://kafe.one/api/shorturl`,
                                            {
                                                "originalUrl": `${original}`,
                                                "isCustomURL": isCustom,
                                                "shortUrl": `${custom}`,
                                                "startDate": `${start}`,
                                                "endDate": `${end}`,
                                                "hasPassword": isPass,
                                                "password": `${pass}`,
                                            },
                                            {
                                                headers: {
                                                    authorization: `${cookies.id}`
                                                },
                                            }).then(function (res) {
                                            //console.log(res.data);
                                            setResult("");
                                            setCustomResult(!customResult);
                                            setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                                        }).catch(function (err) {
                                            //console.log(err);
                                        });
                                    }
                                }else{
                                    axios.post(`https://kafe.one/api/shorturl`,
                                        {
                                            "originalUrl": `${original}`,
                                            "isCustomURL": isCustom,
                                            "shortUrl": `${custom}`,
                                            "startDate": `${start}`,
                                            "endDate": `${end}`,
                                        },
                                        {
                                            headers: {
                                                authorization: `${cookies.id}`
                                            },
                                        }).then(function (res) {
                                        //console.log(res.data);
                                        setResult("");
                                        setCustomResult(!customResult);
                                        setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                                    }).catch(function (err) {
                                        //console.log(err);
                                    });
                                }
                            }
                        }else{
                            if(isPass){
                                if(pass.length===0){
                                    alert('비밀번호를 입력해주세요!');
                                }else {
                                    axios.post(`https://kafe.one/api/shorturl`,
                                        {
                                            "originalUrl": `${original}`,
                                            "isCustomURL": isCustom,
                                            "shortUrl": `${custom}`,
                                            "hasPassword": isPass,
                                            "password": `${pass}`,
                                        },
                                        {
                                            headers: {
                                                authorization: `${cookies.id}`
                                            },
                                        }).then(function (res) {
                                        //console.log(res.data);
                                        setResult("");
                                        setCustomResult(!customResult);
                                        setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                                    }).catch(function (err) {
                                        //console.log(err);
                                    });
                                }
                            }else{
                                axios.post(`https://kafe.one/api/shorturl`,
                                    {
                                        "originalUrl": `${original}`,
                                        "isCustomURL": isCustom,
                                        "shortUrl": `${custom}`
                                    },
                                    {
                                        headers: {
                                            authorization: `${cookies.id}`
                                        },
                                    }).then(function (res) {
                                        //console.log(res.data);
                                        setResult("");
                                        setCustomResult(!customResult);
                                        setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                                    }).catch(function (err) {
                                        //console.log(err);
                                    });
                            }
                        }
                    }
                }
            }else{
                if(activate){
                    if(isPass){
                        if(pass.length===0){
                            alert('비밀번호를 입력해주세요!');
                        }else {

                            axios.post(`https://kafe.one/api/shorturl`,
                                {
                                    "originalUrl": `${original}`,
                                    "startDate": `${start}`,
                                    "endDate": `${end}`,
                                    "hasPassword": isPass,
                                    "password": `${pass}`,
                                },
                                {
                                    headers: {
                                        authorization: `${cookies.id}`
                                    },
                                }).then(function (res) {
                                //console.log(res.data);
                                setResult("");
                                setCustomResult(!customResult);
                                setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                            }).catch(function (err) {
                                //console.log(err);
                            });
                        }
                    }else{
                        axios.post(`https://kafe.one/api/shorturl`,
                            {
                                "originalUrl": `${original}`,
                                "startDate": `${start}`,
                                "endDate": `${end}`
                            },
                            {
                                headers: {
                                    authorization: `${cookies.id}`
                                },
                            }).then(function (res) {
                                //console.log(res.data);
                                setResult("");
                                setCustomResult(!customResult);
                                setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                            }).catch(function (err) {
                                //console.log(err);
                            });
                    }
                }else{
                    if(isPass){
                        if(pass.length===0){
                            alert('비밀번호를 입력해주세요!');
                        }else {
                            axios.post(`https://kafe.one/api/shorturl`,
                                {
                                    "originalUrl": `${original}`,
                                    "hasPassword": isPass,
                                    "password": `${pass}`,
                                },
                                {
                                    headers: {
                                        authorization: `${cookies.id}`
                                    },
                                }).then(function (res) {
                                    //console.log(res.data);
                                    setResult("");
                                    setCustomResult(!customResult);
                                    setCustomUrl(`kafe.one/${res.data.data.shortUrl}`);
                                }).catch(function (err) {
                                    //console.log(err);
                                });
                        }
                    }else{
                        alert('사용자 지정 옵션을 선택하지 않으셨어요!')
                    }
                }
            }
        } else{
            alert('단축할 긴URL을 입력해주세요!');
        }
    }

    const btnCustomSave=(url)=>{
        const canvas = document.getElementById('canvas');
        let img = canvas.toDataURL("image/png");
        let dl = document.getElementById('btnCustomSave');
        dl.setAttribute('href', img);
        dl.setAttribute('download', 'urQr.png');
        setCustomqr(!customqr);
    }

    return(
        <div className="m-[10px] justify-center flex flex-col gap-[14px] border-2 border-[#CACACA] p-[20px] w-fit mx-auto rounded-[12px]">

            <p className="text-[21px] text-black font-suit font-bold place-self-center text-center">나만의 URL</p>
            <div className="grid grid-cols-3 gap-[20px] mx-auto place-self-center">

                <div className="text-center place-self-center">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="rounded bg-white/0 border-[#767676] border-[2px]
                                  focus:border-[#767676] focus:bg-white/0 text-[#FEDB82]
                                  focus:ring-1 focus:ring-offset-2 focus:ring-[#FEDB82]/[0.5]"
                               onClick={checkCustom}/>
                        <span className="ml-2 font-suit font-medium text-[19px] ">사용자 지정</span>
                    </label>
                </div>
                <div className="text-center place-self-center">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="rounded bg-white/0 border-[#767676] border-[2px]
                                  focus:border-[#767676] focus:bg-white/0 text-[#FEDB82]
                                  focus:ring-1 focus:ring-offset-2 focus:ring-[#FEDB82]/[0.5]"
                               onClick={checkActivate}/>
                        <span className="ml-2 font-suit font-medium text-[19px]">유효 기간</span>
                    </label>
                </div>
                <div className="text-center place-self-center align-middle">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="rounded bg-white/0 border-[#767676] border-[2px]
                                  focus:border-[#767676] focus:bg-white/0 text-[#FEDB82]
                                  focus:ring-1 focus:ring-offset-2 focus:ring-[#FEDB82]/[0.5]"
                               onClick={checkPass}/>
                        <span className="ml-2 font-suit font-medium text-[19px]">비밀번호</span>
                    </label>
                </div>
            </div>


            {
                isCustom&&
                <div className="mx-auto place-self-center">
                    <label className="text-[#000000] font-suit font-medium text-[20px] text-center">kafe.one/</label>
                    <input type="text" className="text-[#000000] font-suit font-medium text-[20px] mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0 " onChange={handleCustom}/>
                    <span className="py-[5px] px-[10px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-semibold text-[19px] text-center cursor-pointer" onClick={btnSearch}>조회 🔍</span>
                </div>
            }
            {
                activate&&
                <div className="grid grid-cols-2 gap-[20px] mx-auto place-self-center">
                    <div className="text-center place-self-center">
                        <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]">시작일 :</label>
                        <input
                            id="start"
                            type="date"
                            className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0  font-suit font-medium  text-[16px]" onChange={handleStart} value={start.split('T')[0]}/>
                    </div>
                    <div className="text-center place-self-center">
                        <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]">만료일 :</label>
                        <input
                            id="end"
                            type="date"
                            className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0 font-suit font-medium text-[16px]" onChange={handleEnd} value={end.split('T')[0]}/>
                    </div>
                </div>

            }

            {
                isPass&&
                <div className="mx-auto place-self-center ">
                    <label className="font-suit font-bold text-[18px] text-center mx-[10px]">🔑</label>
                    <input type="password" className="font-suit font-medium text-[18px] text-center mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0" placeholder="비밀번호" onChange={handlePass}/>
                </div>
            }
            
            {customResult
                ?

                <div className="flex justify-center">
                    <div onClick={()=>navigator.clipboard.writeText(`${customUrl}`)}>
                        <Popover>
                            <PopoverHandler>
                                <div className="flex flex-row justify-center cursor-pointer" >
                                    <p className=" items-center text-[#000000] font-suit font-semibold text-[26px] text-center align-middle  mx-[10px] border-b-[7px] border-[#FEDB82] truncate w-[300px] md:w-fit sm:truncate sm:w-[300px]">{customUrl}</p>
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
                        <div className="mx-[10px] flex justify-center cursor-pointer bg-[#FEDB82] rounded-[11px]" onClick={()=>handleCustomQr(customUrl)}>
                            <svg width="30" height="30" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-auto mx-[5px]">
                                <path d="M4.91128 2.52968V4.15493H3.28603V2.52968H4.91128ZM5.72391 1.71705H2.4734V4.96756H5.72391V1.71705ZM4.91128 6.86369V8.48894H3.28603V6.86369H4.91128ZM5.72391 6.05106H2.4734V9.30157H5.72391V6.05106ZM9.24529 2.52968V4.15493H7.62004V2.52968H9.24529ZM10.0579 1.71705H6.80741V4.96756H10.0579V1.71705ZM6.80741 6.05106H7.62004V6.86369H6.80741V6.05106ZM7.62004 6.86369H8.43266V7.67631H7.62004V6.86369ZM8.43266 6.05106H9.24529V6.86369H8.43266V6.05106ZM6.80741 7.67631H7.62004V8.48894H6.80741V7.67631ZM7.62004 8.48894H8.43266V9.30157H7.62004V8.48894ZM8.43266 7.67631H9.24529V8.48894H8.43266V7.67631ZM9.24529 6.86369H10.0579V7.67631H9.24529V6.86369ZM9.24529 8.48894H10.0579V9.30157H9.24529V8.48894ZM11.6832 2.80055H10.5997V1.1753H8.97441V0.0917969H11.6832V2.80055ZM11.6832 10.9268V8.21807H10.5997V9.84332H8.97441V10.9268H11.6832ZM0.848145 10.9268H3.5569V9.84332H1.93165V8.21807H0.848145V10.9268ZM0.848145 0.0917969V2.80055H1.93165V1.1753H3.5569V0.0917969H0.848145Z" fill="black"/>
                            </svg>
                        </div>
                        <Dialog open={customqr} handler={handleCustomQr} size={"xs"}>
                            <DialogHeader>QR</DialogHeader>
                            <DialogBody divider className="font-suit font-medium justify-center" >
                                <QRCodeSVG value={customUrl} />
                            </DialogBody>
                            <DialogFooter>
                                <span
                                    onClick={handleCustomQr}
                                    className="cursor-pointer mx-[15px] font-suit font-semibold text-[#81664D]">
                                    취소
                                </span>
                                <p id="btnCustomSave" className="cursor-pointer bg-[#FEDB82] px-[10px] rounded-[6px] font-suit font-medium text-[#ffffff]" onClick={()=>btnCustomSave(customUrl)}>
                                    저장
                                </p>
                            </DialogFooter>
                        </Dialog>
                    </Fragment>
                </div>
                :

                <Tooltip content="* 줄이기 기능을 이용하시면 입력된 원 URL은 저장됩니다." className="bg-[#CACACA]/[0.16] text-[#A7A7A7] font-suit font-medium py-[3px] text-[12px]">
                    <div className="flex justify-center cursor-pointer select-none">
                        <p className="w-[103px] py-[5px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-semibold text-[20px] text-center align-middle cursor-default cursor-pointer" onClick={btnCustom}>줄이기 ✂️</p>
                    </div>
                </Tooltip>
            }

        </div>
    );
}
export default More;

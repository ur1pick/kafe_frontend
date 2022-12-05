import Header from "./Header";
import Footer from "./Footer";
import GeoGraph from "./GeoGraph";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";

import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import {React, Fragment, useState} from "react";

import {Tooltip} from "@material-tailwind/react";
import {Modal} from "flowbite-react";

function Stat() {

    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user;
    const stat = location.state.stat;
    const urlInfo = location.state.urlInfo;
    const [cookies] = useCookies(['id']);


    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState('');
    const [end,setEnd]=useState('');
    const [start,setStart]=useState('');
    const [pass,setPass]=useState('');
    const [editItem,setEditItem]=useState({});

    //console.log(stat);

    let browser = Object.keys(stat.useragent);
    let browserData = Object.values(stat.useragent);
    let device = Object.keys(stat.device);
    let deviceData = Object.values(stat.device);
    let sns = Object.keys(stat.sns);
    let snsData = Object.values(stat.sns);

    //const [active,setActive] = useState(urlInfo.isActive)
    const handleActivate = () => {
        axios.put(`https://kafe.one/api/shorturl/${urlInfo.seq}/active`,
            {
                "active": `${document.getElementById('active').checked}`,
            },
            {
                headers: {
                    authorization: `${cookies.id}`
                },
            }).then((res1)=>{
                //console.log(res1);
                axios.get(`https://kafe.one/api/shorturl/${urlInfo.seq}`,
                    {
                        headers: {
                            authorization: `${cookies.id}`
                        },
                    }).then(function (res2){
                        //console.log(res2.data.data.shortUrl)
                    axios.get(`https://kafe.one/api/statistics/${urlInfo.seq}`,
                        {
                            headers: {
                                authorization: `${cookies.id}`
                            },
                        }).then(function (res3){
                            //console.log(res3.data.data.statistics);
                            navigate('/stat', {
                                state: {
                                    user:user,
                                    stat: res3.data.data.statistics,
                                    urlInfo: res2.data.data.shortUrl
                                }
                            });
                            //window.location.replace("/stat")
                            //setActive(location.urlInfo.isActive)
                        }).catch(function (err){
                            //console.log(err);
                        });
                    }).catch(function (err){
                        //console.log(err);
                    });
            }).catch((err)=>{
                //console.log(err);
            })
    }


    const browserPie = {
        labels: browser,
        datasets: [
            {
                label: 'Browser',
                data: browserData,
                backgroundColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                    '#8CC6E7',
                    "#CC9BCD",
                ],
                borderColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                    '#8CC6E7',
                    "#CC9BCD",
                ],
                borderWidth: 1,
            },
        ],
    };

    const devicePie = {
        labels: device,
        datasets: [
            {
                label: 'Device',
                data: deviceData,
                backgroundColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                ],
                borderColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                ],
                borderWidth: 1,
            },
        ],
    };

    const snsPie = {
        labels: sns,
        datasets: [
            {
                label: 'SNS',
                data: snsData,
                backgroundColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                ],
                borderColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                ],
                borderWidth: 1,
            },
        ],
    };




    const nullPie = {
        labels: ['NoData'],
        datasets: [
            {
                label: 'NoData',
                data: [1],
                backgroundColor: [
                    '#CACACA',
                ],
                borderColor: [
                    '#CACACA',

                ],
                borderWidth: 1,
            },
        ],
    };


    const btnDelete=(urlInfo)=>{
        if (window.confirm(`kafe.one/${urlInfo.shortUrl} \n 해당 단축 URL을 삭제하시겠습니까?`)) {
            axios.delete(`https://kafe.one/api/shorturl/${urlInfo.seq}`,
                {
                    headers: {
                        authorization: `${cookies.id}`
                    },
                }).then((res)=>{
                //console.log(res.data);
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
            }).catch((err)=>{
                //console.log(err);
            })
        }else{
            window.location.replace("/stat")
        }
    }

    const handleOpen=(item)=>{
        setOpen(!open);
        //console.log(item)
        axios.get(`https://kafe.one/api/shorturl/${item.seq}`,
            {
                headers: {
                    authorization: `${cookies.id}`
                },
            }
        ).then(function (res){
            //console.log(res.data.data.shortUrl)
            setEditItem(res.data.data.shortUrl)
            //console.log(editItem)
            setStart(res.data.data.shortUrl.startDate)
            setEnd(res.data.data.shortUrl.endDate)
        }).catch(function (err){
            //console.log(err);
        });
    }
    const handleOrigin=(e)=>{
        setOrigin(e.target.value);
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

    const btnEdit = (edit) => {
        // console.log(edit)
        //
        // console.log(origin)
        // console.log(start)
        // console.log(end)
        // console.log(pass)

        if ((origin.length===0)||(origin===null)||(origin.match(/\s/g))) {
            if ((pass.length===0)||(pass===null)||(pass.match(/\s/g))){
                axios.put(`https://kafe.one/api/shorturl/${edit.seq}`,
                    {
                        "endDate": end,
                        "hasPassword": false,
                        "originalUrl": `${edit.originalUrl}`,
                        "seq": edit.seq,
                        "startDate": start
                    },
                    {
                        headers: {
                            authorization: `${cookies.id}`
                        },
                    }).then((res1)=>{
                        //console.log(res1);
                    axios.get(`https://kafe.one/api/shorturl/${edit.seq}`,
                        {
                            headers: {
                                authorization: `${cookies.id}`
                            },
                        }
                    ).then(function (res){
                        axios.get(`https://kafe.one/api/statistics/${edit.seq}`,
                            {
                                headers: {
                                    authorization: `${cookies.id}`
                                },
                            }
                        ).then(function (resp){
                            //console.log(resp.data.data.statistics);

                            navigate('/stat', {
                                state: {
                                    user:user,
                                    stat: resp.data.data.statistics,
                                    urlInfo: res.data.data.shortUrl
                                }
                            });
                            setOpen(!open)
                        }).catch(function (err){
                            //console.log(err);
                        });
                    }).catch(function (err){
                        //console.log(err);
                    });
                }).catch(function (err){
                    //console.log(err);
                });
            }else{
                axios.put(`https://kafe.one/api/shorturl/${edit.seq}`,
                    {
                        "endDate": end,
                        "hasPassword": true,
                        "originalUrl": `${edit.originalUrl}`,
                        "password": pass,
                        "seq": edit.seq,
                        "startDate": start
                    },
                    {
                        headers: {
                            authorization: `${cookies.id}`
                        },
                    }).then((res1)=>{
                    //console.log(res1);
                    axios.get(`https://kafe.one/api/shorturl/${edit.seq}`,
                        {
                            headers: {
                                authorization: `${cookies.id}`
                            },
                        }
                    ).then(function (res){
                        axios.get(`https://kafe.one/api/statistics/${edit.seq}`,
                            {
                                headers: {
                                    authorization: `${cookies.id}`
                                },
                            }
                        ).then(function (resp){
                           // console.log(resp.data.data.statistics);
                            navigate('/stat', {
                                state: {
                                    user:user,
                                    stat: resp.data.data.statistics,
                                    urlInfo: res.data.data.shortUrl
                                }
                            });
                            setOpen(!open)
                        }).catch(function (err){
                           // console.log(err);
                        });
                    }).catch(function (err){
                       // console.log(err);
                    });
                }).catch(function (err){
                   // console.log(err);
                });
            }
        }else{
            if ((pass.length===0)||(pass===null)||(pass.match(/\s/g))){
                axios.put(`https://kafe.one/api/shorturl/${edit.seq}`,
                    {
                        "endDate": end,
                        "hasPassword": false,
                        "originalUrl": origin,
                        "seq": edit.seq,
                        "startDate": start
                    },
                    {
                        headers: {
                            authorization: `${cookies.id}`
                        },
                    }).then((res1)=>{
                    //console.log(res1);
                    axios.get(`https://kafe.one/api/shorturl/${edit.seq}`,
                        {
                            headers: {
                                authorization: `${cookies.id}`
                            },
                        }
                    ).then(function (res){
                        axios.get(`https://kafe.one/api/statistics/${edit.seq}`,
                            {
                                headers: {
                                    authorization: `${cookies.id}`
                                },
                            }
                        ).then(function (resp){
                            //console.log(resp.data.data.statistics);
                            navigate('/stat', {
                                state: {
                                    user:user,
                                    stat: resp.data.data.statistics,
                                    urlInfo: res.data.data.shortUrl
                                }
                            });
                            setOpen(!open)
                        }).catch(function (err){
                            //console.log(err);
                        });
                    }).catch(function (err){
                       // console.log(err);
                    });
                }).catch(function (err){
                   // console.log(err);
                });
            }else{
                axios.put(`https://kafe.one/api/shorturl/${edit.seq}`,
                    {
                        "endDate": end,
                        "hasPassword": true,
                        "originalUrl": origin,
                        "password": pass,
                        "seq": edit.seq,
                        "startDate": start
                    },
                    {
                        headers: {
                            authorization: `${cookies.id}`
                        },
                    }).then((res1)=>{
                    //console.log(res1);
                    axios.get(`https://kafe.one/api/shorturl/${edit.seq}`,
                        {
                            headers: {
                                authorization: `${cookies.id}`
                            },
                        }
                    ).then(function (res){
                        axios.get(`https://kafe.one/api/statistics/${edit.seq}`,
                            {
                                headers: {
                                    authorization: `${cookies.id}`
                                },
                            }
                        ).then(function (resp){
                            //console.log(resp.data.data.statistics);
                            navigate('/stat', {
                                state: {
                                    user:user,
                                    stat: resp.data.data.statistics,
                                    urlInfo: res.data.data.shortUrl
                                }
                            });

                            setOpen(!open)
                        }).catch(function (err){
                            //console.log(err);
                        });
                    }).catch(function (err){
                        //console.log(err);
                    });
                }).catch(function (err){
                   // console.log(err);
                });
            }
        }
    }



    return (
        <div className="min-h-screen flex flex-col w-full h-full">
            <Header user={user}/>

            <div>
                {urlInfo.isCustomUrl===false
                    ?
                    <div className="p-6 flex flex-row ">
                        <span className="align-middle text-center bg-[#FEDB82] rounded-[20px] px-[10px] py-[3px] font-suit font-bold text-[18px]">random</span>
                        {
                            urlInfo.hasPassword
                                ?<span className="align-middle px-[15px] font-suit font-semibold text-[22px]">🔒 kafe.one/{urlInfo.shortUrl}</span>
                                :<span className="align-middle px-[15px] font-suit font-semibold text-[22px]">kafe.one/{urlInfo.shortUrl}</span>
                        }

                        {/*<p className="align-middle px-[10px] font-suit font-semibold text-[24px]" >✏️</p>*/}
                        <Fragment >
                            <p className="align-middle px-[10px] font-suit font-semibold text-[24px] cursor-pointer" onClick={()=>handleOpen(urlInfo)}>✏️</p>
                            <Modal show={open} size="2xl" popup={true} onClose={handleOpen} item={urlInfo}>
                                <Modal.Header/>
                                <Modal.Body >
                                    <div className="px-6 sm:px-6 lg:px-8 xl:px-8 grid grid-cols-5 grid-rows-6 gap-3">
                                        <p className="col-span-5 text-[22px] text-black font-suit font-bold place-self-center text-center">수정 📝</p>

                                        <div className="col-span-5 grid grid-cols-5 items-center">
                                            <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]" >원주소</label>
                                            <input type="text" className="col-span-4 font-suit font-medium text-[18px] mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0" placeholder={urlInfo.originalUrl}  onChange={handleOrigin}/>
                                        </div>
                                        <div className="col-span-5 grid grid-cols-2 gap-[20px] mx-auto place-self-center">
                                            <div className="text-center place-self-center">
                                                <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]" >시작일 :</label>
                                                <input
                                                    id="originStart" type="date"
                                                    className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0  font-suit font-medium  text-[16px]" onChange={handleStart} value={start.split('T')[0]}/>
                                            </div>
                                            <div className="text-center place-self-center">
                                                <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]">만료일 :</label>
                                                <input
                                                    id="originEnd" type="date"
                                                    className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0 font-suit font-medium text-[16px]" onChange={handleEnd} value={end.split('T')[0]}/>
                                            </div>
                                        </div>
                                        <div className="col-span-5 text-center place-self-center align-middle">
                                            <label className="font-suit font-bold text-[18px] text-center">🔑</label>
                                            <input type="password" className="font-suit font-medium text-[18px] text-center mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0" placeholder="비밀번호" onChange={handlePass}/>
                                        </div>

                                        <Tooltip content="* 입력된 원 URL은 저장됩니다." className="bg-[#CACACA]/[0.16] text-[#A7A7A7] font-suit font-medium py-[3px] text-[12px] text-center place-self-center">
                                            <div className="col-span-5 place-self-center cursor-pointer select-none">
                                                <p className="w-[103px] py-[5px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-semibold text-[20px] text-center align-middle cursor-default cursor-pointer" onClick={()=>btnEdit(editItem)}>수정하기️</p>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Fragment>

                        <p className="align-middle px-[10px] font-suit font-semibold text-[24px] cursor-pointer" onClick={()=>btnDelete(urlInfo)}>🗑️</p>
                    </div>
                    :
                    <div className="p-6 flex flex-row ">
                        <span className="align-middle text-center bg-[#95D094] rounded-[15px] px-[10px] py-[5px] font-suit font-bold text-[20px]">custom</span>
                        {
                            urlInfo.hasPassword
                                ?<span className="align-middle px-[15px] font-suit font-semibold text-[22px]">🔒 kafe.one/{urlInfo.shortUrl}</span>
                                :<span className="align-middle px-[15px] font-suit font-semibold text-[22px]">kafe.one/{urlInfo.shortUrl}</span>
                        }
                        <p className="align-middle px-[10px] font-suit font-semibold text-[24px]" >✏️</p>
                        <p className="align-middle px-[10px] font-suit font-semibold text-[24px] cursor-pointer" onClick={()=>btnDelete(urlInfo)}>🗑️</p>
                    </div>
                }
                <div className="grid grid-rows-2 grid-cols-3 ">
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className=" font-['SUIT-Bold'] text-[18px] text-center">생성일</span>
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">{new Date(urlInfo.registerDate).toLocaleDateString()}</span>
                    </div>
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">최종 접속일</span>
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">{new Date(urlInfo.lastAccess).toLocaleDateString()}</span>
                    </div>
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">조회수</span>
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">{urlInfo.accessCount}</span>
                    </div>
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">시작일</span>
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">{new Date(urlInfo.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">만료일</span>
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">{new Date(urlInfo.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 grid place-content-center items-center">
                        <span className="font-['SUIT-Bold'] text-[18px] text-center">활성화</span>
                        <div className="w-fit flex flex-col place-self-center">
                            <label className=" relative items-center cursor-pointer">
                                <input id="active" type="checkbox" className="sr-only peer" onChange={handleActivate} checked={urlInfo.isActive}/>
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FEDB82] dark:peer-focus:ring-[#FEDB82] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#FEDB82]"></div>
                                {/*<span className="text-[10px] text-center font-medium text-gray-900 dark:text-gray-300">사용 가능!</span>*/}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

                <div className="flex flex-col mx-10">
                    <GeoGraph pos={stat.coordinates}/>
                    <div className="grid grid-cols-3 gap-12 mb-6">
                        <div>
                            {
                                browserData.length===0
                                    ? <PieGraph data={nullPie}/>
                                    :<PieGraph data={browserPie}/>
                            }
                        </div>
                        <div>
                            {
                                deviceData.length===0
                                    ? <PieGraph data={nullPie}/>
                                    :<PieGraph data={devicePie}/>
                            }
                        </div>
                        <div>
                            {
                                snsData.length===0
                                    ? <PieGraph data={nullPie}/>
                                    :<PieGraph data={snsPie}/>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[10px] my-6">
                        <div>
                            <LineGraph timestamp={stat.timestamp}/>
                        </div>
                        <div>
                            <BarGraph timestamp={stat.timestamp}/>
                        </div>
                    </div>

                </div>

            <Footer/>
        </div>

    );
}
export default Stat;
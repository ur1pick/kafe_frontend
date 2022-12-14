import Footer from "./Footer";
import Header from "./Header";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import {React, Fragment, useState} from "react";
import {Tooltip} from "@material-tailwind/react";
import {Modal} from "flowbite-react";

function List() {

    const location = useLocation();
    const user = location.state.user;
    const urlList = location.state.list;

    const [cookies] = useCookies(['id']);
    const USER_NAME = user.name;

    function sumCnt(category) {
        if (Array.isArray(category)) {
            return category.reduce((prev, current) => prev + current.accessCount, 0);
        } else {
            let sum = 0;
            for (const subCategory of Object.values(category)) {
                sum += sumCnt(subCategory);
            }
            return sum;
        }
    }

    let totalCount = sumCnt(urlList);
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState('');
    const [end,setEnd]=useState('');
    const [start,setStart]=useState('');
    const [pass,setPass]=useState('');
    const [editItem,setEditItem]=useState({});

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
                        axios.get(`https://kafe.one/api/shorturl`,
                        {
                            headers: {
                                authorization: `${cookies.id}`

                            },
                        }).then(function (res){
                        //console.log(res.data.data.shortUrlList);
                        setOpen(!open)
                        navigate('/list', {
                            state: {
                                user: user,
                                list: res.data.data.shortUrlList
                            }
                        });
                        setOpen(!open)
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
                    axios.get(`https://kafe.one/api/shorturl`,
                        {
                            headers: {
                                authorization: `${cookies.id}`

                            },
                        }).then(function (res){

                        navigate('/list', {
                            state: {
                                user: user,
                                list: res.data.data.shortUrlList
                            }
                        });
                        setOpen(!open)
                    }).catch(function (err){
                        //console.log(err);
                    });
                }).catch(function (err){
                    //console.log(err);
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
                    axios.get(`https://kafe.one/api/shorturl`,
                        {
                            headers: {
                                authorization: `${cookies.id}`

                            },
                        }).then(function (res){
                        //console.log(res.data.data.shortUrlList);
                        setOpen(!open)
                        navigate('/list', {
                            state: {
                                user: user,
                                list: res.data.data.shortUrlList
                            }
                        });
                        setOpen(!open)
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
                    axios.get(`https://kafe.one/api/shorturl`,
                        {
                            headers: {
                                authorization: `${cookies.id}`

                            },
                        }).then(function (res){

                        navigate('/list', {
                            state: {
                                user: user,
                                list: res.data.data.shortUrlList
                            }
                        });
                        setOpen(!open)
                    }).catch(function (err){
                        //console.log(err);
                    });
                }).catch(function (err){
                    //console.log(err);
                });
            }
        }
    }

    const handleActivate = (seq) => {
        axios.put(`https://kafe.one/api/shorturl/${seq}/active`,
            {
                "active": `${document.getElementById('active').checked}`,
            },
            {
                headers: {
                    authorization: `${cookies.id}`
                },
            }).then((res1)=>{
            //console.log(res1);
            axios.get(`https://kafe.one/api/shorturl`,
                {
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
        }).catch(function (err){
            //console.log(err);
        });
    }

    const btnList=(seq)=>{

        axios.get(`https://kafe.one/api/shorturl/${seq}`,
            {
                headers: {
                    authorization: `${cookies.id}`
                },
            }
        ).then(function (res){
            axios.get(`https://kafe.one/api/statistics/${seq}`,
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
            }).catch(function (err){
                //console.log(err);
            });
        }).catch(function (err){
            //console.log(err);
        });
    }

    const btnDelete=(item)=>{
        if (window.confirm(`https://kafe.one/${item.shortUrl} \n ?????? ?????? URL??? ?????????????????????????`)) {
            axios.delete(`https://kafe.one/api/shorturl/${item.seq}`,
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
            window.location.replace("/list")
        }
    };

    return (
        // <div className="flex-col flex">
        <div className="min-h-screen flex flex-col w-full h-full">
            {/*Header*/}
            <Header user={user}/>

            <div className="flex-1">
                <div className="mx-7">
                    <p className="text-[#000000] font-suit font-bold text-[22px] m-6">{`${USER_NAME}`}??? ?????? URL</p>
                    <div className="min-h-max px-3 sm:px-6">
                        <div className="overflow-x-scroll sm:overflow-auto">
                            <table className="min-w-full">
                                <thead className="border-b ">
                                <tr className="">
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ??????
                                    </th>
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ?????? URL
                                    </th>
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ?????????
                                    </th>
                                    <th scope="col"
                                        className=" font-suit font-semibold text-[18px] py-2 text-center">
                                        ?????????
                                    </th>
                                    <th scope="col"
                                        className=" font-suit font-semibold text-[18px] py-2 text-center">
                                        ?????? ?????????
                                    </th>
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ?????????
                                    </th>
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ??????
                                    </th>
                                    <th scope="col"
                                        className="font-suit font-semibold text-[18px] py-2 text-center">
                                        ??????
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {urlList.map((item)=>(
                                    <tr  className="cursor-pointer" >
                                        <td className="px-2 py-3 text-center" >
                                            {
                                                item.isCustomUrl
                                                    ?<span className="bg-[#95D094] rounded-[15px] px-3 py-[5px] font-suit font-medium text-[17px]">custom</span>
                                                    :<span className="bg-[#FEDB82] rounded-[15px] px-3 py-[5px] font-suit font-medium text-[17px]">random</span>
                                            }
                                        </td>
                                        <td className="flex flex-row justify-center px-2 py-3 text-center" onClick={()=>btnList(item.seq)}>
                                            {
                                                item.hasPassword
                                                    ?
                                                    <span className="flex flex-shrink-0 font-suit font-medium text-[17px] px-4 py-2 self-center">
                                                        ???? kafe.one/{item.shortUrl}
                                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-[10px]">
                                                            <rect y="7" width="5" height="16" fill="#FBBC05"/>
                                                            <rect x="9" width="5" height="23" fill="#D9D9D9"/>
                                                            <rect x="9" width="5" height="23" fill="#9FA9FF"/>
                                                            <rect x="18" y="13" width="5" height="10" fill="#FFAF82"/>
                                                        </svg>
                                                    </span>
                                                    :
                                                    <span className="flex flex-shrink-0 font-suit font-medium text-[17px] px-4 py-2 self-center">
                                                        kafe.one/{item.shortUrl}
                                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-[10px]">
                                                            <rect y="7" width="5" height="16" fill="#FBBC05"/>
                                                            <rect x="9" width="5" height="23" fill="#D9D9D9"/>
                                                            <rect x="9" width="5" height="23" fill="#9FA9FF"/>
                                                            <rect x="18" y="13" width="5" height="10" fill="#FFAF82"/>
                                                        </svg>
                                                    </span>
                                            }
                                    </td>
                                    <td className="font-suit font-medium text-[17px] px-6 py-3 text-center" >
                                        <div className="w-fit flex flex-col place-self-center">
                                            <label className=" relative items-center cursor-pointer">
                                                <input id="active" type="checkbox" className="sr-only peer" onChange={()=>handleActivate(item.seq)} checked={item.isActive}/>
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FEDB82] dark:peer-focus:ring-[#FEDB82] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#FEDB82]"></div>
                                                {/*<span className="text-[10px] text-center font-medium text-gray-900 dark:text-gray-300">?????? ??????!</span>*/}
                                            </label>
                                        </div>
                                    </td>
                                        <td className="font-suit font-medium text-[17px] px-6 py-3 text-center" >

                                        {new Date(item.registerDate).toLocaleDateString()}

                                    </td>
                                    <td className="font-suit font-medium text-[17px] px-6 py-3 text-center" >
                                            {new Date(item.lastAccess).toLocaleDateString()}

                                    </td>

                                    <td className="font-suit font-medium text-[18px] px-8 py-3 text-center" >
                                        {item.accessCount}
                                    </td>
                                        <Fragment >
                                            <td className="font-suit font-medium text-[18px] px-8 py-3 text-center" onClick={()=>handleOpen(item)}>
                                                ?????????
                                            </td>
                                            <Modal show={open} size="2xl" popup={true} onClose={handleOpen} item={item}>
                                                <Modal.Header/>
                                                <Modal.Body >
                                                    <div className="px-6 sm:px-6 lg:px-8 xl:px-8 grid grid-cols-5 grid-rows-6 gap-3">
                                                        <p className="col-span-5 text-[22px] text-black font-suit font-bold place-self-center text-center">?????? ????</p>

                                                        <div className="col-span-5 grid grid-cols-5 items-center">
                                                            <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]" >?????????</label>
                                                            <input type="text" className="col-span-4 font-suit font-medium text-[18px] mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0" placeholder={editItem.originalUrl}  onChange={handleOrigin}/>
                                                        </div>
                                                        <div className="col-span-5 grid grid-cols-2 gap-[20px] mx-auto place-self-center">
                                                            <div className="text-center place-self-center">
                                                                <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]" >????????? :</label>
                                                                <input
                                                                    id="originStart" type="date"
                                                                    className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0  font-suit font-medium  text-[16px]" onChange={handleStart} value={start.split('T')[0]}/>
                                                            </div>
                                                            <div className="text-center place-self-center">
                                                                <label className="text-[#000000] font-suit font-medium text-[18px] text-center mx-[10px]">????????? :</label>
                                                                <input
                                                                    id="originEnd" type="date"
                                                                    className="rounded-md bg-[#F8F8F8] border-0 focus:ring-0 font-suit font-medium text-[16px]" onChange={handleEnd} value={end.split('T')[0]}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-5 text-center place-self-center align-middle">
                                                            <label className="font-suit font-bold text-[18px] text-center">????</label>
                                                            <input type="password" className="font-suit font-medium text-[18px] text-center mx-[10px] rounded-md bg-[#F8F8F8] border-0 focus:ring-0" placeholder="????????????" onChange={handlePass}/>
                                                        </div>

                                                        <Tooltip content="* ????????? ??? URL??? ???????????????." className="bg-[#CACACA]/[0.16] text-[#A7A7A7] font-suit font-medium py-[3px] text-[12px] text-center place-self-center">
                                                            <div className="col-span-5 place-self-center cursor-pointer select-none">
                                                                <p className="w-[103px] py-[5px] rounded-[8px] bg-[#FEDB82] text-[#FFFFFF]  font-suit font-semibold text-[20px] text-center align-middle cursor-default cursor-pointer" onClick={()=>btnEdit(editItem)}>???????????????</p>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </Fragment>

                                        <td className="font-suit font-medium text-[18px] px-8 py-3 text-center" onClick={()=>btnDelete(item)} >
                                        ???????
                                    </td>
                                </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="self-center">
                    <p className="font-suit font-bold text-[20px] self-center text-center m-12">{`??? ????????? ??? ${totalCount}`}</p>
                </div>
                {/*Footer*/}
            </div>
            <Footer/>
        </div>
    );
}
export default List;

import '../App.css'
import customize from "../images/customize.png";
import date from "../images/date.png";
import lock from "../images/lock.png";
import qr from "../images/qr.png";
import dashboard from "../images/dashboard.png";
import example from "../images/sample.png";

function Feature(){
    return(
        <div className="grid grid-rows-2 sm:grid sm:grid-cols-3 sm:grid-rows-1 mx-[50px] my-[20px] h-[50%] gap-[20px] items-center">
            <div className="grid grid-rows-2 grid-cols-3 sm:grid sm:grid-rows-6 sm:grid-cols-1 gap-[10px]">
                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center sm:self-center sm:items-center">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={customize} alt=""/>
                    <div className="mx-[10px] place-self-center">
                        <p className="text-[16px] font-suit font-bold sm:text-left">사용자 지정</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">원하는 URL을 지정하여 생성 가능합니다.</p>
                    </div>
                </div>


                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={date} alt=""/>
                    <div className="mx-[10px] place-self-center">
                        <p className="text-[16px] font-suit font-bold sm:text-left">만료일 설정</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">링크의 유효기간을 설정할 수 있습니다.</p>
                    </div>
                </div>


                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={lock} alt=""/>
                    <div className="mx-[10px] place-self-center">
                        <p className="text-[16px] font-suit font-bold sm:text-left">암호 보호</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">암호를 설정하여 링크를 보호할 수 있습니다.</p>
                    </div>
                </div>

                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={qr} alt=""/>
                    <div className="mx-[10px]">
                        <p className="text-[16px] font-suit font-bold sm:text-left">QR 코드</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">QR코드를 생성하여 링크를 쉽게 공유할 수 있습니다.</p>
                        {/*ㄴ*/}
                    </div>
                </div>

                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={dashboard} alt=""/>
                    <div className="mx-[10px] ">
                        <p className="text-[16px] font-suit font-bold sm:text-left">통계 서비스</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">생성한 단축 URL에 대한 통계 서비스를 제공합니다.</p>
                    </div>
                </div>

                <div className="border-[2px] border-[#CACACA] bg-[#ffffff] rounded-[12px] py-[20px] justify-center select-none text-center ">
                    <img className="w-[60px] block mx-auto sm:float-left sm:mx-[20px]" src={customize} alt=""/>
                    <div className="mx-[10px] place-self-center">
                        <p className="text-[16px] font-suit font-bold sm:text-left">필터링 기능</p>
                        <p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left">악성 URL에 대한 필터링 기능으로 안전하게 서비스를 이용 가능합니다.</p>
                        {/*<p className="text-[16px] font-suit font-medium hidden sm:block sm:text-left"></p>*/}
                    </div>
                </div>
            </div>
            {/*기능 설명*/}
            <div className="sm:col-span-2 md:col-span-2 h-fit  justify-center items-center">
                <img src={example} className=" place-self-center" alt=""/>
            </div>
        </div>

    );
}
export default Feature;
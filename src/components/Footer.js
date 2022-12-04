import logo from "../images/kafe_logo_192.png";
import dark from "../images/dark.png";
import lang from "../images/language.png";
 function Footer() {
    return(

        <footer className="p-4 bg-[#F1F1F1] md:px-6 md:py-8 dark:bg-gray-900">
            {/*<div className="sm:flex sm:items-center sm:justify-between">*/}
            <div className="sm:flex-col sm:items-center ">
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-6 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 text-[#FEDB82] font-suit font-semibold text-[18px]">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 text-[#FEDB82] font-suit font-semibold text-[18px]">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 text-[#FEDB82] font-suit font-semibold text-[18px]">Developers</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-[#FEDB82] font-suit font-semibold text-[18px]">유료안내</a>
                    </li>
                </ul>
                <a href="" className="flex items-center mb-4 sm:mb-4">
                    <img src={logo} className="mr-3 h-8" alt="Kafe Logo"/>
                    <span className="self-center text-[28px] font-semibold font-suit whitespace-nowrap dark:text-white">Kafe</span>
                </a>
                <p className="font-suit font-semibold text-[20px] cursor-default">Short URLs & Analytics</p>
                <p className="font-suit font-medium text-[12px] cursor-default">단축 URL을 커피처럼 빠르게</p>
            </div>
            {/*<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>*/}
            <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8"/>
            <span className="block text-sm text-gray-500 dark:text-gray-400 text-[18px] font-suit font-normal cursor-default">© 2022 Kafe All Rights Reserved</span>
        </footer>
    );
 }
 export default Footer

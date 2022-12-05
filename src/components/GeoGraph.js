import {ZoomableGroup, ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {useEffect, useMemo, useState} from "react";
import {Tooltip} from "@material-tailwind/react";
function GeoGraph({pos}) {

    //지도
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";
    //const [sample, setSample] = useState([]);
    const [maxValue, setMaxValue] = useState(0);

    function csvToJSON(csv_string){
        // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장
        const rows = csv_string.split("\n");

        // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체
        const jsonArray = [];
        // 3. 제목 행 추출 후 ','로 구분 => 배열에 저장
        const header = rows[0].split(",");

        // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
        for(let i = 1; i < rows.length-1; i++){
            // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체
            let obj = {};
            // 각 내용 행을 콤마로 구분
            let row = rows[i].split(",");
            // 각 내용 행을 객체로 생성
            for(let j=0; j < header.length; j++){
                obj[header[j]] = row[j];
            }
            // 각 내용 행의 객체를 jsonArray배열에 담기
            jsonArray.push(obj);
        }

        // 5. 완성된 JSON 객체 배열 반환
        return jsonArray;
    }

    const arr_json = csvToJSON(pos);



    useEffect(() => {
        let max = arr_json.map((item)=>{
            return parseInt(item.cnt);
        })
        console.log(max)
        setMaxValue(Math.max(...max));
    }, [arr_json]);

    const popScale = useMemo(
        () => scaleLinear().domain([0, maxValue]).range([0, 24]),
        [maxValue]
    );

    return (
        <ComposableMap >
            <ZoomableGroup center={[0, 0]} zoom={1}>
                <Geographies geography={geoUrl} className="h-[300px]">
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
                        ))
                    }
                </Geographies>

                {arr_json.map(({lon, lat, cnt, country}) => {
                    if (cnt<=maxValue/4){
                        return (
                            <Tooltip content={`${country} : ${cnt}`} className="font-['SUIT-Regular'] text-[10px] bg-[#000000]/[0.8]">
                                <Marker key={parseInt(country)} coordinates={[lon, lat]}>
                                    {/*<circle fill="rgba(149, 208, 148, 0.7)" stroke="rgba(149, 208, 148, 0.7)" r={cnt*10} />*/}
                                    <circle fill="rgba(149, 208, 148, 0.7)" stroke="rgba(149, 208, 148, 0.7)" r={popScale(cnt)} />
                                </Marker>
                            </Tooltip>
                        );
                    }else if (cnt<=maxValue/3){
                        return (
                            <Tooltip content={`${country} : ${cnt}`} className="font-['SUIT-Regular'] text-[10px] bg-[#000000]/[0.8]">
                                <Marker key={parseInt(country)} coordinates={[lon, lat]}>
                                    {/*<circle fill="rgba(254, 219, 130, 0.7)" stroke="rgba(254, 219, 130, 0.7)" r={cnt*10} />*/}
                                    <circle fill="rgba(254, 219, 130, 0.7)" stroke="rgba(254, 219, 130, 0.7)" r={popScale(cnt)} />
                                </Marker>
                            </Tooltip>
                        );
                    }else if (cnt<=maxValue/2){
                        return (
                            <Tooltip content={`${country} : ${cnt}`} className="font-['SUIT-Regular'] text-[10px] bg-[#000000]/[0.8]">
                                <Marker key={parseInt(country)} coordinates={[lon, lat]}>
                                    {/*<circle fill="rgba(255, 175, 130, 0.7)" stroke="rgba(255, 175, 130, 0.7)" r={cnt*10} />*/}
                                    <circle fill="rgba(255, 175, 130, 0.7)" stroke="rgba(255, 175, 130, 0.7)" r={popScale(cnt)} />
                                </Marker>
                            </Tooltip>
                        );
                    }else{
                        return (
                            <Tooltip content={`${country} : ${cnt}`} className="font-['SUIT-Regular'] text-[10px] bg-[#000000]/[0.8]">
                                <Marker key={parseInt(country)} coordinates={[lon, lat]}>
                                    {/*<circle fill="rgba(255, 146, 146, 0.7)" stroke="rgba(255, 146, 146, 0.7)" r={cnt} />*/}
                                    <circle fill="rgba(255, 146, 146, 0.7)" stroke="rgba(255, 146, 146, 0.7)" r={popScale(cnt)} />
                                </Marker>
                            </Tooltip>
                        );
                    }
                })}
            </ZoomableGroup>
        </ComposableMap>
    );
}
export default GeoGraph
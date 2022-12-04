import {
    ArcElement, BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement, Title,
    Tooltip
} from "chart.js";

import { Bar } from 'react-chartjs-2';

function BarGraph({timestamp}){

    ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        Title);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: '요일별 트래픽',
                font: 'SUIT-Regular',
            },
        },
    };
    let time = timestamp;

    let timeData = time.map((item)=>{
        return new Date(item.split(' ')[0]).getDay();
    })

    console.log(timeData)

    const occurrences = timeData.reduce((a, i) => {return a[i]=(a[i]||0)+1, a},{});

    const out1 = Object.fromEntries(
        Object.entries(occurrences).sort(([a],[b]) => a < b? -1: 1 )
    );

    // console.log(out1);
    // console.log(Object.keys(out1));
    // console.log(Object.values(out1));

    const labels = [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const value = [0,0,0,0,0,0,0];
    // eslint-disable-next-line array-callback-return
    Object.keys(out1).map((o)=>{
        value[o]=out1[o];
    })

    // console.log(value)


    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [
                    '#FF9292',
                    '#FFAF82',
                    '#FEDB82',
                    '#95D094',
                    '#8CC6E7',
                    '#9FA9FF',
                    "#CC9BCD",
                ],
            },
        ],
    };

    return <Bar options={options} data={data} />;

}
export default BarGraph;
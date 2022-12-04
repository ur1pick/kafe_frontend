import { Line } from 'react-chartjs-2';

function LineGraph({timestamp}) {
    //꺾은선
    let time = timestamp;

    // console.log(time)
    let timeData = time.map((item)=>{
        return item.split(' ')[1];
    })

    // console.log(timeData);
    const occurrences = timeData.reduce((a, i) => {return a[i]=(a[i]||0)+1, a},{});

    const out1 = Object.fromEntries(
        Object.entries(occurrences).sort(([a],[b]) => a < b? -1: 1 )
    );

    console.log(out1);
    // console.log(Object.keys(out1));
    // console.log(Object.values(out1));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: '시간별 트래픽',
                font: 'SUIT-Regular',
            },
        },
    };

    const labels = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    const value = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    // eslint-disable-next-line array-callback-return
    Object.keys(out1).map((o)=>{
        value[parseInt(o)]=out1[o];
    });
    // console.log(value)

    const data = {
        labels,
        datasets: [
            {
                data: value,
                borderColor: '#FEDB82',
                backgroundColor: '#FBBC05'
            },
        ],
    };
    return <Line options={options} data={data} />;
}
export default LineGraph;
import { Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title, } from 'chart.js';

import { Pie } from 'react-chartjs-2';

function PieGraph({data}) {
    ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title);

    return <Pie data={data}/>
}
export default PieGraph
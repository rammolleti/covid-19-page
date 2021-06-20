import {Line} from 'react-chartjs-2'
import './index.css'

const SpreadChart = props => {
  const {chartData, chartHeading, chartColor, chartBgColor, color} = props
  const data = {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      25,
      26,
      27,
      28,
      29,
      30,
    ],
    datasets: [
      {
        label: 'COVID-19 SPREAD',
        data: chartData,
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <div className={`chart-container ${chartBgColor}`}>
      <p className={`chart-heading ${chartColor}`}>{chartHeading}</p>
      <Line className="chart" data={data} options={options} />
    </div>
  )
}

export default SpreadChart

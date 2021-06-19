import {Line} from 'react-chartjs-2'
import './index.css'

const SpreadChart = props => {
  const {chartData, chartHeading, chartColor, chartBgColor, color} = props
  console.log(chartData)
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    datasets: [
      {
        label: 'COVID-19 SPREAD',
        data: [1, 10, 20, ...chartData],
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
      <p className={`${chartColor}`}>{chartHeading}</p>
      <Line className="chart" data={data} options={options} />
    </div>
  )
}

export default SpreadChart

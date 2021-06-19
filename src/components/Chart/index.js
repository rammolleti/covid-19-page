import {Bar} from 'react-chartjs-2'

const Chart = props => {
  const {chart} = props
  const stateData = chart[1]
  const data = {
    labels: [
      stateData[0][0],
      stateData[1][0],
      stateData[2][0],
      stateData[3][0],
      stateData[4][0],
      stateData[5][0],
      stateData[6][0],
      stateData[7][0],
      stateData[8][0],
      stateData[9][0],
    ],
    datasets: [
      {
        data: [
          stateData[0][1],
          stateData[1][1],
          stateData[2][1],
          stateData[3][1],
          stateData[4][1],
          stateData[5][1],
          stateData[6][1],
          stateData[7][1],
          stateData[8][1],
          stateData[9][1],
        ],
        backgroundColor: [chart[0]],
        borderRadius: 8,
        borderWidth: 1,
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
    <>
      <Bar data={data} options={options} />
    </>
  )
}

export default Chart

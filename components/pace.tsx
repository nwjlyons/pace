import React from "react";


const min = 0;
const initial = 60 * 3;
const max = 60 * 15;
const oneMileInKm = 1.609344;

const distances = [
  { name: "100 m", distance: 100, hightlight: false },
  { name: "200 m", distance: 200, hightlight: false },
  { name: "400 m", distance: 400, hightlight: false },
  { name: "800 m", distance: 800, hightlight: false },
  { name: "1 km", distance: 1000, hightlight: true },
  { name: "1 mile", distance: 1609.34, hightlight: false },
  { name: "5 km", distance: 5000, hightlight: false },
  { name: "10 km", distance: 10000, hightlight: false },
  { name: "Half Marathon", distance: 21097.5, hightlight: false },
  { name: "Marathon", distance: 42195, hightlight: false },
]


export default class Pace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secs: initial };
  }
  elapsedTime = (distance: number): string => {
    let seconds = (this.state.secs * distance);
    let [start, end] = (seconds < 3600) ? [14, 19] : [11, 19]
    return new Date(seconds).toISOString().substring(start, end)
  }
  inc = () => {
    this.setState((state, props) => ({
      secs: state.secs + 1
    }));
  }
  dec = () => {
    this.setState((state, props) => ({
      secs: state.secs - 1
    }));
  }
  render() {
    return (
      <div className="m-4">
        <header className="p-4 bg-white rounded-lg shadow flex items-center justify-center md:p-6">
          <h1 className="text-3xl text-gray-800 font-bold"><a href="/" className="hover:underline">Pace Converter</a>
          </h1>
        </header>
        <h1 className="text-4xl mb-4"></h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Distance
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Pace (min/km)
                </th>
              </tr>
            </thead>
            <tbody>
              {distances.map(distance => (
                <tr key={distance.distance} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left">
                    {distance.name}
                  </th>
                  <td className="px-6 py-4 text-left">
                    {this.elapsedTime(distance.distance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex rounded-md shadow-sm mt-4" role="group">
          <button onClick={this.dec} type="button" className="w-1/2 p-6 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            -
          </button>
          <button onClick={this.inc} type="button" className="w-1/2 p-6 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            +
          </button>
        </div>
      </div>
    )
  }
}
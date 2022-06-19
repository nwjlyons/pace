import Link from "next/link";
import React from "react";

const initial = 60 * 4;
const oneKm = 1000;
const oneMileInKm = 1.609344;
const oneMileInM = oneMileInKm * 1000;
const marathonKm = 42195
const halfMarathonKm = 42195 / 2

const distances: Array<{ name: string, description: string, distance: number, highlight: boolean }> = [
  { name: "100 m", description: "", distance: 100, highlight: false },
  { name: "200 m", description: "", distance: 200, highlight: false },
  { name: "400 m", description: "", distance: 400, highlight: false },
  { name: "1 km", description: `${formatKmToMiles(1000)} miles`, distance: 1000, highlight: false },
  { name: "1 mile", description: `${formatMetresToKm(oneMileInM)} km`, distance: oneMileInM, highlight: false },
  { name: "5 km", description: `${formatKmToMiles(5000)} miles`, distance: 5000, highlight: true },
  { name: "5 miles", description: `${formatMilesToKm(5)} km`, distance: oneMileInM * 5, highlight: false },
  { name: "10 km", description: `${formatKmToMiles(10000)} miles`, distance: 10000, highlight: true },
  { name: "15 km", description: `${formatKmToMiles(15000)} miles`, distance: 15000, highlight: false },
  { name: "10 miles", description: `${formatMilesToKm(10)} km`, distance: oneMileInM * 10, highlight: false },
  { name: "Half Marathon", description: `${formatKmToMiles(halfMarathonKm)} miles, ${formatMetresToKm(halfMarathonKm)} km`, distance: 21097.5, highlight: true },
  { name: "Marathon", description: `${formatKmToMiles(marathonKm)} miles, ${formatMetresToKm(marathonKm)} km`, distance: marathonKm, highlight: true },
]

function formatKmToMiles(distance: number): string {
  return (distance / oneMileInM).toFixed(3)
}

function formatMilesToKm(distance: number): string {
  return (distance * oneMileInKm).toFixed(3)
}

function formatMetresToKm(distance: number): string {
  return (distance / oneKm).toFixed(3)
}


interface IProps {
}

interface IState {
  secs: number;
}

function formatSeconds(seconds: number): string {
  let [start, end] = (seconds < 3600) ? [14, 19] : [11, 19]
  return new Date(seconds).toISOString().substring(start, end)
}


export default class Pace extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { secs: initial };
  }
  elapsedTime = (distance: number): string => {
    return formatSeconds(this.state.secs * distance)
  }
  paceKm = (): string => {
    return formatSeconds(this.state.secs * oneKm)
  }
  speedKm = (): string => {
    return ((60 * 60) / this.state.secs).toFixed(1)
  }
  paceMi = (): string => {
    return formatSeconds((this.state.secs * oneMileInKm) * oneKm)
  }
  speedMi = (): string => {
    return ((60 * 60) / (this.state.secs * oneMileInKm)).toFixed(1)
  }
  inc = (n: number): void => {
    this.setState((state, props) => ({
      secs: state.secs + n
    }));
  }
  dec = (n: number): void => {
    this.setState((state, props) => ({
      secs: state.secs - n
    }));
  }
  render() {
    return (
      <div className="flex gap-4 flex-col m-4">
        <h1 className="text-xl text-gray-500 text-center"><Link href="/">Race Predictor</Link></h1>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="md:w-1/2 order-2 md:order-1 relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Distance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Elapsed Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {distances.map(distance => (
                  <tr key={distance.distance} className={distance.highlight ? "bg-yellow-100 border-b" : "bg-white border-b"}>
                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap text-left">
                      <div>{distance.name}</div>
                      {distance.description ? <small className="text-gray-400">{distance.description}</small> : ""}
                    </th>
                    <td className="px-6 py-1 text-left">
                      {this.elapsedTime(distance.distance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 flex flex-col gap-4">
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th><span className="sr-only">Distance Unit</span></th>
                    <th className="px-6 py-2 text-gray-900 whitespace-nowrap text-left">Pace</th>
                    <th className="px-6 py-2 text-gray-900 whitespace-nowrap text-left">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap text-left">
                      Kilometres
                    </th>
                    <td className="px-6 py-2 text-left">
                      <div>{this.paceKm()} <small>min/km</small></div>
                    </td>
                    <td className="px-6 py-2 text-left">
                      <div>{this.speedKm()} <small>km/h</small></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap text-left">
                      Miles
                    </th>
                    <td className="px-6 py-2 text-left">
                      <div>{this.paceMi()} <small>min/mile</small></div>
                    </td>
                    <td className="px-6 py-2 text-left">
                      <div>{this.speedMi()} <small>mile/h</small></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex rounded-md shadow-sm" role="group">
              <button onClick={() => this.dec(1)} type="button" className="w-2/6 py-6 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                -1s
              </button>
              <button onClick={() => this.dec(10)} type="button" className="w-1/6 py-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                -10s
              </button>
              <button onClick={() => this.inc(10)} type="button" className="w-1/6 py-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                +10s
              </button>
              <button onClick={() => this.inc(1)} type="button" className="w-2/6 py-6 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                +1s
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
import React from "react";
import Link from 'next/link'


const min = 0;
const initial = 60 * 4;
const max = 60 * 15;
const oneKm = 1000;
const oneMileInKm = 1.609344;

const distances: Array<{ name: string, distance: number }> = [
  { name: "100 m", distance: 100 },
  { name: "200 m", distance: 200 },
  { name: "400 m", distance: 400 },
  { name: "1 km", distance: 1000 },
  { name: "5 km", distance: 5000 },
  { name: "10 km", distance: 10000 },
  { name: "Half Marathon", distance: 21097.5 },
  { name: "Marathon", distance: 42195 },
]

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
      <div className="flex gap-4 flex-col">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <div className="flex justify-between bg-gray-800 text-white rounded">
          <div className="p-4">
            <small>min/km</small>
            <div>{this.paceKm()}</div>
          </div>
          <div className="p-4">
            <small>km/h</small>
            <div>{this.speedKm()}</div>
          </div>
          <div className="p-4">
            <small>mi/h</small>
            <div>{this.speedMi()}</div>
          </div>
          <div className="p-4">
            <small>min/mi</small>
            <div>{this.paceMi()}</div>
          </div>
        </div>
        <div className="flex rounded-md shadow-sm" role="group">
          <button onClick={() => this.dec(1)} type="button" className="w-2/6 p-6 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            -1
          </button>
          <button onClick={() => this.dec(10)} type="button" className="w-1/6 p-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            -10
          </button>
          <button onClick={() => this.inc(10)} type="button" className="w-1/6 p-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            +10
          </button>
          <button onClick={() => this.inc(1)} type="button" className="w-2/6 p-6 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            +1
          </button>
        </div>
      </div>
    )
  }
}
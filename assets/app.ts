import m from "mithril"

const oneKm: number = 1000;
const oneMileInKm: number = 1.609344;
const oneMileInM: number = oneMileInKm * 1000;
const marathonKm: number = 42195
const halfMarathonKm: number = 42195 / 2

type Distance = {
    name: string;
    description: string;
    distance: number;
    highlight: boolean;
}

const distances: Array<Distance> = [
  { name: "100 m", description: "", distance: 100, highlight: false },
  { name: "200 m", description: "", distance: 200, highlight: false },
  { name: "400 m", description: "", distance: 400, highlight: false },
  { name: "1 km", description: `${formatDistance(convertKmToMiles(1000))} miles`, distance: 1000, highlight: false },
  { name: "1 mile", description: `${formatDistance(convertMetresToKm(oneMileInM))} km`, distance: oneMileInM, highlight: false },
  { name: "5 km", description: `${formatDistance(convertKmToMiles(5000))} miles`, distance: 5000, highlight: true },
  { name: "5 miles", description: `${formatDistance(convertMilesToKm(5))} km`, distance: oneMileInM * 5, highlight: false },
  { name: "10 km", description: `${formatDistance(convertKmToMiles(10000))} miles`, distance: 10000, highlight: true },
  { name: "15 km", description: `${formatDistance(convertKmToMiles(15000))} miles`, distance: 15000, highlight: false },
  { name: "10 miles", description: `${formatDistance(convertMilesToKm(10))} km`, distance: oneMileInM * 10, highlight: false },
  { name: "Half Marathon", description: `${formatDistance(convertKmToMiles(halfMarathonKm))} miles, ${formatDistance(convertMetresToKm(halfMarathonKm))} km`, distance: 21097.5, highlight: true },
  { name: "Marathon", description: `${formatDistance(convertKmToMiles(marathonKm))} miles, ${formatDistance(convertMetresToKm(marathonKm))} km`, distance: marathonKm, highlight: true },
]

function formatPace(seconds: number): string {
  let [start, end] = (seconds < 3600) ? [14, 19] : [11, 19]
  return new Date(seconds).toISOString().substring(start, end)
}

function formatSpeed(speed: number): string {
    return speed.toFixed(1)
}

function formatDistance(distance: number): string {
    return distance.toFixed(3)
}

function convertKmToMiles(distance: number): number {
  return distance / oneMileInM
}

function convertMilesToKm(distance: number): number {
  return distance * oneMileInKm
}

function convertMetresToKm(distance: number): number {
  return distance / oneKm
}


class App {
    secs: number = 60 * 4;

    oninit(): void {
        this.secs = parseInt(m.route.param("pace"))
    }

    increment(n: number = 1): void {
        this.secs = this.secs + n;
        m.route.set("/pace/:pace", {pace: this.secs})
    }

    decrement(n: number = 1): void {
        this.secs = this.secs - n;
        m.route.set("/pace/:pace", {pace: this.secs})
    }

    paceKm(): number {
        return this.secs * oneKm
    }

    speedKm(): number {
        return (60 * 60) / this.secs
    }

    paceMi(): number {
        return (this.secs * oneMileInKm) * oneKm
    }

    speedMi(): number {
        return (60 * 60) / (this.secs * oneMileInKm)
    }

    elapsedTime(distance: number): number {
        return this.secs * distance
    }

    view(): m.Vnode {
        return m("main", {class: "flex gap-4 flex-col m-4"}, [
            m("h1", {class: "text-2xl text-gray-800 text-center"}, "🏃‍♀️ Race Predictor 🏃‍♂️"),
            m("div", {class: "flex gap-4 flex-col"},[
                m("div", {class: "flex flex-col gap-4"}, [
                    m("table", {class: "w-full text-sm text-gray-500 shadow-md rounded-lg"}, [
                        m("thead", {class: "text-xs text-gray-700 uppercase bg-gray-50"}, [
                            m("tr", [
                                m("th", ""),
                                m("th", {class: "px-6 py-2 text-gray-900 whitespace-nowrap text-left"}, "Pace"),
                                m("th", {class: "px-6 py-2 text-gray-900 whitespace-nowrap text-left"}, "Speed"),
                            ])
                        ]),
                        m("tbody", [
                            m("tr", {class: "bg-white border-b"}, [
                                m("th", {class: "px-6 py-2 font-medium text-gray-900 whitespace-nowrap text-left"}, "Kilometres"),
                                m("td", {class: "px-6 py-2 text-left"}, m("div", [
                                    m("span", formatPace(this.paceKm())),
                                    m("span", " min/km"),
                                ])),
                                m("td", {class: "px-6 py-2 text-left"}, m("div", [
                                    m("span", formatSpeed(this.speedKm())),
                                    m("span", " km/h"),
                                ])),
                            ]),
                            m("tr", [
                                m("th", {class: "px-6 py-2 font-medium text-gray-900 whitespace-nowrap text-left"}, "Miles"),
                                m("td", {class: "px-6 py-2 text-left"}, m("div", [
                                    m("span", formatPace(this.paceMi())),
                                    m("span", " min/mile"),
                                ])),
                                m("td", {class: "px-6 py-2 text-left"}, m("div", [
                                    m("span", formatSpeed(this.speedMi())),
                                    m("span", " mile/h"),
                                ])),
                            ])
                        ])
                    ]),
                    m("div", {class: "flex rounded-md shadow-sm"}, [
                        m("button", {onclick: (): void => this.decrement(), class: "select-none w-2/6 py-6 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"}, "-1s"),
                        m("button", {onclick: (): void => this.decrement(10), class: "select-none w-1/6 py-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"}, "-10s"),
                        m("button", {onclick: (): void => this.increment(10), class: "select-none w-1/6 py-6 text-sm font-medium text-gray-900 bg-white border border-gray-200 bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"}, "+10s"),
                        m("button", {onclick: (): void => this.increment(), class: "select-none w-2/6 py-6 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"}, "+1s"),
                    ])
                ]),
                m("div", {class: "flex flex-col gap-4"}, m("table", {class: "w-full text-sm text-gray-500 shadow-md rounded-lg"}, [
                    m("thead", {class: "text-xs text-gray-700 uppercase bg-gray-50"}, [
                        m("tr", [
                            m("th", {class: "px-6 py-3 text-left"}, "Distance"),
                            m("th", {class: "px-6 py-3 text-left"}, "Elapsed time"),
                        ])
                    ]),
                    m("tbody", distances.map((distance: Distance) => m("tr", {class: distance.highlight ? "bg-yellow-100 border-b" : "bg-white border-b"}, [
                        m("td", {class: "px-6 py-2 font-medium text-gray-900 whitespace-nowrap text-left"}, [
                            m("div", {class: "font-medium text-gray-900 whitespace-nowrap text-left"}, distance.name),
                            m("small", {class: "text-gray-400"}, distance.description),
                        ]),
                        m("td", {class: "px-6 py-1 text-left"}, formatPace(this.elapsedTime(distance.distance)))
                    ])))
                ]))
            ])
        ])
    }
}

m.route.prefix = ''
m.route(document.body, "/pace/300", {
    "/pace/:pace": App,
})

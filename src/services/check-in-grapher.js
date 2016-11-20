import moment from 'moment'
import { getCurvePoints } from 'cardinal-spline-js'

export default class CheckInGrapher {
  constructor(data, {height, width=120} = {height: 100, width: 1}) {
    this.ready = !!data.length
    if (!this.ready) return;

    this.data = prepare(data)
    this.height = height
    this.dayWidth = width

    this.values = this._values()
    this.xs = this.values.map(d => d[0])
    this.ys = this.values.map(d => d[1])

    this.xSize = this._xSize()
    this.yRange = this._yRange()
    this.ySize = this._ySize()
    this.width = (this.xSize) * this.dayWidth

    if (this.ySize <= 0 || this.xSize <= 0) this.ready = false
    if (!this.ready) return;

    this.height = height
    this.yFactor = height / this.ySize

    this.curve = this._curve()
    this.SVGPoints = this._SVGPoints()

    this.viewBox = this._viewBox()
  }

  _viewBox () {
    return [
      (0),
      (this.yRange.max * this.yFactor),
      this.width,
      (this.ySize * -this.yFactor)
    ].join(' ')
  }

  _curve() {
    const points = this.values.reduce((a, b) => a.concat(b))
    return vectorize(getCurvePoints(points))
  }

  percent (progress) {
    const abs = this.valueAt(progress) - this.yRange.min
    return abs / this.ySize
  }

  valueAt(v) {
    let index = Math.floor((this.curve.length - 1) * v)
    index = Math.min(this.curve.length - 1, Math.max(index, 0))
    return this.curve[index].y
  }

  _SVGPoints () {
    return this.curve.map(({x, y}) => [x*this.dayWidth, y*this.yFactor].join(',')).join(' ')
  }

  _values() {
    return this.data.map(d => ([moment().diff(d.createdAt, 'd'), d.score]))
  }
  _xSize() {
    return Math.max(...this.xs.map(n => Math.abs(n)))
  }
  _yRange() {
    return this.ys.reduce((prev, current) => {
      const min = Math.min(current, prev.min)
      const max = Math.max(current, prev.max)
      return {min, max}
    }, {min: this.ys[0], max: this.ys[0]})
  }
  _ySize() {
    return this.yRange.max - this.yRange.min
  }
}

function prepare (data) {
  const latest = data[0]
  if (moment().diff(latest.createdAt, 'd') != 0) {
    data.unshift({ score: 0, createdAt: moment().toISOString() })
  }
  return data
}

function vectorize (points) {
  const arr = []
  for (var i = 0; i < points.length; i += 2){
    arr.push(points.slice(i, i + 2))
  }
  return arr.map(([x, y]) => ({x, y}))
};

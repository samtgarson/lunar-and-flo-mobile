import Grapher from './check-in-grapher'
import { expect } from 'chai'
import { CheckInFactory } from '../test/support/factory'
import moment from 'moment'

describe('CheckInGrapher', () => {

  describe('with empty data', () => {
    it('is not ready', () => {
      const subject = new Grapher([])
      expect(subject.ready).not.to.be.true
    });
  })

  describe('for data without today', () => {
    beforeEach(() => {
      checkIns = CheckInFactory.buildList(3)
      const scores = [1, 3, 2]
      checkIns.forEach((c, i) => {
        c.createdAt = moment().subtract(i+1, 'd').toISOString()
        c.score = scores[i]
      })
      checkIns.sort((a, b) => moment(a.createdAt).isBefore(b.createdAt))

      subject = new Grapher(checkIns, {height: 6, width: 100}) 
    })

    it ('adds today in', () => {
      expect(subject.values).to.have.lengthOf(4)
    })

    it ('generates a curve', () => {
      curve = subject.curve
      len = curve.length
      expect(curve[len - 1]).to.eql({x: 3, y: 2})
      expect(curve).to.include({x: 2, y: 3})
      expect(curve).to.include({x: 1, y: 1})
      expect(curve[0]).to.eql({x: 0, y: 0})
    })

    it ('generates a string of points', () => {
      points = subject.SVGPoints.split(' ')

      expect(points[points.length - 1]).to.eq('300,0')
      expect(points[points.length - 2]).to.eq('300,4')
      expect(points).to.include('200,6')
      expect(points).to.include('100,2')
      expect(points[1]).to.eq('0,0')
      expect(points[0]).to.eq('0,0')
    })
  })

  describe('with good data', () => {
    let subject, checkIns

    beforeEach(() => { 
      checkIns = CheckInFactory.buildList(3)
      const scores = [2, 3, 1]
      checkIns.forEach((c, i) => {
        c.createdAt = moment().subtract(i, 'd').toISOString()
        c.score = scores[i]
      })
      checkIns.sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)))

      subject = new Grapher(checkIns, {height: 6, width: 80}) 
    })

    it('is ready', () => {
      expect(subject.ready).to.be.true
    });

    it ('has the correct values', () => {
      expect(subject.values).to.eql([[0, 2], [1, 3], [2, 1]])
    })

    it ('has the correct sizes', () => {
      expect(subject.xSize).to.eql(2)
      expect(subject.ySize).to.eql(2)
      expect(subject.yRange).to.eql({min: 1, max: 3})
    })

    it ('generates a curve', () => {
      curve = subject.curve
      len = curve.length
      expect(curve[0]).to.eql({x: 0, y: 2})
      expect(curve[(len-1) / 2]).to.eql({x: 1, y: 3})
      expect(curve[len - 1]).to.eql({x: 2, y: 1})
    })

    it ('does the right calculations', () => {
      val = subject.valueAt(.5)
      percent = subject.percent(.5)
      expect(val).to.eql(3)
      expect(percent).to.eql(1)
    })

    it ('generates a string of points', () => {
      points = subject.SVGPoints.split(' ')

      expect(points[0]).to.eq('0,3')
      expect(points[1]).to.eq('0,6')
      expect(points).to.include('80,9')
      expect(points[points.length - 2]).to.eq('160,3')
      expect(points[points.length - 1]).to.eq('160,3')
    })

    it ('calculates the correct viewbox', () => {
      const view = subject.viewBox
      const expected = '0 9 160 -6'

      expect(view).to.eql(expected)
    })
  })
});

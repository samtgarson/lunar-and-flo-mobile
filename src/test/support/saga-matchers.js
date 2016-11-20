import chaiSubset from 'chai-subset'

export default function sagaMatchers (chai) {
  chai.Assertion.addMethod('yield', function (effect) {
    const subject = this._obj.next().value
    this._sagaMatcher = {
      effect: effect,
      subject: subject
    }
    chai.assert.property(subject, effect)
  })

  chai.Assertion.addMethod('parallel', function (effect) {
    const subject = this._obj.next().value
    this._sagaMatcher = {
      effect: effect,
      subject: subject,
      parallel: true
    }
    subject.forEach((val) => {
      chai.assert.property(val, effect)
    })
  })

  chai.Assertion.addMethod('withArgs', function (obj) {
    chai.use(chaiSubset)
    const effect = this._sagaMatcher.effect
    const subject = this._sagaMatcher.subject

    if (this._sagaMatcher.parallel) {
      subject.forEach((subj) => {
        chai.assert.oneOf(subj[effect].fn, obj)
      })
    } else {
      chai.assert.match(JSON.stringify(subject[effect]), new RegExp(JSON.stringify(obj)))
    }
  })
}

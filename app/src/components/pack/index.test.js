import React, { Text, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import Pack from './index';
import { PackFactory } from '../../test/support/factory'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chai, { expect } from 'chai'
chai.use(sinonChai)

describe('Pack', () => {
  let subject, spy, pack;

  describe ('given a normal pack', () => {
    beforeEach(() => {
      spy = sinon.spy()
      pack = PackFactory.build()
      subject = shallow(<Pack pack={pack} selectSupplement={spy} />)
    })
    it('has 3 Text elements', () => {
      expect(subject.find(Text)).to.have.length(3)
    });

    it('calls the prop on click', () => {
      subject.find(TouchableOpacity).first().simulate('press')
      expect(spy).to.be.calledWith(pack.effects[0].supplement.id)
    })
  })
});

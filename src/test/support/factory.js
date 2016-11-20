import { Factory } from 'rosie';
import Chance from 'chance'
const chance = new Chance()

export const PackFactory = new Factory()
  .sequence('id')
  .option('effectCount', 3)
  .attr('createdAt', () => new Date().toISOString())
  .attr('effects', ['effectCount'], (effectCount) => (
    Array(effectCount).fill(0).map (() => EffectFactory.build())
  ))

export const EffectFactory = new Factory()
  .sequence('id')
  .attr('effectivenessDays', () => chance.integer({min: 1, max: 40}))
  .attr('symptom', () => SymptomFactory.build())
  .attr('supplement', () => SupplementFactory.build())

export const SupplementFactory = new Factory()
  .sequence('id')
  .attrs({
    name: () => chance.word(),
    description: () => chance.sentence()
  })

export const SymptomFactory = new Factory()
  .sequence('id')
  .attrs({
    name: () => chance.word(),
    description: () => chance.sentence()
  })

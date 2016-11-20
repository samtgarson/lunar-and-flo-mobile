import { Factory } from 'rosie';
import Chance from 'chance'
const chance = new Chance()

const weatherIcons = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']
const moodIcons = ["happy", "sad", "angry", "confused", "thoughtful", "caring"]

export const PackFactory = new Factory()
  .attr('id', () => chance.guid())
  .option('effectCount', 3)
  .attr('createdAt', () => new Date().toISOString())
  .attr('effects', ['effectCount'], (effectCount) => EffectFactory.buildList(effectCount))

export const EffectFactory = new Factory()
  .attr('id', () => chance.guid())
  .attr('effectivenessDays', () => chance.integer({min: 1, max: 40}))
  .attr('symptom', () => SymptomFactory.build())
  .attr('supplement', () => SupplementFactory.build())

export const SupplementFactory = new Factory()
  .attr('id', () => chance.guid())
  .attrs({
    name: () => chance.word(),
    description: () => chance.sentence()
  })

export const CheckInFactory = new Factory()
  .attr('id', () => chance.guid())
  .option('symptomCount', 3)
  .attr('symptoms', ['symptomCount'], (symptomCount) => SymptomFactory.buildList(symptomCount))
  .attr('createdAt', () => new Date().toISOString())
  .attrs({
    lat: () => chance.latitude({fixed: 2}), 
    lng: () => chance.longitude({fixed: 2}),
    icon: () => chance.pickone(moodIcons),
    period: () => chance.bool(),
    score: () => chance.integer({min: -4, max: 4}),
    weatherReport: () => WeatherReportFactory.build()
  })

export const WeatherReportFactory = new Factory()
  .attrs({
    id: () => chance.guid(),
    icon: () => chance.pickone(weatherIcons),
    cloudCover: () => chance.floating({min: 0, max: 1, fixed: 2}),
    temperature: () => chance.floating({min: -10, max: 40, fixed: 2}),
    precipProbability: () => chance.floating({min: 0, max: 1, fixed: 2}),
    precipType: () => chance.pickone(['rain', 'snow', 'sleet']),
    moonPhase: () => chance.floating({min: 0, max: 1, fixed: 2})
  })

export const SymptomFactory = new Factory()
  .attr('id', () => chance.guid())
  .attrs({
    name: () => chance.word(),
    description: () => chance.sentence()
  })

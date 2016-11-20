import {fk, many, Model, Schema} from '../vendor/redux-orm.min';
import PackReducer from './db/pack/reducer'
import SymptomReducer from './db/symptom/reducer'
import SupplementReducer from './db/supplement/reducer'
import EffectReducer from './db/effect/reducer'
import SymptomGroupReducer from './db/symptom-group/reducer'

class BaseModel extends Model {}
BaseModel.createOrUpdate = function (attrs) {
  if (this.hasId(attrs.id)) this.withId(attrs.id).update(attrs)
  else this.create(attrs)
}

export class Pack extends BaseModel {}
Pack.modelName = 'Pack'
Pack.reducer = PackReducer
Pack.fields = {
  effects: many('Effect', 'packs')
}

export class Effect extends BaseModel {}
Effect.modelName = 'Effect'
Effect.reducer = EffectReducer
Effect.fields = {
  supplement: fk('Supplement', 'effects'),
  symptom: fk('Symptom', 'effects')
}

export class Supplement extends BaseModel {}
Supplement.modelName = 'Supplement'
Supplement.reducer = SupplementReducer

export class Symptom extends BaseModel {}
Symptom.modelName = 'Symptom'
Symptom.reducer = SymptomReducer
Symptom.fields = {
  symptomGroup: fk('SymptomGroup', 'symptoms')
}

export class SymptomGroup extends BaseModel {}
SymptomGroup.modelName = 'SymptomGroup'
SymptomGroup.reducer = SymptomGroupReducer

const schema = new Schema()
schema.register(Pack, Effect, Supplement, Symptom, SymptomGroup)

export default schema

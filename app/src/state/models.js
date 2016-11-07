import {fk, many, Model, Schema} from 'redux-orm/dist/redux-orm.min';
import PackReducer from './pack/reducer'
import SymptomReducer from './symptom/reducer'
import SupplementReducer from './supplement/reducer'
import EffectReducer from './effect/reducer'
import SymptomGroupReducer from './symptom-group/reducer'

class Pack extends Model {}
Pack.modelName = 'Pack'
Pack.reducer = PackReducer
Pack.fields = {
  effects: many('Effect', 'packs')
}

class Effect extends Model {}
Effect.modelName = 'Effect'
Effect.reducer = EffectReducer
Effect.fields = {
  supplement: fk('Supplement', 'effect'),
  symptom: fk('Symptom', 'effect')
}

class Supplement extends Model {}
Supplement.modelName = 'Supplement'
Supplement.reducer = SupplementReducer

class Symptom extends Model {}
Symptom.modelName = 'Symptom'
Symptom.reducer = SymptomReducer
Symptom.fields = {
  symptomGroup: fk('SymptomGroup', 'symptoms')
}

class SymptomGroup extends Model {}
SymptomGroup.modelName = 'SymptomGroup'
SymptomGroup.reducer = SymptomGroupReducer

const schema = new Schema()
schema.register(Pack, Effect, Supplement, Symptom, SymptomGroup)

export default schema

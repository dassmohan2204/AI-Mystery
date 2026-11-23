import mongoose from 'mongoose';

const { Schema } = mongoose;
const suspectSchema = new Schema({
  suspectId: { type: String, required: true }, name: { type: String, required: true }, age: Number,
  occupation: String, relationship: String, motive: String, alibi: String, statement: String, profile: String
}, { _id: false });
const evidenceSchema = new Schema({
  evidenceId: { type: String, required: true }, type: { type: String, required: true }, title: { type: String, required: true },
  description: { type: String, required: true }, timestamp: String, content: Schema.Types.Mixed,
  relatedSuspectIds: [String], clueLevel: String, relevance: String, clue: String
}, { _id: false });
const mysterySchema = new Schema({
  caseId: { type: String, unique: true, index: true, required: true }, caseTitle: { type: String, required: true },
  scenario: { type: String, required: true }, caseDescription: String, difficulty: String,
  status: { type: String, enum: ['GENERATING', 'ACTIVE', 'COMPLETED', 'FAILED'], default: 'ACTIVE' },
  incident: { type: Schema.Types.Mixed, default: {} }, suspects: [suspectSchema], timeline: [Schema.Types.Mixed], evidence: [evidenceSchema],
  culpritId: { type: String, required: true, select: false }, solution: { type: Schema.Types.Mixed, required: true, select: false },
  playerProgress: { examinedEvidenceIds: [String], notes: { type: String, default: '' }, selectedSuspectId: String,
    isSubmitted: { type: Boolean, default: false }, isCorrect: Boolean, completedAt: Date }
}, { timestamps: true });

export default mongoose.model('Mystery', mysterySchema);

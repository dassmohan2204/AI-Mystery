import Mystery from '../models/Mystery.js';
import { createMystery, publicMystery } from '../services/mystery.service.js';
export async function create(req, res) {
  const { scenario, difficulty = 'MEDIUM', suspectCount = 4 } = req.body || {};
  if (typeof scenario !== 'string' || scenario.trim().length < 30 || scenario.trim().length > 2000) return res.status(400).json({ success: false, message: 'Scenario must be between 30 and 2,000 characters.' });
  if (!['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) return res.status(400).json({ success: false, message: 'Choose a valid difficulty.' });
  if (!Number.isInteger(suspectCount) || suspectCount < 3 || suspectCount > 6) return res.status(400).json({ success: false, message: 'Choose between 3 and 6 suspects.' });
  res.status(201).json({ success: true, data: await createMystery({ scenario: scenario.trim(), difficulty, suspectCount }) });
}
export async function get(req, res) {
  const mystery = await Mystery.findOne({ caseId: req.params.caseId });
  if (!mystery) return res.status(404).json({ success: false, message: 'Case not found.' });
  res.json({ success: true, data: publicMystery(mystery) });
}
export async function saveProgress(req, res) {
  const mystery = await Mystery.findOne({ caseId: req.params.caseId });
  if (!mystery) return res.status(404).json({ success: false, message: 'Case not found.' });
  if (mystery.status !== 'ACTIVE') return res.status(409).json({ success: false, message: 'This case is already closed.' });
  const { examinedEvidenceIds, notes } = req.body || {};
  if (examinedEvidenceIds !== undefined && (!Array.isArray(examinedEvidenceIds) || examinedEvidenceIds.some(x => !mystery.evidence.some(e => e.evidenceId === x)))) return res.status(400).json({ success: false, message: 'Invalid evidence progress.' });
  if (notes !== undefined && (typeof notes !== 'string' || notes.length > 10000)) return res.status(400).json({ success: false, message: 'Notes must be under 10,000 characters.' });
  if (examinedEvidenceIds) mystery.playerProgress.examinedEvidenceIds = [...new Set(examinedEvidenceIds)];
  if (notes !== undefined) mystery.playerProgress.notes = notes;
  await mystery.save(); res.json({ success: true, data: mystery.playerProgress });
}
export async function accuse(req, res) {
  const mystery = await Mystery.findOne({ caseId: req.params.caseId }).select('+culpritId');
  if (!mystery) return res.status(404).json({ success: false, message: 'Case not found.' });
  if (mystery.status !== 'ACTIVE') return res.status(409).json({ success: false, message: 'An accusation has already been submitted.' });
  const { suspectId } = req.body || {};
  if (!mystery.suspects.some(s => s.suspectId === suspectId)) return res.status(400).json({ success: false, message: 'Select a suspect from this case.' });
  const isCorrect = suspectId === mystery.culpritId;
  const completed = await Mystery.findOneAndUpdate(
    { caseId: req.params.caseId, status: 'ACTIVE' },
    { $set: { status: 'COMPLETED', 'playerProgress.selectedSuspectId': suspectId, 'playerProgress.isCorrect': isCorrect, 'playerProgress.isSubmitted': true, 'playerProgress.completedAt': new Date() } },
    { new: true, runValidators: true }
  );
  if (!completed) return res.status(409).json({ success: false, message: 'An accusation has already been submitted.' });
  res.json({ success: true, data: { isCorrect, status: 'COMPLETED' } });
}
export async function solution(req, res) {
  const mystery = await Mystery.findOne({ caseId: req.params.caseId }).select('+culpritId +solution');
  if (!mystery) return res.status(404).json({ success: false, message: 'Case not found.' });
  if (mystery.status !== 'COMPLETED') return res.status(403).json({ success: false, message: 'Submit your final accusation to reveal the solution.' });
  res.json({ success: true, data: { culpritId: mystery.culpritId, solution: mystery.solution, selectedSuspectId: mystery.playerProgress.selectedSuspectId, isCorrect: mystery.playerProgress.isCorrect } });
}

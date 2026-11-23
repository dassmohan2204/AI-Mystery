import Mystery from '../models/Mystery.js';
import { generateMystery } from './groq.service.js';

const id = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
export function validateMystery(data, expectedCount) {
  if (!data || !data.caseTitle || !Array.isArray(data.suspects) || !Array.isArray(data.evidence) || !Array.isArray(data.timeline) || !data.solution) throw new Error('The generated case is missing required sections. Try generating it again.');
  if (data.suspects.length !== expectedCount || data.suspects.length < 3 || data.suspects.length > 6) throw new Error('The generated case has an invalid suspect count. Try again.');
  const suspects = new Set(data.suspects.map(s => s.suspectId));
  if (suspects.size !== data.suspects.length || !suspects.has(data.culpritId) || data.solution.culpritId !== data.culpritId) throw new Error('The generated case has inconsistent suspect identities. Try again.');
  for (const type of ['WHATSAPP', 'PHOTO', 'CCTV']) if (!data.evidence.some(e => e.type === type)) throw new Error(`Generated case is missing ${type} evidence. Try again.`);
  if (data.evidence.filter(e => e.type === 'WITNESS').length < 2 || !data.evidence.some(e => ['DOCUMENT', 'OTHER'].includes(e.type))) throw new Error('The generated case is missing required evidence. Try again.');
  for (const item of data.evidence) if (!item.evidenceId || !item.title || !item.description || !Array.isArray(item.relatedSuspectIds)) throw new Error('The generated case includes invalid evidence. Try again.');
  if (!data.solution.explanation || !data.solution.motive) throw new Error('The generated solution is incomplete. Try again.');
  return data;
}
export const publicMystery = (m) => ({
  caseId: m.caseId, caseTitle: m.caseTitle, scenario: m.scenario, caseDescription: m.caseDescription,
  difficulty: m.difficulty, status: m.status, incident: m.incident, suspects: m.suspects,
  timeline: m.timeline,
  evidence: m.evidence.map(({ evidenceId, type, title, description, timestamp, content, relatedSuspectIds, clueLevel }) => ({
    evidenceId, type, title, description, timestamp, content, relatedSuspectIds, clueLevel
  })),
  playerProgress: m.playerProgress, createdAt: m.createdAt
});

export async function createMystery(input) {
  let generated;
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      generated = validateMystery(await generateMystery(input), input.suspectCount);
      break;
    } catch (error) {
      lastError = error;
      if (error.status || attempt === 1) throw error;
    }
  }
  if (!generated) throw lastError;
  const mystery = await Mystery.create({ ...generated, caseId: id('CASE'), scenario: input.scenario, difficulty: input.difficulty, status: 'ACTIVE' });
  return publicMystery(mystery);
}

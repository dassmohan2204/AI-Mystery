import { mysteryPrompt } from '../prompts/mysteryGenerator.prompt.js';

const retryableStatuses = new Set([408, 429, 500, 502, 503, 504]);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function requestCompletion(prompt, model) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You create logically consistent fictional detective cases. Return only a JSON object.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 6000
    })
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error?.message || `Groq request failed with HTTP ${response.status}.`);
    error.status = response.status;
    const retryAfter = Number(response.headers.get('retry-after'));
    if (Number.isFinite(retryAfter) && retryAfter > 0) error.retryAfterMs = retryAfter * 1000;
    throw error;
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('Groq returned an empty response. Please try again.');
  try { return JSON.parse(content); }
  catch { throw new Error('The AI returned invalid JSON. Please try again.'); }
}

export async function generateMystery(input) {
  if (!process.env.GROQ_API_KEY) {
    const error = new Error('Add GROQ_API_KEY to backend/.env before generating a case.');
    error.status = 503;
    throw error;
  }

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
  const prompt = mysteryPrompt(input);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try { return await requestCompletion(prompt, model); }
    catch (error) {
      if (error.status === 429 && error.retryAfterMs > 10000) {
        const limited = new Error('Groq’s rate limit was reached. Wait for the limit to reset, then try again.');
        limited.status = 429;
        throw limited;
      }
      if (!retryableStatuses.has(error.status) || attempt === 2) {
        if (retryableStatuses.has(error.status)) {
          const temporary = new Error('Groq is temporarily busy or its free-tier limit was reached. Wait a little and try again.');
          temporary.status = 503;
          throw temporary;
        }
        if (error.status === 401) {
          const invalidKey = new Error('Groq rejected the API key. Check GROQ_API_KEY in backend/.env.');
          invalidKey.status = 401;
          throw invalidKey;
        }
        if (error.status) error.status = error.status >= 400 && error.status < 500 ? error.status : 502;
        throw error;
      }
      await wait(Math.min(error.retryAfterMs || 1500 * (attempt + 1), 5000));
    }
  }
}

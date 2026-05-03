import mpsSample from '../data/mps_sample.json';
import mlasIndex from '../data/mlas_index.json';

const normalize = (value = '') => String(value).toLowerCase().trim().replace(/\s+/g, '_');
const includesText = (value = '', query = '') => String(value).toLowerCase().includes(String(query).toLowerCase().trim());

const stateMapping = {
  chhattisgarh: 'chattisgarh',
  dadra_and_nagar_haveli_and_daman_and_diu: 'dadra_and_nagar_haveli',
  andaman_and_nicobar_islands: 'andaman_and_nicobar',
};

function filterCandidates(list, { type, state, constituency }) {
  let results = [...list];

  if (state) {
    results = results.filter((candidate) => {
      const candidateState = candidate.state_or_ut || candidate.state || state;
      return normalize(candidateState) === normalize(state);
    });
  }

  if (constituency) {
    const terms = constituency.toLowerCase().trim().split(/\s+/);
    results = results.filter((candidate) =>
      terms.every((term) => includesText(candidate.constituency, term)),
    );
  }

  return results.map((candidate) => ({
    ...candidate,
    state_or_ut: candidate.state_or_ut || candidate.state || state,
    election_type: type,
  }));
}

function getLocalCandidates(params) {
  const source = params.type === 'mlas' ? mlasIndex.mlas || [] : mpsSample.mps || [];
  return filterCandidates(source, params);
}

export async function fetchCandidates(params) {
  const { type, state, constituency, year = '2024' } = params;
  const formatted = stateMapping[normalize(state)] || normalize(state);

  const urls = [];
  if (type === 'mps') {
    if (formatted) urls.push(`https://nish.space/my_neta/mps/${year}/${formatted}`);
    urls.push(`https://nish.space/my_neta/mps/${year}`);
  } else if (type === 'mlas' && formatted) {
    urls.push(`https://nish.space/my_neta/mlas/${formatted}`);
  }

  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) continue;

      const raw = await response.json();
      const list = raw.mps || raw.mlas || (Array.isArray(raw) ? raw : Object.values(raw).find(Array.isArray)) || [];
      const filtered = filterCandidates(list, params);
      if (filtered.length) return filtered;
    } catch {
      // Browser CORS/network failures fall through to bundled data.
    }
  }

  return getLocalCandidates({ type, state, constituency });
}

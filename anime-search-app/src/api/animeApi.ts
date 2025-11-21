import type { AnimeSearchResponse, AnimeDetail } from '../types/anime'

export const searchAnime = async (
  query: string,
  page: number,
  signal?: AbortSignal
): Promise<AnimeSearchResponse> => {
  const q = encodeURIComponent(query || '')
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&page=${page}&limit=20`, { signal })
  if (!res.ok) throw new Error(`Search failed: ${res.status}`)
  return res.json()
}

export const getAnimeDetail = async (id: string, signal?: AbortSignal): Promise<{ data: AnimeDetail }> => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { signal })
  if (!res.ok) throw new Error(`Detail fetch failed: ${res.status}`)
  return res.json()
}

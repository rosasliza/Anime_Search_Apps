export interface AnimeSummary {
  mal_id: number
  title: string
  images: { jpg?: { image_url?: string } }
  synopsis?: string
  type?: string
  episodes?: number | null
  score?: number | null
}

export interface AnimeSearchResponse {
  data: AnimeSummary[]
  pagination?: {
    last_visible_page?: number
    has_next_page?: boolean
    current_page?: number
    items?: { total?: number }
  }
}

export interface AnimeDetail {
  mal_id: number
  title: string
  synopsis?: string
  images: { jpg?: { image_url?: string } }
  type?: string
  episodes?: number | null
  score?: number | null
  genres?: { name: string }[]
  trailer?: { url?: string }
}

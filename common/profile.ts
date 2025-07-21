import type { Rating } from './rating'

export const enum UserRole {
  Player = 'player',
  Creator = 'creator',
  Bot = 'bot',
}

export type Profile = {
  id: string
  nickname: string | null
  summonerIcon: number
  role: UserRole
  rating: Rating
  stats: {
    wins: number
    draws: number
    defeats: number
  }
}

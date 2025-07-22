import { League } from './rating'

export type Choice = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const enum Team {
  Order = 0,
  Chaos = 1,
}

export interface MatchDtoTeam {
  id: string
  nickname: string
  league: League
  division: number | null
  lpGain: number
  matchScore: number
}

export const enum MatchEventType {
  Choice = 0,
  Forfeit = 1,
  Timeout = 2,
  Message = 3,
}

type BaseMatchEvent = {
  event: MatchEventType
  side: Team
  time: number
}

export type MatchDtoEvent = BaseMatchEvent &
  (
    | {
        event: MatchEventType.Choice
        choice: Choice
      }
    | {
        event: MatchEventType.Message
        message: string
      }
    | {
        event: MatchEventType.Timeout | MatchEventType.Forfeit
      }
  )

export interface MatchDto {
  id: string
  teams: Record<Team, MatchDtoTeam>
  events: MatchDtoEvent[]
  winner: Team | null
  time: number
}

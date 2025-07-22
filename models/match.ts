import type { Choice, GameMode, League, MatchEventType, Team } from '../common'
import type { WithId } from '../firebase'

export interface MatchModelTeam {
  uid: string
  name: string
  league: League
  division: number | null
  score: number
  lp_gain: number
}

type BaseMatchEvent = {
  event: MatchEventType
  side: Team
  time: number
}

export type MatchModelEvent = BaseMatchEvent &
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

/** Represents a match registry in the History. */
export interface MatchModel extends WithId {
  [Team.Order]: MatchModelTeam // TODO: put inside a teams object
  [Team.Chaos]: MatchModelTeam
  events: MatchModelEvent[]
  winner: Team | null
  game_mode: GameMode
  timestamp: Date
}

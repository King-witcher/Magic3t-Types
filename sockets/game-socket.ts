import type { Choice, Profile, Rating, Team } from '../common'

export const enum ClientMatchEvents {
  GetAssignments = 'get-assignments',
  GetState = 'get-state',
  Pick = 'pick',
  Message = 'message',
  Surrender = 'surrender',
}

export const enum ServerMatchEvents {
  Message = 'message',
  /// Sends the player assignments
  Assignments = 'assignments',
  /// Send the match state report
  StateReport = 'state-report',
  /// Send the match result report
  MatchReport = 'match-report',
}

export type MessageData = {
  message: string
  sender: string
  time: number
}

export type AssignmentsData = {
  [Team.Order]: {
    profile: Profile
  }
  [Team.Chaos]: {
    profile: Profile
  }
}

export type MatchResults = {
  matchId: string
  winner: Team | null
  [Team.Order]: {
    score: number
    lpGain: number
    newRating: Rating
  }
  [Team.Chaos]: {
    score: number
    lpGain: number
    newRating: Rating
  }
}

export type MatchState = {
  [Team.Order]: {
    timeLeft: number
    choices: Choice[]
    surrender: boolean
  }
  [Team.Chaos]: {
    timeLeft: number
    choices: Choice[]
    surrender: boolean
  }
  turn: Team | null
  finished: boolean
  pending: false
}

export interface GameServerEventsMap {
  [ServerMatchEvents.Message](message: MessageData): void
  [ServerMatchEvents.Assignments](assignments: AssignmentsData): void
  [ServerMatchEvents.StateReport](state: MatchState): void
  [ServerMatchEvents.MatchReport](results: MatchResults): void
}

export interface GameClientEventsMap {
  [ClientMatchEvents.GetAssignments](): void
  [ClientMatchEvents.GetState](): void
  [ClientMatchEvents.Message](message: string): void
  [ClientMatchEvents.Pick](choice: Choice): void
  [ClientMatchEvents.Surrender](): void
}

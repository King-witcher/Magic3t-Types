import type { Choice, Profile, Rating, Team } from '../common'

export const enum MatchClientEvents {
  GetAssignments = 'get-assignments',
  GetState = 'get-state',
  Pick = 'pick',
  Message = 'message',
  Surrender = 'surrender',
}

export const enum MatchServerEvents {
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
  [MatchServerEvents.Message](message: MessageData): void
  [MatchServerEvents.Assignments](assignments: AssignmentsData): void
  [MatchServerEvents.StateReport](state: MatchState): void
  [MatchServerEvents.MatchReport](results: MatchResults): void
}

export interface GameClientEventsMap {
  [MatchClientEvents.GetAssignments](): void
  [MatchClientEvents.GetState](): void
  [MatchClientEvents.Message](message: string): void
  [MatchClientEvents.Pick](choice: Choice): void
  [MatchClientEvents.Surrender](): void
}

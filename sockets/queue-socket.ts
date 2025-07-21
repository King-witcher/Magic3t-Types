export const enum ServerQueueEvents {
  QueueRejected = 'queueRejected',
  QueueAcepted = 'queueAcepted',
  QueueModes = 'queueModes',
  MatchFound = 'matchFound',
  UpdateUserCount = 'updateUserCount',
}

export const enum ClientQueueEvents {
  Interact = 'interact',
  Fair = 'fair',
  Bot0 = 'bot-0',
  Bot1 = 'bot-1',
  Bot2 = 'bot-2',
  Bot3 = 'bot-3',
  Casual = 'casual',
  Ranked = 'ranked',
  Dequeue = 'dequeue',
}

export type UserCountData = {
  connected: number
  casual: { queue: number; inGame: number }
  ranked: { queue: number; inGame: number }
}

export interface QueueServerEventsMap {
  [ServerQueueEvents.QueueRejected](reason?: string): void
  [ServerQueueEvents.QueueAcepted](payload: { mode: 'casual' | 'ranked' }): void
  [ServerQueueEvents.QueueModes](payload: {
    casual: boolean
    ranked: boolean
  }): void
  [ServerQueueEvents.MatchFound](data: {
    matchId: string
    opponentId: string
  }): void
  [ServerQueueEvents.UpdateUserCount](data: UserCountData): void
}

export interface QueueClientEventsMap {
  [ClientQueueEvents.Interact](): void
  [ClientQueueEvents.Fair](): void
  [ClientQueueEvents.Bot0](): void
  [ClientQueueEvents.Bot1](): void
  [ClientQueueEvents.Bot2](): void
  [ClientQueueEvents.Bot3](): void
  [ClientQueueEvents.Casual](): void
  [ClientQueueEvents.Ranked](): void
  [ClientQueueEvents.Dequeue](): void
}

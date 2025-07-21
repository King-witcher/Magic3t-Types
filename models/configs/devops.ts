import type { WithId } from '../../firebase'

export interface DevopsConfigModel extends WithId<'devops'> {
  maintenance_mode: boolean
}

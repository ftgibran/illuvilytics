import * as migration_20250618_112920_seed_database from './20250618_112920_seed_database'

export const migrations = [
  {
    up: migration_20250618_112920_seed_database.up,
    down: migration_20250618_112920_seed_database.down,
    name: '20250618_112920_seed_database',
  },
]

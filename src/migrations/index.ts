import * as migration_20250618_021349_migration from './20250618_021349_migration'

export const migrations = [
  {
    up: migration_20250618_021349_migration.up,
    down: migration_20250618_021349_migration.down,
    name: '20250618_021349_migration',
  },
]

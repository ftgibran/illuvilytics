import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SuitFiltersProps {
  selectedType: string
  selectedTier: string
  onTypeChange: (value: string) => void
  onTierChange: (value: string) => void
}

export function SuitFilters({
  selectedType,
  selectedTier,
  onTypeChange,
  onTierChange,
}: SuitFiltersProps) {
  const types = ['all', 'Standard', 'Unique', 'Special']
  const tiers = ['all', '1', '2', '3', '4', '5']

  return (
    <div className={'flex flex-col sm:flex-row gap-4'}>
      <div className={'flex flex-col gap-1.5'}>
        <Label>Type</Label>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Select type'} />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={'flex flex-col gap-1.5'}>
        <Label>Tier</Label>
        <Select value={selectedTier} onValueChange={onTierChange}>
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Select tier'} />
          </SelectTrigger>
          <SelectContent>
            {tiers.map((tier) => (
              <SelectItem key={tier} value={tier}>
                {tier === 'all' ? 'All Tiers' : `Tier ${tier}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface WeaponFiltersProps {
  selectedClass: string
  selectedElement: string
  selectedType: string
  onClassChange: (value: string) => void
  onElementChange: (value: string) => void
  onTypeChange: (value: string) => void
}

export function WeaponFilters({
  selectedClass,
  selectedElement,
  selectedType,
  onClassChange,
  onElementChange,
  onTypeChange,
}: WeaponFiltersProps) {
  const classes = ['all', 'Fighter', 'Rogue', 'Bulwark', 'Psion', 'Empath']
  const elements = ['all', 'Water', 'Earth', 'Fire', 'Nature', 'Air']
  const types = ['all', 'Standard', 'Special', 'Unique']

  return (
    <div className={'flex flex-col sm:flex-row gap-4'}>
      <div className={'flex flex-col gap-1.5'}>
        <Label>Class</Label>
        <Select value={selectedClass} onValueChange={onClassChange}>
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Select class'} />
          </SelectTrigger>
          <SelectContent>
            {classes.map((classType) => (
              <SelectItem key={classType} value={classType}>
                {classType === 'all' ? 'All Classes' : classType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={'flex flex-col gap-1.5'}>
        <Label>Element</Label>
        <Select value={selectedElement} onValueChange={onElementChange}>
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={'Select element'} />
          </SelectTrigger>
          <SelectContent>
            {elements.map((element) => (
              <SelectItem key={element} value={element}>
                {element === 'all' ? 'All Elements' : element}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
    </div>
  )
}

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CombatUnitFiltersProps {
  selectedClass: string
  selectedElement: string
  onClassChange: (value: string) => void
  onElementChange: (value: string) => void
}

export function CombatUnitFilters({
  selectedClass,
  selectedElement,
  onClassChange,
  onElementChange,
}: CombatUnitFiltersProps) {
  const classes = ['all', 'Fighter', 'Rogue', 'Bulwark', 'Psion', 'Empath']
  const elements = ['all', 'Water', 'Earth', 'Fire', 'Nature', 'Air']

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
    </div>
  )
}

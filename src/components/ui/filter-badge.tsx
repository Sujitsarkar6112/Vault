import { Badge } from '@/components/ui/badge';

interface FilterBadgeProps {
  type: string;
  selected_type: string;
  on_select: (type: string) => void;
  label: string;
  count: number;
}

const FilterBadge = ({ type, selected_type, on_select, label, count }: FilterBadgeProps) => (
  <Badge 
    variant={selected_type === type ? 'default' : 'outline'}
    className="cursor-pointer"
    onClick={() => on_select(type)}
  >
    {label} ({count})
  </Badge>
);

export { FilterBadge };
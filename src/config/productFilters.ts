export interface FilterOption {
  name: string;
  count: number;
}

export interface ColoredFilterOption extends FilterOption {
  color: string;
}

export interface LabelFilterOption {
  label: string;
  count: number;
}

export const sidebarCategories: FilterOption[] = [
  { name: 'Milk & Drinks', count: 120 },
  { name: 'Diary & Milk', count: 143 },
  { name: 'Snack & Spice', count: 142 },
];

export const productCategories: ColoredFilterOption[] = [
  { name: 'Fruit', count: 98, color: 'bg-blue-500' },
  { name: 'Vegetable', count: 132, color: 'bg-pink-500' },
  { name: 'Meat', count: 98, color: 'bg-green-500' },
  { name: 'Drink', count: 121, color: 'bg-yellow-500' },
];

export const weightOptions: LabelFilterOption[] = [
  { label: '50g Pack', count: 152 },
  { label: '100g Pack', count: 125 },
  { label: '150g Pack', count: 98 },
];

export const tagOptions: LabelFilterOption[] = [
  { label: 'Vegetables', count: 4562 },
  { label: 'Tea Fruits', count: 98 },
  { label: 'Fruits', count: 4875 },
  { label: 'Snack & Spice', count: 1580 },
  { label: 'Milk & Drinks', count: 940 },
];

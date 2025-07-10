'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategories } from '../hooks/use-products-query';
import { filterTypes } from "@/types"


// interface filterTypes {
//   colors: string[];
//   priceRange: number[];
//   categories: string[];
// }

interface FilterSidebarProps {
  onFiltersChange?: (filters: filterTypes) => void;
}

const colors = [
  { id: 'sage', name: 'Sage', value: '#a3b2a3' },
  { id: 'coral', name: 'Coral', value: '#ff7f7f' },
  { id: 'sky', name: 'Sky', value: '#87ceeb' },
  { id: 'mint', name: 'Mint', value: '#98fb98' },
  { id: 'yellow', name: 'Yellow', value: '#ffff99' },
  { id: 'lavender', name: 'Lavender', value: '#e6e6fa' },
];

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [priceRange, setPriceRange] = useState([0, 1000] as [number, number]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Fetch categories from API
  const { data: apiCategories, isLoading: categoriesLoading } = useCategories();

  // Create categories with counts (mock counts for now)
  const categories =
    apiCategories?.map((category) => ({
      id: category.toLowerCase(),
      label: category === 'all' ? 'All' : category,
      // count: category === "all" ? 24 : Math.floor(Math.random() * 15) + 3, // Mock counts
    })) || [];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = useCallback(
    (categoryId: string, checked: boolean) => {
      let newCategories: string[];

      if (categoryId === 'all') {
        newCategories = checked ? ['all'] : [];
      } else {
        newCategories = checked
          ? [...selectedCategories.filter((id) => id !== 'all'), categoryId]
          : selectedCategories.filter((id) => id !== categoryId);

        if (newCategories.length === 0) {
          newCategories = ['all'];
        }
      }

      setSelectedCategories(newCategories);
      onFiltersChange?.({ categories: newCategories, priceRange, colors: selectedColors });
    },
    [selectedCategories, priceRange, selectedColors, onFiltersChange],
  );

  const handleColorChange = useCallback(
    (colorId: string, checked: boolean) => {
      const newColors = checked
        ? [...selectedColors, colorId]
        : selectedColors.filter((id) => id !== colorId);

      setSelectedColors(newColors);
      onFiltersChange?.({ categories: selectedCategories, priceRange, colors: newColors });
    },
    [selectedColors, selectedCategories, priceRange, onFiltersChange],
  );

  const handlePriceChange = useCallback(
    (value: [number, number]) => {
      setPriceRange(value);
      onFiltersChange?.({
        categories: selectedCategories,
        priceRange: value,
        colors: selectedColors,
      });
    },
    [selectedCategories, selectedColors, onFiltersChange],
  );
  console.log(priceRange);

  // // Initialize filters and update on change
  // useEffect(() => {
  //   onFiltersChange?.({ categories: selectedCategories, priceRange, colors: selectedColors });
  // }, [onFiltersChange, selectedCategories, priceRange, selectedColors]);

  return (
    <div className="w-full space-y-6">
      {/* Product Categories */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => toggleSection('categories')}
          className="w-full justify-between p-0 h-auto font-semibold text-gray-900 dark:text-white hover:bg-transparent dark:hover:bg-transparent"
        >
          Product Categories
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-silver" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-silver" />
          )}
        </Button>

        {expandedSections.categories && (
          <div className="space-y-3">
            {categoriesLoading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 dark:bg-night rounded animate-pulse" />
                ))}
              </div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                    className="border-gray-300 dark:border-silver/50 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:border-black dark:data-[state=checked]:border-white"
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm text-gray-700 dark:text-silver cursor-pointer flex-1"
                  >
                    {category.label}
                  </label>
                  {/* <span className="text-xs text-gray-500 dark:text-silver/70">({category.count})</span> */}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => toggleSection('price')}
          className="w-full justify-between p-0 h-auto font-semibold text-gray-900 dark:text-white hover:bg-transparent dark:hover:bg-transparent"
        >
          Filter By Price
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-silver" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-silver" />
          )}
        </Button>

        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              min={0}
              step={50}
              className="w-full [&_[role=slider]]:bg-black dark:[&_[role=slider]]:bg-white [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-silver">
              <span>Price: ${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => toggleSection('colors')}
          className="w-full justify-between p-0 h-auto font-semibold text-gray-900 dark:text-white hover:bg-transparent dark:hover:bg-transparent"
        >
          Select Colours
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-silver" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-silver" />
          )}
        </Button>

        {expandedSections.colors && (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.id, !selectedColors.includes(color.id))}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  selectedColors.includes(color.id)
                    ? 'border-gray-400 dark:border-silver scale-110'
                    : 'border-gray-200 dark:border-silver/30 hover:border-gray-300 dark:hover:border-silver/50',
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

interface Option {
  name: string;
  values: string[];
  position: number;
}

interface Variant {
  id: number;
  title: string;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  price: string;
  compare_at_price: string | null;
  sku?: string | null;
}

interface VariantPickerProps {
  options: Option[];
  variants: Variant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
  layout?: 'horizontal' | 'vertical';
}

export function VariantPicker({
  options,
  variants,
  selectedOptions,
  onOptionChange,
  layout = 'vertical',
}: VariantPickerProps) {
  const getIsOptionAvailable = (optionName: string, optionValue: string) => {
    return variants.some((variant) => {
      if (variant.title.includes(optionValue)) {
        const otherOptions = options.filter((opt) => opt.name !== optionName);
        return otherOptions.every((opt) => {
          const selectedValue = selectedOptions[opt.name];
          if (!selectedValue) return true;
          const variantValue = variant.title.split(' / ')[opt.position - 1];
          return variantValue === selectedValue;
        });
      }
      return false;
    });
  };

  const getSelectedVariant = () => {
    return variants.find((variant) => {
      return options.every((option) => {
        const selectedValue = selectedOptions[option.name];
        if (!selectedValue) return true;
        const variantValue = variant.title.split(' / ')[option.position - 1];
        return variantValue === selectedValue;
      });
    });
  };

  const selectedVariant = getSelectedVariant();

  return (
    <div className={cn('flex flex-col gap-6', layout === 'horizontal' && 'flex-row flex-wrap gap-8')}>
      {options.map((option) => (
        <div key={option.name}>
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-sm font-medium">{option.name}</span>
            {selectedOptions[option.name] && (
              <span className="text-sm text-muted">: {selectedOptions[option.name]}</span>
            )}
          </div>

          {/* Color Swatches */}
          {option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour' ? (
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isAvailable = getIsOptionAvailable(option.name, value);
                const isSelected = selectedOptions[option.name] === value;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!isAvailable}
                    className={cn(
                      'group relative h-10 w-10 rounded-full border-2 transition-all',
                      isSelected
                        ? 'border-foreground ring-2 ring-foreground ring-offset-2'
                        : 'border-border hover:border-foreground/50',
                      !isAvailable && 'cursor-not-allowed opacity-50'
                    )}
                    onClick={() => onOptionChange(option.name, value)}
                    title={value}
                  >
                    <span
                      className="absolute inset-1 rounded-full"
                      style={{
                        backgroundColor: getColorHex(value),
                      }}
                    />
                    {isSelected && (
                      <svg className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {!isAvailable && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-px w-full rotate-45 bg-muted" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Size / Option Buttons */
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isAvailable = getIsOptionAvailable(option.name, value);
                const isSelected = selectedOptions[option.name] === value;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!isAvailable}
                    className={cn(
                      'min-w-[48px] rounded-md border px-4 py-2 text-sm font-medium transition-all',
                      isSelected
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground',
                      !isAvailable && 'cursor-not-allowed border-border text-muted line-through'
                    )}
                    onClick={() => onOptionChange(option.name, value)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Selected Variant Info */}
      {selectedVariant && (
        <div className="flex items-center gap-4 text-sm">
          {selectedVariant.available ? (
            <span className="flex items-center gap-1.5 text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-muted">
              <span className="h-2 w-2 rounded-full bg-muted" />
              Sold Out
            </span>
          )}
          {selectedVariant.sku && (
            <span className="text-muted">SKU: {selectedVariant.sku}</span>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to get color hex from name
function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#DC2626',
    blue: '#2563EB',
    green: '#16A34A',
    yellow: '#EAB308',
    orange: '#EA580C',
    purple: '#9333EA',
    pink: '#EC4899',
    gray: '#6B7280',
    grey: '#6B7280',
    navy: '#1E3A5F',
    beige: '#F5F5DC',
    brown: '#8B4513',
    cream: '#FFFDD0',
    khaki: '#C3B091',
    maroon: '#800000',
    olive: '#808000',
    tan: '#D2B48C',
    charcoal: '#36454F',
    ivory: '#FFFFF0',
    lavender: '#E6E6FA',
    mint: '#98FB98',
    peach: '#FFDAB9',
    rose: '#FF007F',
    sand: '#C2B280',
    teal: '#008080',
    coral: '#FF7F50',
    champagne: '#F7E7CE',
    blush: '#DE5D83',
    mauve: '#E0B0FF',
    taupe: '#483C32',
    burgundy: '#800020',
    heather: '#3B5998',
    indigo: '#4B0082',
    jade: '#00A86B',
    moss: '#8A9A5B',
    mustard: '#FFDB58',
    nude: '#E3BC9A',
    pewter: '#96A8A1',
    plum: '#8E4585',
    rust: '#B7410E',
    sage: '#BCB88A',
    slate: '#708090',
    steel: '#71797E',
    stone: '#928E85',
    wheat: '#F5DEB3',
  };

  return colors[colorName.toLowerCase()] || '#9CA3AF';
}

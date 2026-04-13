export type InputSize = 'sm' | 'md' | 'lg';
export type InputWidth = 'sm' | 'md' | 'lg' | 'full';

export type BaseInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  width?: InputWidth;
};

export type SearchInputProps = BaseInputProps & {
  onSearch?: (value: string) => void;
};

export type PhoneInputProps = BaseInputProps & {
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
};

export type SelectInputProps = BaseInputProps & {
  options: Array<{ value: string; label: string }>;
  onSelect?: (value: string) => void;
};

export type TextAreaProps = BaseInputProps & {
  rows?: number;
  maxLength?: number;
};

export type DatePickerProps = BaseInputProps & {
  onDateSelect?: (date: Date) => void;
  selectedColor?: string;
  minDate?: Date;
  maxDate?: Date;
};

export type TimePickerProps = BaseInputProps & {
  onTimeSelect?: (time: string) => void;
  format?: '12h' | '24h';
};

export type TextInputProps = BaseInputProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  maxLength?: number;
};

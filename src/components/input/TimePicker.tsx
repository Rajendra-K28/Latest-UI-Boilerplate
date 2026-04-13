import { useState, useRef, useEffect } from 'react';
import type { TimePickerProps } from './input.types';
import { Clock } from '../icons/Clock';
import './input.css';

export function TimePicker({
  placeholder = 'Select a time',
  value,
  onChange,
  onTimeSelect,
  disabled = false,
  width = 'sm',
  format = '12h',
  ...props
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleTimeSelect = (hour: number, minute: number, period?: 'AM' | 'PM') => {
    let hour24 = hour;
    
    if (format === '12h' && period) {
      if (period === 'PM' && hour !== 12) {
        hour24 = hour + 12;
      } else if (period === 'AM' && hour === 12) {
        hour24 = 0;
      }
    }

    const timeString = `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    onChange?.(timeString);
    onTimeSelect?.(timeString);
    setIsOpen(false);
  };

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    if (format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    if (!value) return { hour: 12, minute: 0, period: 'PM' as const };
    
    const [hours, minutes] = value.split(':').map(Number);
    
    if (format === '12h') {
      const period = hours >= 12 ? 'PM' as const : 'AM' as const;
      const hour12 = hours % 12 || 12;
      return { hour: hour12, minute: minutes, period };
    }
    
    return { hour: hours, minute: minutes, period: 'AM' as const };
  };

  const currentTime = getCurrentTime();
  const [selectedHour, setSelectedHour] = useState(currentTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(currentTime.minute);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(currentTime.period);

  const hours = format === '12h' 
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);
  
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div 
      ref={wrapperRef}
      className={`time-picker-wrapper input-width-${width}`}
      {...props}
    >
      <button
        type="button"
        className={`time-picker-input ${isOpen ? 'time-picker-input-open' : ''} ${disabled ? 'time-picker-input-disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className={value ? 'time-picker-value' : 'time-picker-placeholder'}>
          {value ? formatDisplayTime(value) : placeholder}
        </span>
        <span className="time-picker-icon">
          <Clock />
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="time-dropdown">
          <div className="time-dropdown-header">Select Time</div>
          <div className="time-dropdown-content">
            {/* Hours */}
            <div className="time-column" ref={hourScrollRef}>
              <div className="time-column-label">Hour</div>
              <div className="time-options">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    className={`time-option ${selectedHour === hour ? 'time-option-selected' : ''}`}
                    onClick={() => setSelectedHour(hour)}
                  >
                    {format === '24h' ? hour.toString().padStart(2, '0') : hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="time-column" ref={minuteScrollRef}>
              <div className="time-column-label">Minute</div>
              <div className="time-options">
                {minutes.filter(m => m % 5 === 0).map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    className={`time-option ${selectedMinute === minute ? 'time-option-selected' : ''}`}
                    onClick={() => setSelectedMinute(minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM for 12h format */}
            {format === '12h' && (
              <div className="time-column">
                <div className="time-column-label">Period</div>
                <div className="time-options">
                  <button
                    type="button"
                    className={`time-option ${selectedPeriod === 'AM' ? 'time-option-selected' : ''}`}
                    onClick={() => setSelectedPeriod('AM')}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    className={`time-option ${selectedPeriod === 'PM' ? 'time-option-selected' : ''}`}
                    onClick={() => setSelectedPeriod('PM')}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="time-dropdown-footer">
            <button
              type="button"
              className="time-confirm-button"
              onClick={() => handleTimeSelect(selectedHour, selectedMinute, selectedPeriod)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect } from 'react';
import type { SideDrawerProps } from './SideDrawer.types';
import { sideDrawerStyles } from './SideDrawer.styles';
import { Button } from '../button/button';
import { Close } from '../icons/Close';

export function SideDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  primaryButtonLabel = 'Continue',
  secondaryButtonLabel = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  width = '60vw',
  overlayBackground,
  zIndexBase = 1000,
  primaryButtonDisabled = false,
  primaryButtonVariant = 'primary',
  footerNote,
  showPrimaryButton = true,
  showSecondaryButton = true,
  buttonAlignment = 'space-between',
  secondaryButtonStyle,
  primaryButtonStyle,
  headerRightContent,
}: SideDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onClose();
    }
  };
  
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div
        style={sideDrawerStyles.overlay(isOpen, overlayBackground, zIndexBase)}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div style={sideDrawerStyles.drawer(isOpen, width, zIndexBase)}>
        {/* Header */}
        <div style={sideDrawerStyles.header}>
          <div style={sideDrawerStyles.headerLeft}>
            {icon && (
              <div style={sideDrawerStyles.iconWrapper}>
                {icon}
              </div>
            )}
            <div style={sideDrawerStyles.headerTextWrapper}>
              <h2 style={sideDrawerStyles.title}>{title}</h2>
              {subtitle && (
                <p style={sideDrawerStyles.subtitle}>{subtitle}</p>
              )}
            </div>
          </div>
          {headerRightContent && <div style={{ display: 'flex', alignItems: 'center' }}>{headerRightContent}</div>}
          <button
            type="button"
            style={sideDrawerStyles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F1F3F9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Close />
          </button>
        </div>
        
        {/* Body */}
        <div style={sideDrawerStyles.body}>
          {children}
        </div>
        
        {/* Footer */}
        <div style={sideDrawerStyles.footer}>
          {footerNote && (
            <div
              style={{
                flex: 1,
                fontSize: '12px',
                color: '#596881',
              }}
            >
              {footerNote}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: buttonAlignment === 'right' ? 'flex-end' : 'space-between',
              gap: 12,
              width: footerNote ? 'auto' : '100%',
              flex: footerNote ? undefined : 1,
            }}
          >
            {showSecondaryButton ? (
              <div>
                <Button
                  label={secondaryButtonLabel}
                  variant="secondary"
                  onClick={handleSecondaryClick}
                  style={{
                    cursor: 'pointer',
                    color: '#344054',
                    ...(secondaryButtonStyle || {}),
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            {showPrimaryButton && (
              <div>
                <Button
                  label={primaryButtonLabel}
                  variant={primaryButtonVariant}
                  onClick={handlePrimaryClick}
                  disabled={primaryButtonDisabled}
                  style={{
                    cursor: primaryButtonDisabled ? 'not-allowed' : 'pointer',
                    ...(primaryButtonStyle || {}),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

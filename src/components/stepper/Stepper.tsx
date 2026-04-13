import { colors, spacing } from '../../design-system/tokens';

type Step = {
  id: number;
  label: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
};

const stepperStyles = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 0,
    padding: `0`,
    borderBottom: `1px solid ${colors.stroke.neutral.light}`,
    marginBottom: spacing[6],
  },
  step: (isActive: boolean, isCompleted: boolean, isClickable: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[3]} ${spacing[4]}`,
    paddingTop: spacing[2],
    fontSize: '14px',
    fontWeight: '500' as const,
    color: isActive ? colors.primary[500] : isCompleted ? colors.text.neutral.main : colors.text.neutral.soft,
    borderTop: isActive ? `3px solid ${colors.primary[500]}` : '3px solid transparent',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    whiteSpace: 'nowrap' as const,
    cursor: isClickable ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    background: 'transparent',
    outline: 'none',
  }),
  stepNumber: (isActive: boolean) => ({
    fontWeight: '600' as const,
    color: isActive ? colors.primary[500] : 'inherit',
  }),
};

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const handleStepClick = (stepId: number) => {
    if (onStepClick) {
      onStepClick(stepId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, stepId: number) => {
    if ((e.key === 'Enter' || e.key === ' ') && onStepClick) {
      e.preventDefault();
      onStepClick(stepId);
    }
  };

  return (
    <div style={stepperStyles.container}>
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const isClickable = !!onStepClick;
        
        return (
          <button
            key={step.id}
            type="button"
            style={stepperStyles.step(isActive, isCompleted, isClickable)}
            onClick={() => handleStepClick(step.id)}
            onKeyDown={(e) => handleKeyDown(e, step.id)}
            disabled={!isClickable}
            onMouseEnter={(e) => {
              if (isClickable && !isActive) {
                e.currentTarget.style.background = colors.bg.surface.gray;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label={`Step ${step.id}: ${step.label}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span style={stepperStyles.stepNumber(isActive)}>{step.id}.</span>
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}

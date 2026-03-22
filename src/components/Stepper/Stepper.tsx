import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { StepperProps } from './Stepper.types';

export function Stepper({ steps, activeIndex, plain, className, showCompleted = true }: StepperProps) {
  const ent = useAuroraSurface(plain);
  return (
    <nav aria-label="Progress" className={cn('w-full overflow-x-auto', className)}>
      <ol className="flex items-center w-full min-w-min">
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          const isDone = showCompleted && i < activeIndex;
          const isLast = i === steps.length - 1;
          return (
            <li key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center min-w-0 max-w-full">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    isActive && (ent.isAurora ? ent.stepperCircleActive : 'bg-primary-600 text-white shadow'),
                    !isActive &&
                      isDone &&
                      (ent.isAurora ? ent.stepperCircleDone : 'border-2 border-primary-500 text-primary-600'),
                    !isActive &&
                      !isDone &&
                      (ent.isAurora ? ent.stepperCircle : 'border-2 border-gray-300 text-gray-500 dark:border-gray-600')
                  )}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <div className={cn('mt-2 text-center px-1 w-full', ent.isAurora && ent.stepperLabel)}>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{step.title}</div>
                  {step.description != null && (
                    <div
                      className={cn(
                        'mt-0.5 text-xs truncate',
                        ent.isAurora ? ent.stepperDescription : 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2 min-w-[0.75rem] rounded-full shrink transition-colors',
                    ent.isAurora ? ent.stepperConnector : 'bg-gray-200 dark:bg-gray-700',
                    i < activeIndex && 'bg-primary-500/85 dark:bg-primary-600'
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

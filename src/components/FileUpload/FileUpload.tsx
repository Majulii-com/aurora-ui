import { useId, useRef } from 'react';
import { cn } from '../../utils';
import { useAuroraSurface } from '../../theme/useAuroraSurface';
import type { FileUploadProps } from './FileUpload.types';

export function FileUpload({
  onFilesChange,
  accept,
  multiple,
  disabled,
  buttonLabel = 'Browse files',
  description = 'or drag files onto this area',
  title = 'Upload',
  plain,
  className,
  inputId: inputIdProp,
}: FileUploadProps) {
  const ent = useAuroraSurface(plain);
  const genId = useId();
  const inputId = inputIdProp ?? `file-upload-${genId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-2 px-6 py-10 text-center cursor-pointer select-none',
        ent.isAurora ? ent.fileUpload : 'rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        onFilesChange(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => onFilesChange(e.target.files)}
        aria-label={typeof title === 'string' ? title : 'File upload'}
      />
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      <span className="text-sm font-medium text-primary-600 dark:text-teal-400">{buttonLabel}</span>
    </div>
  );
}

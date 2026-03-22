import type { ReactNode } from 'react';
import type { AuroraSurfaceProps } from '../../types/auroraSurface';

export interface FileUploadProps extends AuroraSurfaceProps {
  /** Called with the selected `FileList` (may be empty) */
  onFilesChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Text on the action button */
  buttonLabel?: ReactNode;
  /** Supporting line under the title */
  description?: ReactNode;
  /** Main line in the drop zone */
  title?: ReactNode;
  className?: string;
  inputId?: string;
}

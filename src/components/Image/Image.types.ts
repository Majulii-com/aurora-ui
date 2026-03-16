export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback content or src when image fails to load */
  fallback?: React.ReactNode;
  /** Aspect ratio (e.g. '16/9', '1', '4/3') */
  aspectRatio?: string;
  /** Rounded corners: none, sm, md, lg, full */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

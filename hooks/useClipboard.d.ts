export interface UseClipboardReturn {
    value: string;
    copy: (text?: string) => Promise<boolean>;
    copied: boolean;
}
export declare function useClipboard(initialValue?: string): UseClipboardReturn;

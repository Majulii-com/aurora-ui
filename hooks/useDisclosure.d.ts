export interface UseDisclosureReturn {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
export declare function useDisclosure(defaultOpen?: boolean): UseDisclosureReturn;

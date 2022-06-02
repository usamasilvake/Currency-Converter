export interface DropdownInterface {
    initial: string;
    options: string[];
    onChange: (arg: string) => void;
}
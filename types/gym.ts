export interface Branch {
    id?: string;
    name: string;
    address: string;
    phone: string;
    students?: number;
    status?: "open" | "closed";
    openingHour: string;
    closingHour: string;
    manager: string | number;
    image: string;
}

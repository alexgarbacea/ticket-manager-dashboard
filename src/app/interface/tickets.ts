import { TicketState } from "../enum/ticketState.enum";

export interface Tickets {
    id: number,
    title: string,
    owner: number,
    assignedTo: number,
    status: TicketState | string,
    description: string,
    date: string,
    category: string
}
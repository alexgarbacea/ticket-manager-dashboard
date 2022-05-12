import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { topStats } from './interface/mainDashboard';
import ticketData from "../JSON/tickets.json";
import { Tickets } from './interface/tickets';
import { TicketState } from './enum/ticketState.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title:string = 'tickets-manager-dashboard';

  private isLoading = new BehaviorSubject<boolean>(true)

  isLoading$ = this.isLoading.asObservable()

  //timer to delay loading
  private loadingTimer : any

  //main dashboard elements
  mainDashboardTopStats : topStats[] = []

  //tickets
  tickets = new BehaviorSubject<Tickets[]>(ticketData)
  tickets$ = this.tickets.asObservable()

  //fill the top stats from main page
  fillTopStats(): void {
    const topStatsNr: number = 4;

    let totalTickets: number = 0
    let unresolved = 0
    let assigned = 0
    let fromToday = 0

    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    const yyyy: number = today.getFullYear();

    const todayString : string = dd + '/' + mm + '/' + yyyy;

    this.tickets$.subscribe(ticket => {
      ticket.map(t  => {
        totalTickets++
        if(t.status !== TicketState.DONE) {
          unresolved++
        }
        if(t.status === TicketState.IN_PROGRESS) {
          assigned++
        }
        if(t.date === todayString) {
          fromToday++
        }
      })
    })

    let statDisplay: topStats 

    for (let i: number = 0; i < topStatsNr; i++) {
      if(i === 0) {
        //total tickets
        statDisplay = {
          id: i,
          title: "Total tickets",
          number: totalTickets,
          icon: "bx bx-bug cart",
          arrow: "bx bx-up-arrow-alt",
        }
      }
      else if(i === 1) {
        //unsolved tickets
        statDisplay = {
          id: i,
          title: "Unsolved",
          number: unresolved,
          icon: "bx bx-bug cart four",
          arrow: "bx bx-up-arrow-alt",
        }
      }
      else if (i === 2) {
        //assigned tickets
        statDisplay = {
          id: i,
          title: "In progress",
          number: assigned,
          icon: "bx bx-check-double cart three",
          arrow: "bx bx-up-arrow-alt",
        }
      }
      else {
        //today tickets
        statDisplay = {
          id: i,
          title: "From today",
          number: fromToday,
          icon: "bx bx-comment-add cart",
          arrow: "bx bx-down-arrow-alt down",
        }
      }

      this.mainDashboardTopStats.push(statDisplay)
    }

  }

  ngOnInit(): void {
    //seconds to delay for
    let timeLeft: number = 1

    //fill top stats
    this.fillTopStats()

    //start delay timer
    this.loadingTimer = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft --
      }
      else{
        this.isLoading.next(false)
        clearInterval(this.loadingTimer)
      }
    }, 1000)
  }

  //toggle sidebar menu
  toggleSidebar(): void {
    let sidebar: Element | null = document.querySelector(".sidebar");
    let sidebarBtn: HTMLElement | null = document.getElementsByClassName('sidebarBtn')[0] as HTMLElement;

    sidebar?.classList.toggle('active')
    sidebar?.classList.contains("active") ? 
      sidebarBtn?.classList.replace("bx-menu", "bx-menu-alt-right") :
      sidebarBtn?.classList.replace("bx-menu-alt-right", "bx-menu")
  }

  //display ticket status names
  private capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  displayStatus(status : string): string {
    let finalString: string = status.toLowerCase().replace(/_/g, ' ')
    return this.capitalizeFirstLetter(finalString)
  }

  //preview ticket title
  previewTitle(title: string): string {
    if(title.length > 21)
      return title.substring(0, 21) + "..."
    else return title
  }

  //
  //drag and drop
  //

  //top stats main page
  drop(event: CdkDragDrop<topStats[]>) {
    moveItemInArray(this.mainDashboardTopStats, event.previousIndex, event.currentIndex);
  }

}

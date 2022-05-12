import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DragDropService } from './service/dragDrop.service';

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

  constructor(private dragDrop: DragDropService) { }

  ngOnInit(): void {
    //seconds to delay for
    let timeLeft: number = 1
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
}

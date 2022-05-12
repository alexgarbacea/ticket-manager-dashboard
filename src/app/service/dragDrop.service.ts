import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})

export class DragDropService {

    //drag and drop reorder list
    dragDropList(event: CdkDragDrop<string[]>, listToChange: object[]) {
        moveItemInArray(listToChange, event.previousIndex, event.currentIndex)
    }

}
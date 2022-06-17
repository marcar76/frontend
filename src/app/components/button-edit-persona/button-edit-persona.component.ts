import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-edit-persona',
  templateUrl: './button-edit-persona.component.html',
  styleUrls: ['./button-edit-persona.component.css']
})
export class ButtonEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('button edit');
  }

   edit():void{
    alert('edit option');
  }
   delete():void {
     alert('delete option');
    
  }
}

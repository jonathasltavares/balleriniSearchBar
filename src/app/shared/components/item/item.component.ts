import { Component, OnInit, Input } from '@angular/core';
import { Comunity } from '../../interfaces/result';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() comunity: Comunity = {id: '', name: '', members: 0, icon: '', code: ''}
  constructor() {
   }
 
  ngOnInit(): void {
  }

  goToComunity(){
    window.open(`https://discord.gg/${this.comunity.code}`, '_blank')
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent {
  visitors = [
    {
      id: '1',
      name: 'Mike',
    },
    {
      id: '2',
      name: 'John',
    },
    {
      id: '3',
      name: 'Alex',
    },
    {
      id: '4',
      name: 'Mia',
    },
    {
      id: '5',
      name: 'Mark',
    },
    {
      id: '6',
      name: 'Robert',
    },
  ];

  selectedCustomer: string = '';
  
  removeDialog(name: string) {
    this.selectedCustomer = name;
  }

  removeCustomer() {
    console.log(this.selectedCustomer);
  }
}

import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthService } from 'src/app/services/auth.service';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'FAQ',
    children: [
      {
        name: 'How do I add a user to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Users" tab. \n 3.) Click on the "Add User" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add User" button.'}],
      },
      {
        name: 'How do I add a product to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Products" tab. \n 3.) Click on the "Add Product" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add Product" button.'}],
      },
      {
        name: 'How do I add a category to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Categories" tab. \n 3.) Click on the "Add Category" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add Category" button.'}],
      },
      {
        name: 'How do I add a supplier to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Suppliers" tab. \n 3.) Click on the "Add Supplier" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add Supplier" button.'}],
      },
      {
        name: 'How do I add a customer to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Customers" tab. \n 3.) Click on the "Add Customer" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add Customer" button.'}],
      },
      {
        name: 'How do I add a sales order to the system?',
        children: [{name: '1.) Open the Side bar by clicking on the menu icon on the top left corner of the screen. \n 2.) Click on the "Sales Orders" tab. \n 3.) Click on the "Add Sales Order" button. \n 4.) Fill in the required fields. \n 5.) Click on the "Add Sales Order" button.'}],
      },
],
  },
  {
    name: ' Contact Support',
    children: [{name: 'please email us at: ubuntuwarriors@support.com'}],
      },
    ];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public authService: AuthService) {
    this.dataSource.data = TREE_DATA;
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

}

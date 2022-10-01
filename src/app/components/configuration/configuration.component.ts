import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthService } from 'src/app/services/auth.service';
import { AddVatComponent } from './vat/add-vat/add-vat.component';
import { ViewVatComponent } from './vat/view-vat/view-vat.component';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'VAT',
    children: [{name: 'View VAT Rate'}, {name: 'Update VAT Rate'}],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
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

  constructor(public authService: AuthService, public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  async vatClicked(node: any){
    if(node == 'View VAT Rate'){
      //open view vat dialog
      this.dialog.open(ViewVatComponent, {disableClose: true})
    }
    if(node == 'Update VAT Rate'){
      //open add vat dialog
      this.dialog.open(AddVatComponent, {disableClose: true})
    }
    console.log(node);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner } from '@ionic/angular/standalone';
import { FolderPage } from "../../folder/folder.page";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonContent, CommonModule, FormsModule, FolderPage]
})
export class LoaderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

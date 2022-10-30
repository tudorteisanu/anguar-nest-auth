import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from '../../components/layout-components/layout-components.module';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, LayoutComponentsModule, RouterOutlet],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

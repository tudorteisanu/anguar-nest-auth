import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../../ts/enum';
import { UserInterface } from '../../ts/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<UserInterface[]>(ApiRoutes.Users).subscribe({
      next: (data: UserInterface[]) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

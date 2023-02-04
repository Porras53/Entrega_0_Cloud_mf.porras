import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { enviroment } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient)
  {
    this.http.get(enviroment.SERVER_URL)
  }

}

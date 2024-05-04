import { Component } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  salir=faArrowRightFromBracket;
  pagina: string="";
  sesion: boolean=false;

  constructor(private route: Router){
  }

  ngOnInit(): void {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pagina = event.url;

        switch (this.pagina) {
          case "/login":
            this.sesion=false;
            break;
          case "/":
            this.sesion=false;
          break;
          case "/**":
            this.sesion=false;
          break;
          default:
            this.sesion=true;
            break;
        }
    }
  });
}

}

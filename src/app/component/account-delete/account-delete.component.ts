import { Component, OnInit } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {
  private jsonUrl = 'assets/swagger.json';

  ngOnInit(){
    SwaggerUIBundle({
      urls: [
        {
          name: 'V1',
          url: this.jsonUrl
        }
      ],
      domNode: document.getElementById('swagger-ui'),
      deepLinking: true,
      presets: [SwaggerUIBundle['presets'].apis, SwaggerUIStandalonePreset],
      layout: 'StandaloneLayout',
      onComplete: () => {
        // Customize Swagger UI here
        // For example, you can hide the header
        const header =  document.getElementById('swagger-ui')?.querySelector('.swagger-ui .topbar') as any;
        const info = document.getElementById('swagger-ui')?.querySelector('.information-container.wrapper') as any;
        if (header) {
          header.style.display = 'none';
        }

        if(info){
          info.style.display = 'none';
        }
      }
    });
  }

}

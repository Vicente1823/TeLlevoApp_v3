import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { ApiTeLlevoAppService } from "src/app/api-te-llevo-app.service";

const routes: Routes =[

    {
        path: '',
        component: ApiTeLlevoAppService
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ControllerPageRoutingModule {}
  
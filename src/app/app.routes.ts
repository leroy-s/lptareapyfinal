import { Routes } from '@angular/router';

import { AdministradorComponent } from './administrador/administrador.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { TutorComponent } from './tutor/tutor.component';
import { PracticanteComponent } from './practicante/practicante.component';
import { FormComponent } from './login/form/form.component';
import { DirectorComponent } from './director/director/director.component';
import { MantenerFacultadesComponent } from './administrador/mantener-facultades/mantener-facultades.component';
import { MantenerElementosComponent } from './administrador/mantener-elementos/mantener-elementos.component';
import { HistorialComponent } from './administrador/historial/historial.component';
import { RedireccionamientoComponent } from './administrador/redireccionamiento/redireccionamiento.component';
import { SidebarComponent } from './administrador/sidebar/sidebar.component';
import { GestionusuariosComponent } from './administrador/gestionusuarios/gestionusuarios.component';
import { authGuard } from './login/auth/guards/auth.guard';
import { SidebarcoordinadorComponent } from './coordinador/sidebarcoordinador/sidebarcoordinador.component';
import { RequisitosdedocumentacionComponent } from './coordinador/requisitosdedocumentacion/requisitosdedocumentacion.component';
import { SidebarpracticanteComponent } from './practicante/sidebarpracticante/sidebarpracticante.component';
import { InicioComponent } from './practicante/inicio/inicio.component';
import { GestionarCartaPresentacionComponent } from './practicante/gestionar-carta-presentacion/gestionar-carta-presentacion.component';
import { AdministrarDocumentosComponent } from './practicante/administrar-documentos/administrar-documentos.component';
import { MisEvaluacionesComponent } from './practicante/mis-evaluaciones/mis-evaluaciones.component';
import { CorreoComponent } from './practicante/correo/correo.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { SidebarsecretariaComponent } from './secretaria/sidebarsecretaria/sidebarsecretaria.component';
import { GestionDeCartasComponent } from './secretaria/gestion-de-cartas/gestion-de-cartas.component';
import { GestionReportesComponent } from './secretaria/gestion-reportes/gestion-reportes.component';
import { HomeComponent } from './coordinador/coordinador-home/home.component';
import { PracticanteEpComponent } from './coordinador/coordinador-practicante-ep/practicante-ep.component';
import { RequisitosFinalesComponent } from './coordinador/coordinador-requisitos-finales/requisitos-finales.component';
import { CartaPresentacionComponent } from './coordinador/coordinador-carta-presentacion/carta-presentacion.component';
import { ValidacionComponent } from './coordinador/coordinador-validacion/validacion.component';
import { ComienzopppComponent } from './coordinador/coordinador-comienzoppp/comienzoppp.component';
import { CoordinadorAsignarComponent } from './coordinador/coordinador-asignar/coordinador-asignar.component';
import { SeguimientodeusuarioComponent } from './coordinador/coordinador-seguimientodeusuario/seguimientodeusuario.component';
//Implementado a medias : Glender

export const routes: Routes = [
  {
    path: 'login',
    component: FormComponent
    
  },
  //------------------------------------------------------------


  {
      path: 'sidebar',
      component: SidebarComponent,
      title: 'Practicas pre profecionales',
      canActivate: [authGuard],
      data: { roles: ['ADMIN'] },
      children:[
         {
          path: 'gestion-usuarios',
          component: GestionusuariosComponent,
         },
         {
           path: 'mantener-facultades',
           component: MantenerFacultadesComponent,
         },
         {
          path: 'elementos',
          component: MantenerElementosComponent,
         },
         {
          path: 'historial',
          component: HistorialComponent
         },

         {
          path :'**',
          redirectTo: 'gestion-usuarios'
         }

      ]

  }

   //-----------------------------------------------------------
   ,{
    path: 'coordinador',
    component: CoordinadorComponent,

  },
  {
    path: 'sidebarcoordinador',
    component: SidebarcoordinadorComponent,
    title: 'Practicas pre profecionales',
    children:[
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'practicante-ep',
        component: PracticanteEpComponent,
      },
      {
        path: 'requisitos-finales',
        component: RequisitosFinalesComponent,
      },
      {
        path: 'carta-presentacion',
        component: CartaPresentacionComponent,
      },
      {
      path: 'validacion',
      component: ValidacionComponent,
    },
    {
        path: 'comienzoppp',
        component: ComienzopppComponent,
      },
      {
        path: 'coordinador-asignar',
        component: CoordinadorAsignarComponent,
      },
      {
        path: 'seguimientodeusuario',
        component: SeguimientodeusuarioComponent,
      },
      {
        path: 'requisitosdedocumentacion',
        component: RequisitosdedocumentacionComponent,
      },
      {
        path :'**',
        redirectTo: ''
       }
    ]
  },
   //-----------------------------------------------------------
  {
    path: 'tutor',
    component: TutorComponent,
    canActivate: [authGuard],
    data: { roles: ['TUTOR'] }
  },


  {
    path: 'practicante',
    component: PracticanteComponent,

  },
  {
      path: 'sidebarpracticante',
      component: SidebarpracticanteComponent,
      title: 'Practicas pre profecionales',
      children:[
        {
          path: 'inicio',
          component: InicioComponent,
          },
          {
            path: 'cartappp',
            component:  GestionarCartaPresentacionComponent,
         },
         {
          path: 'documentacion',
          component:  AdministrarDocumentosComponent,
      }
      ,
      {
          path: 'evaluaciones',
          component:  MisEvaluacionesComponent,
      }
      ,
      {
          path: 'correo',
          component:  CorreoComponent,
      },
         {
          path :'**',
          redirectTo: ''
         }
      ]
    },
  {
    path: 'director',
    component: DirectorComponent,
    canActivate: [authGuard],
    data: { roles: ['DIRECTOR'] }
  },
  {
    path: 'secretaria',
    component: SecretariaComponent,
  }
  ,
  {
    path: 'sidebarsecretaria',
    component: SidebarsecretariaComponent,
    title: 'Practicas pre profecionales',
    children:[
      {
        path: 'gestion_cartas',
        component: GestionDeCartasComponent,
    }
    ,
    {
        path: 'reportes',
        component:  GestionReportesComponent,
    },

       {
        path :'**',
        redirectTo: ''
       }

    ]
  },










  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];


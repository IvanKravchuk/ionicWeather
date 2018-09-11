import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapsComponent } from './maps/maps';
@NgModule({
	declarations: [MapsComponent],
	imports: [],
	exports: [MapsComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}

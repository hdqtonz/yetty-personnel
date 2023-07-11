import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}

import { Injectable } from '@angular/core';
import { establishmentAPIEndpoints } from '../class/endpoints/establishments';
import { EstablishmentSettings } from '../interface/EstablishmentSettings';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private _http: HttpClientService) { }

  getEstablishmentSettings() {
    return this._http.get<EstablishmentSettings>(`${establishmentAPIEndpoints._getEstablishmentSettings}`);
  }

}

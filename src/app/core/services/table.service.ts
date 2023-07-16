import { Injectable } from '@angular/core';
import { establishmentAPIEndpoints } from '../class/endpoints/establishments';
import { tableAPIEndpoints } from '../class/endpoints/tables';
import { Establishment } from '../interface/Establishment';
import { EstablishmentSettings } from '../interface/EstablishmentSettings';
import { Table } from '../interface/Table';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private _http: HttpClientService) { }

  getEstablishmentSettings() {
    return this._http.get<EstablishmentSettings>(`${establishmentAPIEndpoints._getEstablishmentSettings}`);
  }

  getEstablishmentInfo() {
    return this._http.get<Establishment>(`${establishmentAPIEndpoints._getEstablishmentInfo}`);
  }

  listTables(myTableOnly: boolean) {
    return this._http.get<Table>(`${tableAPIEndpoints._listTables}?myTablesOnly=${myTableOnly}`);
  }

}

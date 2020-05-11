import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import Constants from '../constants';

@Injectable()
export class CityService {
    private cityUrl = `${Constants.apiUrl}/api/cities`;

    constructor(private httpClient: HttpClient) {
    }

    saveCity(city: City) {
        return this.httpClient.post(this.cityUrl, city);
    }

    getCities() {
        return this.httpClient.get(this.cityUrl);
    }

    deteteCity(cityId: number) {
        return this.httpClient.delete(`${this.cityUrl}/${cityId}`);
    }
}
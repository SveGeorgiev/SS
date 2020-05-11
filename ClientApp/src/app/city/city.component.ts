import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from './city.service';
import { City } from '../models/city';

@Component({
    selector: 'app-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
    cityForm: FormGroup;
    cities: City[] = [];
    showAlertInfo = false;
    alertInfoText: string;

    constructor(private cityService: CityService) {
        this.getCities();
    }

    ngOnInit(): void {
        this.cityForm = new FormGroup({
            name: new FormControl('', [Validators.required])
        });
    }

    saveCity() {
        this.cityService
            .saveCity(new City(this.cityForm.get('name').value))
            .subscribe(() => {
                this.cityForm.get('name').setValue('');
                this.getCities();
            }, (error) => console.log(error));
    }

    getCities() {
        this.cityService.getCities().subscribe((cities: City[]) => {
            this.cities = cities;
        }, (error) => console.log(error));
    }

    deleteCity(city: City) {
        this.cityService
            .deteteCity(city.id)
            .subscribe((city: City) => {
                if (city.isDeleted) {
                    this.getCities();
                } else {
                    this.alertInfoText = `'${city.name}' не може да бъде изтрит, защото има организации!`;
                    this.showAlertInfo = true;
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }, (error) => console.log(error));
    }

    closeAlert() {
        this.showAlertInfo = false;
    }
}

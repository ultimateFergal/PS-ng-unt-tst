import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
    let mockMessageService; // Requested in the constructor of the hero service
    let httpTestingController: HttpTestingController; // to get a handle to the mock httpClient Service so that
    let service;                                      // i can adjust it and control it inside the test

    beforeEach( () => {

        mockMessageService = jasmine.createSpyObj(['add']); // Requested in the constructor of the hero service

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule // as in a mock for HttpClient module requested in the constructor of the hero service
            ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController); // to get a handle to the mock httpClient Service
                                                                    // the get mehotd accesses the dependency injection registry l
                                                                    // looking for the module inserted and find the service that corelates
                                                                    // to that type(HttpTestingController)
        service =  TestBed.get(HeroService); // get a handle to the hero service, geting an instance to a service module
        const msgSvc =  TestBed.get(MessageService);
    });

    describe('getHero', () => {

        it('should call get with the correct URL', () => {
            service.getHero(4).subscribe();

            const req = httpTestingController.expectOne('api/heroes/4'); // this creates a request
            req.flush({ id: 4, name: 'SuperDude', strength: 100 }); // Data we want to return when the previous call form req comes in
            httpTestingController.verify(); // Checks service requested is teh same as req, validates no other requests are made
                                            // but the one for the test
        });

        /* // Other way, by injecting
        it('should call get with the correct URL',
        inject([HeroService, httpTestingController], (service1: HeroService, controller: HttpTestingController) => {
            service1.getHero(4).subscribe();

        }));
        */

    });
});

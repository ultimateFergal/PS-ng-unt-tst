import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service;

    beforeEach( () => {

        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service =  TestBed.get(HeroService); // get a handle to a service, geting an instance to a service module
        const msgSvc =  TestBed.get(MessageService);
    });

    describe('getHero', () => {

        it('should call get with the correct URL', () => {
            service.getHero(4).subscribe();

            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({ id: 4, name: 'SuperDude', strength: 100 }); // Data we want to return when the previous call form req comes in
            httpTestingController.verify(); // Checks service requested is teh same as req
        });
    });
});

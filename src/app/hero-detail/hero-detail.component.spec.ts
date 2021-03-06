import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {

    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => '3' } }
        };
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation },
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
    });

    it('should render hero name in a n2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');

    });




    /*     it('should call updateHero when save is called', (done) => { // For Jasmine to know is an asynchronus test
            mockHeroService.updateHero.and.returnValue(of({}));
            fixture.detectChanges();

            fixture.componentInstance.save();


            setTimeout(() => {
                expect(mockHeroService.updateHero).toHaveBeenCalled();
                done();
            }, 300);
        }) */

        // fakeasync to treat the asynchronus code as synchronus code working with zone.js
        it('should call updateHero when save is called', fakeAsync(() => {
           mockHeroService.updateHero.and.returnValue(of({}));
           fixture.detectChanges();

           fixture.componentInstance.save();
           // tick(250); awaut this time
           // tick(240); vies error
           flush(); // Look at the zone and see if there are any
           // tasks that are waiting and fastforward the clocl until
           // those tasks are executed

           expect(mockHeroService.updateHero).toHaveBeenCalled();
        }));

/*     it('should call updateHero when save is called', async(() => { // For working with promises, this doesnt deal well with set timeouts
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        fixture.whenStable().then(() => { // for wating until the pending promise is resolved
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        });
    })) */
});

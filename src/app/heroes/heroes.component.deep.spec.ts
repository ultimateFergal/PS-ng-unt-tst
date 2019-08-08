import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Output, Component, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { EventEmitter } from 'protractor';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';


// The routerlink is a directive that lives inside the routermodule
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]',
    // tslint:disable-next-line:use-host-property-decorator
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


    beforeEach(() => {
        HEROES =  [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
               { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

        // fixture.detectChanges(); // Both Heroes component and child componente will get initialiazed

    });

    it('should be true', () => {
        expect(true).toBe(true);
    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges(); // Both Heroes component and child componente will get initialiazed

        // heroComponentes Debug Elements
        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));  // using directives to find child components

        expect(heroComponentsDEs.length).toEqual(3);
        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
        expect(heroComponentsDEs[1].componentInstance.hero.name).toEqual('Wonderful Woman');
        expect(heroComponentsDEs[2].componentInstance.hero.name).toEqual('SuperDude');

        for (let i = 0; i < heroComponentsDEs.length; i++) {
            // expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(HEROES[i].name);
            expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it('should call heroService.deleteHero when the Hero Component\'s delete button is clicked', () => {
        spyOn(fixture.componentInstance, 'deleteHero'); // to watch and see if the method is called
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const  heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // tslint:disable-next-line:max-line-length
        // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); // just making the child component emmiting or raise its event
        heroComponents[0].triggerEventHandler('delete', null); // telling the debug element to just trigger de delete event

        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', {stopPropagation: () => { }}); // With dummy object for stopPropagation method

        expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);

    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        const name = 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
        const inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        const routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });

});

/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}

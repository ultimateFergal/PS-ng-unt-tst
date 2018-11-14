import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Output, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { EventEmitter } from "protractor";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { IterableChangeRecord_ } from "@angular/core/src/change_detection/differs/default_iterable_differ";

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>; 
    let mockHeroService;
    let HEROES;

    
    beforeEach(() => {
        HEROES =  [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
               { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroesComponent);      

    });

    it('should be true', () => {
        expect(true).toBe(true);
    })

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))

        expect(heroComponentsDEs.length).toEqual(3);
        expect(heroComponentsDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
        expect(heroComponentsDEs[1].componentInstance.hero.name).toEqual('Wonderful Woman');
        expect(heroComponentsDEs[2].componentInstance.hero.name).toEqual('SuperDude');

        for(let i = 0; i < heroComponentsDEs.length; i++){
            // expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(HEROES[i].name);
            expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const  heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        heroComponents[0].triggerEventHandler('delete', null);

        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', {stopPropagation: () => { }})

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
        const inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(name);
    });

});
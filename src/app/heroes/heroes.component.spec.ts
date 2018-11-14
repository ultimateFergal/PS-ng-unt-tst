import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES =  [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55},
        ];

        // Creates a mock object that we can control, can tell it what methods it has, 
        // what those methods shoyld return when they called,
        //  we can ask it what methods were called in a test
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']); 
        component = new HeroesComponent(mockHeroService); // Heroes component has an injected service, we need a moc of that
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true)); // Call mockService to return an observable just like the real delete method ans service 
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });

        // xit('should call deleteHero', () => { // Skip test
        // fit('should call deleteHero', () => { // Focus, only this test
        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true)); // Call mockService to return an observable just like the real delete method ans service 
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalled; 
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]); 
        });
        
    });
});
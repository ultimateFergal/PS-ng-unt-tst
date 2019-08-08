import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (Shallow test)', () => {

    let fixture: ComponentFixture<HeroComponent>; // Wrapper for a component with more properties than the component itself has

    beforeEach(() => {
        // It allows to test both the component and
        // its template running together, helps to create
        // an especial module just for testing purposes
        TestBed.configureTestingModule({
            declarations: [
                HeroComponent
            ],
            schemas: [NO_ERRORS_SCHEMA] // Tells angular that for this module do not errr if you
                                        // encounter an unknown attribute or an unknown elment in the HTML of the template
                                        // only use when absolutely necessary, it hides errors we might need, we dont need to
                                        // prove router link here
        });
        fixture = TestBed.createComponent(HeroComponent);

    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SpiderDude', strength: 8};

        expect(fixture.componentInstance.hero.name).toEqual('SpiderDude');
    });

    it('should render the hero name in an anchor tag', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SpiderDude', strength: 8};

        // Update the bindings, run change detection and update any bindings that
        // may exist on the component
        fixture.detectChanges();

        // To access the root element of the template, wrapper with other set on
        // funcionalities than nativeElement
        // Debugelement is a wrapper around the DOM node
        // THe debugElement has a way to access more properties
        const deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('SpiderDude');

        // nativeElemente gets a handle to the DOM element
        // that represents the container for the template.
        // It is a standard HTML DOM elemen
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SpiderDude');
    });
});

import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () =>  {
    it ('it should display "weak" if strength is 5 ', () => {
        const pipe = new StrengthPipe();

        const val = pipe.transform(5);
        expect(val).toEqual('5 (weak)');
        // expect(pipe.transform(6)).toEqual('5 (weak)'); // Error
    });

    it('should display strong if strength is 10', () => {
        const pipe = new StrengthPipe();

        const val = pipe.transform(10);
        expect(val).toEqual('10 (strong)');
    });
});

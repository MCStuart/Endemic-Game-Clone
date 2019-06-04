import { Game } from '../src/functions';

describe('Game turn tick functions', function () {
    test('Add skillpoint each tick', () => {
        let game = new Game("Jared");
        game.tick();
        expect(game.skillpoints).toEqual(1);    
    });
    test('Infection rate to increase', () => {
        let game = new Game("Jared");
        game.tick();
        expect(game.infectionRate).toEqual(.11);    
    });
});
import { Game } from '../src/functions';

describe('Game turn tick functions', function () {
    test('Add skillpoint each tick', () => {
        let game = new Game("Jared");
        game.tick();
        expect(game.skillpoints).toEqual(1);    
    });
    test('Add skillpoint each tick cummulative', () => {
        let game = new Game("Jared");
        game.tick();
        game.tick();
        expect(game.skillpoints).toEqual(2);    
    });
    test('Infection rate to increase', () => {
        let game = new Game("Jared");
        game.tick();
        expect(game.infectionRate).toEqual(.11);    
    });
    test('Infection rate increase turn after turn', () => {
        let game = new Game("Jared");
        game.tick();
        game.tick();
        expect(game.infectionRate).toEqual(.121);    
    });
    test('One random quadrant is selected to start infection', () => {
        let game = new Game("Jared");
        expect(game.population.N.Infected + game.population.NE.Infected + game.population.NW.Infected + game.population.SE.Infected + game.population.SW.Infected).toEqual(1);   
    });
});

describe('Skill tree actions', function() {
    test('Can activate specific skill', () => {
        let game = new Game("Jared");
        game.rumor();
        expect(game.skills["rumor"]).toEqual(true);    
    });
});
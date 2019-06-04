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
    var game = new Game("Jared");
    beforeEach(() => {
        game = new Game("Jared")
        game.skillpoints = 1000;
      });

    test('Can activate specific skill', () => {
        
        game.getSkill("report");
        expect(game.skills.report.cost).toEqual(true);    
    });
    test('Can activate specific skill', () => {
        
        game.getSkill("quarantine");
        expect(game.skills["quarantine"].cost).toEqual(true);    
    });
    test('Can activate and retain multiple skills', () => {
       
        game.getSkill("quarantine");
        game.getSkill("report");
        game.getSkill("finishVaccine");
        console.log(game);
        expect(game.skills.quarantine.cost && game.skills.report && game.skills["finishVaccine"].cost).toEqual(true);    
    });
    test('Skill wont activate if there are not enough points', () => {
        game.skillpoints = 0;
        game.tick();
        game.tick();
        game.tick();
        game.tick();
        game.getSkill("report");
        expect(game.skillpoints).toEqual(4);    
    }); 
    test('Activating skill reduces skillpoints', () => {
        game.skillpoints = 0;
        game.tick();
        game.tick();
        game.tick();
        game.tick();
        game.tick();
        game.getSkill("report");
        expect(game.skillpoints).toEqual(0);    
    });   
});
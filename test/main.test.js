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
        let expectedRate = game.infectionRate * game.infectionRateChange;
        game.tick();
        expect(game.infectionRate).toEqual(expectedRate);    
    });
    test('Infection rate increase turn after turn', () => {
        let game = new Game("Jared");
        let expectedRate = game.infectionRate * game.infectionRateChange ** 2;
        game.tick();
        game.tick();
        expect(game.infectionRate.toFixed(3)).toEqual(expectedRate.toFixed(3));    
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
        expect(game.skills.quarantine.cost && game.skills.report && game.skills["finishVaccine"].cost).toEqual(true);    
    });
    test('Skill wont activate if there are not enough points', () => {
        game.skillpoints = 0;
        for (let i = 0; i < 4; i++) {
        game.tick();
        };
        game.getSkill("report");
        expect(game.skillpoints).toEqual(4);    
    }); 
    test('Activating skill reduces skillpoints', () => {
        game.skillpoints = 0;
        for (let i = 0; i < 5; i++) {
            game.tick();
            };
        game.getSkill("report");
        expect(game.skillpoints).toEqual(0);    
    });   
});

describe('Skill tree actions', function() {

    var game = new Game("Jared");

    beforeEach(() => {
        game = new Game("Jared")
      });

    test('Field Lab skill should pause infection rate increase for two ticks', () => {
        for (let i = 0; i < 11; i++) {
            game.tick();
            if (i === 4) {
                game.getSkill("report");
            }
        };
        game.getSkill("fieldLab");
        game.tick();
        game.tick();
        let infectionRateAfterElevenTurns = parseFloat((0.1* game.infectionRateChange**11))
        expect(game.infectionRate.toFixed(3)).toEqual(infectionRateAfterElevenTurns.toFixed(3))
    });
    test('Expect infection rate to resume after pause from skill activation', () => {
        for (let i = 0; i < 11; i++) {
            game.tick();
            if (i === 4) {
                game.getSkill("report");
            }
        };
        game.getSkill("fieldLab");
        game.tick();
        game.tick();
        game.tick();
        let infectionRateAfter14Turns = parseFloat((0.1* game.infectionRateChange**12))
        expect(game.infectionRate.toFixed(3)).toEqual(infectionRateAfter14Turns.toFixed(3))
    });
});

describe('Infection and Mortality Rates', function() {

    var game = new Game("Jared");

    beforeEach(() => {
        game = new Game("Jared")
      });

      test('every tick, more people should be infected', () => {
        for (let i = 0; i < 20; i++) {
            game.tick();
            if (i === 4) {
                game.getSkill("report");
            }
        };
        console.log(game.population);
        expect(game.population.N.Infected + game.population.NE.Infected + game.population.NW.Infected + game.population.SE.Infected + game.population.SW.Infected).not.toEqual(1);
    });
    test('Disease will now have probability to kill', () => {
        for (let i = 0; i < 60; i++) {
            game.tick();
        };
        expect(game.population.N.Dead + game.population.NE.Dead + game.population.NW.Dead + game.population.SE.Dead + game.population.SW.Dead).not.toEqual(0);
    });
})

describe('Will get .gifs from giphy API', function() {
    test('returns appropriate .gif for a selected skill', () => {
        expect().toEqual();
    })
})
export class Game{
    constructor(player){
        this.player = player;
        this.population = {N: { Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0}, }
        this.skillpoints = 0;
        this.infectionRateChange = 1.1;
        this.infectionRateChangePause = 0;
        this.skills = { 
            report : { cost : 5, action : () => {} }, 
            fieldLab : { cost : 6, action : () => {             infectionRateChangePause = 2;
                } },  
            beginVaccineResearch : { cost : 10 }, 
            finishVaccine : { cost : 17 }, 
            administrateVaccine : { cost : 20 }, 
            curfew : { cost : 3 }, 
            travelRestriction : { cost : 4 },  
            quarantine : { cost : 10 }, 
            forcedVaccines : { cost : 12 }, 
            bottledWater : { cost : 4 }, 
            animalCulling : { cost : 6 }, 
            martialLaw : { cost : 12 }, 
            shootOnSight : { cost : 15 }
        };
        this.infectionRate = .1;
        this.toggle = function(name){
            this.skills[name].cost = true;
        }
        this.getSkill = function(skill) {
            if (this.skillpoints >= this.skills[skill].cost) {
                this.skillpoints -= this.skills[skill].cost;
                this.toggle(skill);
            }
        }
        let start = Math.floor(Math.random()*5);
        switch(start){
            case 0:
                this.population.N.Infected++;
                break;
            case 1:
                this.population.NE.Infected++;
                break;
            case 2:
                this.population.NW.Infected++;
                break;
            case 3:
                this.population.SE.Infected++;
                break;
            case 4:
                this.population.SW.Infected++;
                break; 
        }
    }

    tick(){
           this.skillpoints++;
           this.infectionRate = parseFloat((this.infectionRate * this.infectionRateChange)); 
    }

    rumor() {                       // Game Start
        this.toggle("rumor");
        // return dialogue about start of disease
    }
}
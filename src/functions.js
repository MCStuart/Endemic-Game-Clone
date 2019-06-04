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
            fieldLab : { cost : 6, action : () => {             this.infectionRateChangePause += 2;
                } },  
            beginVaccineResearch : { cost : 10, action : () => {} }, 
            finishVaccine : { cost : 17, action : () => {} }, 
            administrateVaccine : { cost : 20, action : () => {} }, 
            curfew : { cost : 3, action : () => {} }, 
            travelRestriction : { cost : 4, action : () => {} },  
            quarantine : { cost : 10, action : () => {} }, 
            forcedVaccines : { cost : 12, action : () => {} }, 
            bottledWater : { cost : 4, action : () => {} }, 
            animalCulling : { cost : 6, action : () => {} }, 
            martialLaw : { cost : 12, action : () => {} }, 
            shootOnSight : { cost : 15, action : () => {} }
        };
        this.infectionRate = .1;
        this.toggle = function(name){
            this.skills[name].cost = true;
        }
        this.getSkill = function(skill) {
            if (this.skillpoints >= this.skills[skill].cost) {
                this.skillpoints -= this.skills[skill].cost;
                this.toggle(skill);
                this.skills[skill].action();
            }
        }
        let start = Math.floor(Math.random()*5);
        switch(start){
            case 0:
                this.population.N.Infected++;
                this.population.N.Healthy--;
                break;
            case 1:
                this.population.NE.Infected++;
                this.population.NE.Healthy--;
                break;
            case 2:
                this.population.NW.Infected++;
                this.population.NW.Healthy--;
                break;
            case 3:
                this.population.SE.Infected++;
                this.population.SE.Healthy--;
                break;
            case 4:
                this.population.SW.Infected++;
                this.population.SW.Healthy--;
                break; 
        }
    }

    tick(){
           this.skillpoints++;
           if (this.infectionRateChangePause > 0) {
            this.infectionRateChangePause--;    
           } else {
           this.infectionRate = parseFloat((this.infectionRate * this.infectionRateChange));
           }
    }

    rumor() {                       // Game Start
        this.toggle("rumor");
        // return dialogue about start of disease
    }
}
export class Game{
    constructor(player){
        this.player = player;
        this.population = {N: { Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0}, }
        this.skillpoints = 0;
        this.mortalityRate = -.2;
        this.infectionRateChange = 1.07;
        this.infectionRateChangePause = 0;
        this.infectionSpreadPause = 0;
        this.skills = { 
            report : { cost : 5, action : () => {} }, 
            fieldLab : { cost : 6, action : () => { this.infectionRateChangePause += 2;
                } },  
            beginVaccineResearch : { cost : 10, action : () => { this.infectionRateChangePause += 2;
                } }, 
            finishVaccine : { cost : 17, action : () => { this.infectionRateChangePause += 10;
            } }, 
            administrateVaccine : { cost : 20, action : () => { this.infectionRateChange = 0; this.infectionRate = 0; /* 5 people recover per turn, death rate still applies */} }, 
            curfew : { cost : 3, action : () => { this.infectionSpreadPause += 4; } }, 
            travelRestriction : { cost : 4, action : () => { this.infectionSpreadPause += 6; } },  
            quarantine : { cost : 10, action : () => { this.infectionSpreadPause += 15; } }, 
            forcedVaccines : { cost : 12, action : () => {} }, 
            bottledWater : { cost : 4, action : () => { this.infectionRate *= .9; } }, 
            animalCulling : { cost : 6, action : () => {this.infectionRateChange *= .85; /* needs causualty penalty */ } }, 
            martialLaw : { cost : 12, action : () => {this.infectionRateChange *= .75; /* needs causualty penalty */} }, 
            shootOnSight : { cost : 15, action : () => { this.infectionRateChange = 0; /* needs causualty penalty on just healthy population */} }
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

    spread(){
        let populationArray = Object.keys(this.population);
        let pop = this;
        
        populationArray.forEach(function(x){
            for(let i = 0; i < pop.population[x].Infected && i < pop.population[x].Healthy; i++){
                if(Math.random() < pop.infectionRate && pop.population[x].Healthy > 0) {
                    if((Math.random() * 10000) % 11 > 4){
                        pop.population[x].Infected++;
                        pop.population[x].Healthy--;
                    } else {
                        let district = Math.floor(Math.random() * 5);
                        if(pop.population[populationArray[district]].Healthy > 0){

                            pop.population[populationArray[district]].Infected++;
                            pop.population[populationArray[district]].Healthy--;
                        }
                    }
                }
            }
        })
    }

    tick(){
        this.skillpoints++;
        if (this.infectionRateChangePause > 0) {
        this.infectionRateChangePause--;    
        } else {
            this.infectionRate = parseFloat((this.infectionRate * this.infectionRateChange));
        }
        this.spread();
        
        let populationArray = Object.keys(this.population);
        let pop = this;
        populationArray.forEach(function(x){
            for(let i = 0; i < pop.population[x].Infected; i++){
                if(Math.random() < pop.mortalityRate && pop.population[x].Infected > 0) {
                        pop.population[x].Infected--;
                        pop.population[x].Dead++;
                }
            }
        })
        this.mortalityRate += .015;
    }

    rumor() {  // Game Start
        this.toggle("rumor");
        // return dialogue about start of disease
    }
}
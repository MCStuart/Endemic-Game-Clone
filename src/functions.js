export class Game{
    constructor(player){
        this.player = player;
        this.population = {N: { Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           NW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SE: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0},
                           SW: {Healthy : 100, Infected : 0, Dead : 0, Immune: 0}, }
        this.skillpoints = 0;
        this.skills = {};
        this.infectionRate = .1;
        this.toggle = function(name){
            this.skills[name] = true;
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
           this.infectionRate = parseFloat((this.infectionRate * 1.1).toFixed(3)); 
    }

    rumor() {
        this.toggle("rumor");
        // return dialogue about start of disease
    }

    report() {}

    fieldLab(){}

    beginVacResearch(){}

    finishVaccine(){}

    curfew(){}

    travelRestriction(){}

    quarantine(){}

    forcedVac(){}

    bottledWater(){}

    animalCulling(){}

    martialLaw(){}

    shootOnSight(){}

}


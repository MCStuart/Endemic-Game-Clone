export class Game{
    constructor(player){
        this.player = player;
        this.population = {N: { Healthy : 100, Infected : 1, Dead : 0, Immune: 0},
                           NE: {Healthy : 100, Infected : 1, Dead : 0, Immune: 0},
                           NW: {Healthy : 100, Infected : 1, Dead : 0, Immune: 0},
                           SE: {Healthy : 100, Infected : 1, Dead : 0, Immune: 0},
                           SW: {Healthy : 100, Infected : 1, Dead : 0, Immune: 0}, }
        this.skillpoints = 0;
        this.skills = {};
        this.infectionRate = .1;
    }

    tick(){
           this.skillpoints++;
           this.infectionRate = parseFloat((this.infectionRate * 1.1).toFixed(3)); 
    }
}


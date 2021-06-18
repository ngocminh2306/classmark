export class ClassMark {
    Name;
    MathScores;
    ChemistryScores;
    PhysicsScores;
    constructor(classMark) {
        if(classMark) {
            this.Name = classMark.Name;
            this.MathScores = Number(classMark.MathScores);
            this.ChemistryScores  = Number(classMark.ChemistryScores);
            this.PhysicsScores  = Number(classMark.PhysicsScores);
        }
    }
    calcAvgScores = ()=> {
        return (Number(this.MathScores) + Number(this.ChemistryScores) + Number(this.PhysicsScores))/3
    }
}

class ClassMark {
    Id;
    Name;
    MathScores;
    ChemistryScores;
    PhysicsScores;
    AvgScores;
    GoodRank;
    tagetScores = 7.5;
    constructor(classMark) {
        if(classMark) {
            this.Name = classMark.Name;
            this.MathScores = Number(classMark.MathScores);
            this.ChemistryScores  = Number(classMark.ChemistryScores);
            this.PhysicsScores  = Number(classMark.PhysicsScores);
            this.GoodRank  = classMark.GoodRank;
            this.AvgScores  = Number(classMark.AvgScores);
        }
    }
    calcAvgScores = ()=> {
        this.AvgScores = (Number(this.MathScores) + Number(this.ChemistryScores) + Number(this.PhysicsScores))/3;
        return this.AvgScores;
    }
    setGoodRank = () => {
        this.GoodRank = (this.calcAvgScores() >= this.tagetScores);
        console.log('set rank', this.GoodRank)
        return this.GoodRank;
    }
}

class ClassMarkStoge {
    tableName = 'ClassMark';
    lstAll = [];
    constructor() {
    }
    save(datas) {
        localStorage.setItem(this.tableName, JSON.stringify(datas));
    }
    getAll() {
        let datas = localStorage.getItem(this.tableName || "[]");
        this.lstAll = JSON.parse(datas);
        
        return this.lstAll.map(v => new ClassMark(v));

    }
}
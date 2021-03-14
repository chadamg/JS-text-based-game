class Dragon {
  constructor(name, strength) {
    this.name = name;
    this.strength = strength;
  }
  checkStrength(strengthLevel, hits) {
        if (strengthLevel > 50) { 
            console.log(`oh no! You only managed to hit ${this.name} ${hits} times, you were defeated!`);
            
        }
        else {console.log(`You slayed ${this.name} and managed to free the village people! Your reward is 100 gold coins`);
     }
    }
  fight(hits) {
    let strengthLevel = this.strength - hits;
    this.checkStrength(strengthLevel, hits);
    }
}

module.exports = Dragon;
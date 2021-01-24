function MilitaryResource(type, health, distance) {
    this.type = type;
    this.health = this.maxHealth = health;
    this.distance = this.maxDistance = distance;
}
 
MilitaryResource.prototype.isReadyToMove = function() {
    return (this.health === this.maxHealth);
}
MilitaryResource.prototype.isReadyToFight = function() {
    return (this.distance <= this.maxDistance);
}
MilitaryResource.prototype.restore = function() {
    this.health = this.maxHealth;   
    this.distance = this.maxDistance;
}
MilitaryResource.prototype.clone = function()  {
    return Object.assign({}, this);
}

MilitaryResource.prototype.useHealth = function(deltaHealth) {
    this.health = this.health - deltaHealth;
}
MilitaryResource.prototype.retreat = function(deltaDistance) {
    this.health = this.distance + deltaDistance;
}


function Squad(...defaultResources) {
    this.squad = [];
    if (defaultResources) this.combineResources(defaultResources);
}


Squad.prototype.combineResources = function(militaryResource) {
    this.squad = ([].concat(...militaryResource));
}

Squad.prototype.isReadyToMove = function() {
    return this.squad.every(item=>(item.isReadyToMove()));
}

Squad.prototype.isReadyToFight = function() {
    return this.squad.every(item=>(item.isReadyToFight()));
}

Squad.prototype.restore = function() {
    this.squad.forEach((res) => res.restore() );
}

Squad.prototype.getReadyToMoveResources = function() {
    return this.squad.filter(item=>(item.isReadyToMove() && item.isReadyToFight()));
}

Squad.prototype.clone = function() {
    var clonesquad = this.squad.map(function(obj) {
        return obj.clone();
    });
    return clonesquad;
}


infantryMan1 = new MilitaryResource('Infantryman',100,500);
infantryMan2 = new MilitaryResource('Infantryman',100,500);
tankMan1 = new MilitaryResource('Infantryman',100,1000);
tankMan2 = new MilitaryResource('Infantryman',100,1000);
mySquad = new Squad(infantryMan1,infantryMan2,tankMan1,tankMan2);

console.log(mySquad);
console.log(mySquad.isReadyToMove());
infantryMan1.useHealth(10);
console.log(mySquad.isReadyToMove());
console.log(mySquad.isReadyToFight());
console.log(mySquad.getReadyToMoveResources());
mySquad.restore();
console.log(mySquad.isReadyToMove());
console.log(mySquad.clone());
// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("=".repeat(70));
console.log(" ".repeat(22) + "🚀 ORBITAL MAINTENANCE v1.6");
console.log(" ".repeat(18) + "Space Station Life Support Simulator");
console.log("=".repeat(70));

// ========================
// SYSTEM MANAGERS
// ========================

class LifeSupportSystem {
  constructor() {
    this.oxygen = { level: 98, status: "nominal" };
  }
  consume(amount = 9) { this.oxygen.level = Math.max(3, this.oxygen.level - amount); }
  generate(amount = 7) { this.oxygen.level = Math.min(100, this.oxygen.level + amount); }
  getStatus() { return this.oxygen; }
}

class PowerSystem {
  constructor() {
    this.power = { level: 87, status: "nominal", generation: 0 };
  }
  consume(amount = 8) { this.power.level = Math.max(3, this.power.level - amount); }
  generate(amount = 9) { this.power.level = Math.min(100, this.power.level + amount); }
  getStatus() { return this.power; }
}

class HullSystem {
  constructor() {
    this.hull = { integrity: 94, status: "stable", breaches: 0 };
  }
  takeDamage(amount) {
    this.hull.integrity = Math.max(4, this.hull.integrity - amount);
    if (Math.random() < 0.3) this.hull.breaches++;
  }
  repair(amount = 22) {
    this.hull.integrity = Math.min(100, this.hull.integrity + amount);
  }
  getStatus() { return this.hull; }
}

class CrewSystem {
  constructor() {
    this.crew = { population: 42, morale: 78 };
  }
  consumeMorale(amount = 7) {
    this.crew.morale = Math.max(5, this.crew.morale - amount);
  }
  boostMorale(amount = 18) {
    this.crew.morale = Math.min(100, this.crew.morale + amount);
  }
  getStatus() { return this.crew; }
}

// ========================
// MAIN GAME CLASS
// ========================

class OrbitalMaintenanceGame {
  constructor(difficulty = "normal") {
    this.difficulty = difficulty;
    this.highScores = this.loadHighScores();
    this.lifeSupport = new LifeSupportSystem();
    this.power = new PowerSystem();
    this.hull = new HullSystem();
    this.crew = new CrewSystem();
    this.upgradesPurchased = 0;
    this.alertLog = [];
    this.cycle = 0;
    this.gameOver = false;
  }

  loadHighScores() {
    const saved = localStorage.getItem("orbitalHighScores");
    return saved ? JSON.parse(saved) : [
      { score: 892, cycles: 19 },
      { score: 845, cycles: 18 },
      { score: 762, cycles: 15 }
    ];
  }

  triggerAlert(level, message) {
    const alert = `[CYCLE ${this.cycle}] ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n" + "─".repeat(60));
    console.log(`SYSTEM STATUS — ${this.difficulty.toUpperCase()}`);
    console.log("─".repeat(60));
    
    const o = this.lifeSupport.getStatus();
    const p = this.power.getStatus();
    const h = this.hull.getStatus();
    const c = this.crew.getStatus();

    console.log(`OXYGEN     ${o.status.padEnd(8)} ${o.level.toString().padStart(3)}%`);
    console.log(`POWER      ${p.status.padEnd(8)} ${p.level.toString().padStart(3)}%`);
    console.log(`HULL       ${h.status.padEnd(8)} ${h.integrity.toString().padStart(3)}%`);
    console.log(`CREW       ${c.population} | Morale: ${c.morale}%`);
    console.log("─".repeat(60));
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 CYCLE ${this.cycle}`);

    const mult = this.difficulty === "hard" ? 1.35 : this.difficulty === "easy" ? 0.75 : 1.0;

    this.lifeSupport.consume(9 * mult);
    this.power.consume(8 * mult);
    
    this.lifeSupport.generate(7);
    this.power.generate(9);

    // Random events
    if (Math.random() < 0.37) {
      this.triggerAlert("WARNING", "Micrometeorite swarm");
      this.hull.takeDamage(9 * mult);
    }
    if (Math.random() < 0.28) {
      this.triggerAlert("WARNING", "Solar flare interference");
      this.power.consume(14);
    }
    if (Math.random() < 0.25) {
      this.crew.consumeMorale(7 * mult);
    }

    this.checkSystemHealth();

    // Game over check
    const o = this.lifeSupport.getStatus();
    const p = this.power.getStatus();
    const h = this.hull.getStatus();
    const c = this.crew.getStatus();

    if (o.level <= 10 || p.level <= 8 || h.integrity <= 15 || c.morale <= 12) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "CATASTROPHIC SYSTEM FAILURE");
    }
  }

  manualAction(action) {
    console.log(`\n> ${action.toUpperCase()}`);
    switch(action.toLowerCase()) {
      case "oxygen":
      case "o2":
        this.lifeSupport.generate(25);
        console.log("💨 Massive oxygen injection complete.");
        break;
      case "power":
        this.power.generate(22);
        console.log("☀️ Solar arrays overclocked.");
        break;
      case "repair":
        this.hull.repair(22);
        console.log("🛠️ Repair drones deployed.");
        break;
      case "boost":
        this.crew.boostMorale(18);
        console.log("👥 Crew morale restored.");
        break;
      default:
        console.log("Available: oxygen, power, repair, boost");
    }
  }

  calculateScore() {
    const o = this.lifeSupport.getStatus().level;
    const p = this.power.getStatus().level;
    const h = this.hull.getStatus().integrity;
    const m = this.crew.getStatus().morale;
    return Math.floor(o * 1.3 + p * 1.2 + h * 1.7 + m * 1.0 + this.upgradesPurchased * 35);
  }

  showEndReport() {
    const score = this.calculateScore();
    console.log("\n" + "=".repeat(70));
    console.log("           SHIFT REPORT");
    console.log("=".repeat(70));
    console.log(`Difficulty       : ${this.difficulty.toUpperCase()}`);
    console.log(`Cycles Survived  : ${this.cycle}`);
    console.log(`Final Score      : ${score}/1200`);
    console.log(`Upgrades Bought  : ${this.upgradesPurchased}`);
    console.log("=".repeat(70));
  }
}

// ========================
// GAME EXECUTION
// ========================

const game = new OrbitalMaintenanceGame("normal");

console.log("\n=== SHIFT START ===");
game.triggerAlert("INFO", "Engineer on duty. Station Aurora is under your command.");

for (let i = 0; i < 22; i++) {
  game.runMaintenanceCycle();
  if (game.gameOver) break;

  if (i % 4 === 0 && i > 0) {
    const actions = ["oxygen", "power", "repair", "boost"];
    game.manualAction(actions[Math.floor(Math.random() * actions.length)]);
  }
}

if (!game.gameOver) {
  console.log("\n🎉 SHIFT COMPLETE — Outstanding performance!");
} else {
  console.log("\n💥 STATION LOST");
}

game.showEndReport();

console.log("\nThanks for playing Orbital Maintenance!");
console.log("=== SIMULATION ENDED ===");

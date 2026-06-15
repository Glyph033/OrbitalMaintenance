// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("=".repeat(70));
console.log(" ".repeat(22) + "🚀 ORBITAL MAINTENANCE v1.7");
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
// MAIN GAME
// ========================

class OrbitalMaintenanceGame {
  constructor(difficulty = "normal") {
    this.difficulty = difficulty;
    this.lifeSupport = new LifeSupportSystem();
    this.power = new PowerSystem();
    this.hull = new HullSystem();
    this.crew = new CrewSystem();
    this.upgradesPurchased = 0;
    this.alertLog = [];
    this.cycle = 0;
    this.gameOver = false;
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

  showCommands() {
    console.log("\nAvailable commands:");
    console.log("  oxygen / o2   - Emergency oxygen boost");
    console.log("  power         - Overcharge solar arrays");
    console.log("  repair        - Deploy repair drones");
    console.log("  boost         - Improve crew morale");
    console.log("  status        - Show detailed status");
    console.log("  next          - Continue to next cycle");
    console.log("  quit          - End simulation");
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
      case "status":
        this.checkSystemHealth();
        return true;
      default:
        console.log("Unknown command. Type 'help' for commands.");
        return false;
    }
    return true;
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 === CYCLE ${this.cycle} ===`);

    const mult = this.difficulty === "hard" ? 1.35 : this.difficulty === "easy" ? 0.75 : 1.0;

    this.lifeSupport.consume(9 * mult);
    this.power.consume(8 * mult);
    this.lifeSupport.generate(7);
    this.power.generate(9);

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

    const o = this.lifeSupport.getStatus();
    const p = this.power.getStatus();
    const h = this.hull.getStatus();
    const c = this.crew.getStatus();

    if (o.level <= 10 || p.level <= 8 || h.integrity <= 15 || c.morale <= 12) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "CATASTROPHIC SYSTEM FAILURE");
    }
  }
}

// ========================
// INTERACTIVE LOOP
// ========================

const game = new OrbitalMaintenanceGame("normal");

console.log("\n=== SHIFT START ===");
game.triggerAlert("INFO", "You are now in command of Orbital Station Aurora.");
game.showCommands();

let running = true;

while (running && !game.gameOver) {
  const command = prompt("Enter command (or 'next' to continue):");
  
  if (!command) continue;
  
  const cmd = command.trim().toLowerCase();

  if (cmd === "quit" || cmd === "exit") {
    running = false;
    console.log("Simulation ended by user.");
    break;
  }

  if (cmd === "next") {
    game.runMaintenanceCycle();
  } 
  else if (cmd === "help") {
    game.showCommands();
  } 
  else {
    game.manualAction(cmd);
  }
}

if (game.gameOver) {
  console.log("\n💥 STATION LOST - Mission Failed");
} else {
  console.log("\n🎉 Simulation ended successfully.");
}

console.log("\nThanks for playing Orbital Maintenance!");
console.log("=== SIMULATION ENDED ===");

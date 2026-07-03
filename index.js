// Orbital Maintenance System - index.js
// Space station maintenance simulator - ULTIMATE FINAL RELEASE v3.5

console.log("=".repeat(80));
console.log(" ".repeat(25) + "🚀 ORBITAL MAINTENANCE v3.5");
console.log(" ".repeat(18) + "ULTIMATE FINAL RELEASE - Orbital Station Aurora");
console.log("=".repeat(80));
console.log("Low Earth Orbit • 412km altitude");
console.log("You are the sole Maintenance Engineer on duty.");
console.log("The fate of the station and its 42 crew members rests in your hands.\n");

// ========================
// CORE SYSTEMS
// ========================

class LifeSupportSystem {
  constructor() { this.oxygen = { level: 98, status: "nominal" }; }
  consume(amount = 9) { this.oxygen.level = Math.max(3, this.oxygen.level - amount); }
  generate(amount = 7) { this.oxygen.level = Math.min(100, this.oxygen.level + amount); }
  getStatus() { return this.oxygen; }
}

class PowerSystem {
  constructor() { this.power = { level: 87, status: "nominal", generation: 0 }; }
  consume(amount = 8) { this.power.level = Math.max(3, this.power.level - amount); }
  generate(amount = 9) { this.power.level = Math.min(100, this.power.level + amount); }
  getStatus() { return this.power; }
}

class HullSystem {
  constructor() { this.hull = { integrity: 94, status: "stable", breaches: 0 }; }
  takeDamage(amount) {
    this.hull.integrity = Math.max(4, this.hull.integrity - amount);
    if (Math.random() < 0.3) this.hull.breaches++;
  }
  repair(amount = 22) { this.hull.integrity = Math.min(100, this.hull.integrity + amount); }
  getStatus() { return this.hull; }
}

class CrewSystem {
  constructor() { this.crew = { population: 42, morale: 78 }; }
  consumeMorale(amount = 7) { this.crew.morale = Math.max(5, this.crew.morale - amount); }
  boostMorale(amount = 18) { this.crew.morale = Math.min(100, this.crew.morale + amount); }
  getStatus() { return this.crew; }
}

// ========================
// GAME ENGINE
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

  triggerAlert(level, message, emoji = "⚠️") {
    const alert = `[CYCLE ${this.cycle.toString().padStart(2,'0')}] ${emoji} ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n" + "─".repeat(72));
    console.log(`📡 SYSTEM STATUS — ${this.difficulty.toUpperCase()} MODE`);
    console.log("─".repeat(72));
    
    const o = this.lifeSupport.getStatus();
    const p = this.power.getStatus();
    const h = this.hull.getStatus();
    const c = this.crew.getStatus();

    console.log(`💨 OXYGEN   ${o.status.padEnd(8)} ${o.level.toString().padStart(3)}%`);
    console.log(`☀️  POWER    ${p.status.padEnd(8)} ${p.level.toString().padStart(3)}%`);
    console.log(`🛡️  HULL     ${h.status.padEnd(8)} ${h.integrity.toString().padStart(3)}%`);
    console.log(`👥 CREW     ${c.population} | Morale: ${c.morale}%`);
    console.log("─".repeat(72));
  }

  showCommands() {
    console.log("\n🛠️  Available Commands:");
    console.log("  oxygen / o2 → Emergency oxygen boost");
    console.log("  power       → Overcharge solar arrays");
    console.log("  repair      → Deploy repair drones");
    console.log("  boost       → Improve crew morale");
    console.log("  status      → Show full system status");
    console.log("  next        → Advance to next cycle");
    console.log("  help        → Show commands");
    console.log("  quit        → End current shift");
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
        return;
      default:
        console.log("❌ Unknown command. Type 'help' for available commands.");
    }
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 === CYCLE ${this.cycle} ===`);

    const mult = this.difficulty === "hard" ? 1.4 : this.difficulty === "easy" ? 0.7 : 1.0;

    this.lifeSupport.consume(9 * mult);
    this.power.consume(8 * mult);
    this.lifeSupport.generate(7);
    this.power.generate(9);

    const roll = Math.random();
    if (roll < 0.28) {
      this.triggerAlert("WARNING", "Micrometeorite swarm detected", "💥");
      this.hull.takeDamage(9 * mult);
    } else if (roll < 0.48) {
      this.triggerAlert("WARNING", "Solar flare interference", "☀️");
      this.power.consume(14);
    } else if (roll < 0.65) {
      this.triggerAlert("INFO", "Crew reports unusual noises in sector 7", "👥");
      this.crew.consumeMorale(6);
    } else if (roll < 0.78) {
Sorry about that, something didn't go as planned. Please try again, and if you're still seeing this message, go ahead and restart the app.

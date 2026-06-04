// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System v0.9 initialized");

// Main Game Class
class OrbitalMaintenanceGame {
  constructor() {
    this.systems = {
      oxygen: { level: 98, status: "nominal" },
      power: { level: 87, status: "nominal", generation: 0 },
      pressure: { level: 1013, status: "nominal" },
      temperature: { level: 22, status: "nominal" },
      hull: { integrity: 94, status: "stable", breaches: 0 }
    };

    this.crew = { population: 42, morale: 78 };
    this.upgradesPurchased = 0;
    this.alertLog = [];
    this.cycle = 0;
    this.gameOver = false;
    this.shiftComplete = false;
  }

  triggerAlert(level, message) {
    const alert = `[CYCLE ${this.cycle}] ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n=== SYSTEM STATUS ===");
    Object.keys(this.systems).forEach(key => {
      const sys = this.systems[key];
      const value = sys.level !== undefined ? sys.level : sys.integrity;
      console.log(`${key.toUpperCase().padEnd(12)}: ${sys.status.padEnd(8)} ${value}%`);
    });
    console.log(`CREW       : ${this.crew.population} | Morale: ${this.crew.morale}%`);
  }

  manualAction(action) {
    console.log(`\n> EXECUTING: ${action.toUpperCase()}`);
    switch(action.toLowerCase()) {
      case "oxygen":
      case "o2":
        this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 22);
        console.log("💨 Large oxygen boost deployed.");
        break;
      case "power":
        this.systems.power.level = Math.min(100, this.systems.power.level + 18);
        console.log("☀️ Solar arrays overclocked.");
        break;
      case "repair":
        this.systems.hull.integrity = Math.min(100, this.systems.hull.integrity + 20);
        console.log("🛠️ Repair drones launched.");
        break;
      case "cool":
        this.systems.temperature.level = Math.max(10, this.systems.temperature.level - 12);
        console.log("❄️ Emergency cooling activated.");
        break;
      case "boost":
        this.crew.morale = Math.min(100, this.crew.morale + 15);
        console.log("👥 Crew morale boosted.");
        break;
      default:
        console.log("Unknown command. Try: oxygen, power, repair, cool, boost");
    }
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 === CYCLE ${this.cycle} ===`);

    // Passive consumption
    this.systems.oxygen.level = Math.max(5, this.systems.oxygen.level - 8);
    this.systems.power.level = Math.max(5, this.systems.power.level - 7);

    // System recovery
    this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 6);
    this.systems.power.level = Math.min(100, this.systems.power.level + 8);

    // Random events
    if (Math.random() < 0.4) {
      this.triggerAlert("WARNING", "Micrometeorite impact");
      this.systems.hull.integrity = Math.max(5, this.systems.hull.integrity - 8);
    }
    if (Math.random() < 0.3) {
      this.crew.morale = Math.max(10, this.crew.morale - 6);
    }

    this.checkSystemHealth();

    // Game over conditions
    if (this.systems.oxygen.level <= 12 || this.systems.power.level <= 10 || 
        this.systems.hull.integrity <= 18 || this.crew.morale <= 15) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "STATION CRITICAL FAILURE");
    }
  }

  showEndReport() {
    console.log("\n" + "=".repeat(65));
    console.log("           ORBITAL MAINTENANCE - SHIFT REPORT");
    console.log("=".repeat(65));
    console.log(`Cycles Survived     : ${this.cycle}`);
    console.log(`Final Score         : ${Math.floor(this.calculateScore())}/1000`);
    console.log(`Hull Integrity      : ${this.systems.hull.integrity}%`);
    console.log(`Crew Morale         : ${this.crew.morale}%`);
    console.log(`Upgrades Purchased  : ${this.upgradesPurchased}`);
    console.log("\n📜 ALERT LOG:");
    this.alertLog.forEach(log => console.log("  " + log));
    console.log("=".repeat(65));
  }

  calculateScore() {
    return (this.systems.oxygen.level * 1.3) +
           (this.systems.power.level * 1.2) +
           (this.systems.hull.integrity * 1.6) +
           (this.crew.morale * 0.9) +
           (this.upgradesPurchased * 30);
  }
}

// ========================
// INTERACTIVE GAME LOOP
// ========================

const game = new OrbitalMaintenanceGame();

console.log("\n=== ORBITAL MAINTENANCE SHIFT START ===");
game.triggerAlert("INFO", "You are now in command. Keep the station alive!");

for (let i = 0; i < 18; i++) {
  game.runMaintenanceCycle();
  
  if (game.gameOver) break;

  // Simulate player input every 3 cycles
  if (i % 3 === 0 && i > 0) {
    console.log("\n[EMERGENCY ACTION AVAILABLE]");
    const actions = ["oxygen", "repair", "power"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    game.manualAction(randomAction);
  }
}

if (!game.gameOver) {
  console.log("\n✅ SHIFT COMPLETE - Outstanding work, Commander!");
  game.shiftComplete = true;
} else {
  console.log("\n💀 STATION LOST - Mission Failed");
}

game.showEndReport();

console.log("\n=== ORBITAL MAINTENANCE SIMULATION ENDED ===");

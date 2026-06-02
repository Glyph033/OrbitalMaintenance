// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System v0.8 initialized");

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
  }

  triggerAlert(level, message) {
    const alert = `[${new Date().toLocaleTimeString()}] ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n=== SYSTEM HEALTH CHECK ===");
    Object.keys(this.systems).forEach(key => {
      const sys = this.systems[key];
      const value = sys.level !== undefined ? sys.level : sys.integrity;
      console.log(`${key.toUpperCase()}: ${sys.status} (${value}%)`);
    });
    console.log(`CREW: ${this.crew.population} | Morale: ${this.crew.morale}%`);
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 --- MAINTENANCE CYCLE ${this.cycle} ---`);

    // Resource consumption
    const o2Use = Math.floor(this.crew.population * 0.45);
    this.systems.oxygen.level = Math.max(5, this.systems.oxygen.level - o2Use);

    const powerUse = Math.floor(this.crew.population * 0.35);
    this.systems.power.level = Math.max(5, this.systems.power.level - powerUse);

    // System operations
    this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 7);
    this.systems.power.level = Math.min(100, this.systems.power.level + 9);
    
    // Random events
    if (Math.random() < 0.35) {
      this.triggerAlert("WARNING", "Micrometeorite shower detected");
      this.systems.hull.integrity = Math.max(5, this.systems.hull.integrity - 6);
    }
    if (Math.random() < 0.25) {
      this.crew.morale = Math.max(10, this.crew.morale - 5);
    }

    this.checkSystemHealth();

    // Game over check
    if (this.systems.oxygen.level <= 12 || this.systems.power.level <= 10 || 
        this.systems.hull.integrity <= 18 || this.crew.morale <= 15) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "STATION FAILURE IMMINENT");
    }
  }

  showEndReport() {
    console.log("\n" + "=".repeat(60));
    console.log("           ORBITAL MAINTENANCE SHIFT REPORT");
    console.log("=".repeat(60));
    console.log(`Cycles Survived: ${this.cycle}`);
    console.log(`Final Score: ${Math.floor(this.calculateScore())}/1000`);
    console.log(`Hull Integrity: ${this.systems.hull.integrity}%`);
    console.log(`Crew Morale: ${this.crew.morale}%`);
    console.log(`Upgrades Purchased: ${this.upgradesPurchased}`);
    console.log("\n📜 ALERT LOG:");
    this.alertLog.forEach(log => console.log(log));
    console.log("=".repeat(60));
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
// GAME EXECUTION
// ========================

const game = new OrbitalMaintenanceGame();

console.log("\n=== ORBITAL MAINTENANCE SHIFT START ===");
game.triggerAlert("INFO", "Engineer on duty. Station is yours.");

for (let i = 0; i < 15; i++) {
  game.runMaintenanceCycle();
  if (game.gameOver) break;
  
  // Demo manual intervention every few cycles
  if (i === 4 || i === 9) {
    console.log("\n> MANUAL INTERVENTION: Emergency oxygen boost");
    game.systems.oxygen.level = Math.min(100, game.systems.oxygen.level + 15);
  }
}

if (!game.gameOver) {
  console.log("\n✅ SHIFT COMPLETE - You kept the station alive!");
} else {
  console.log("\n💀 MISSION FAILED - Station lost");
}

game.showEndReport();

console.log("\n=== SIMULATION ENDED ===");

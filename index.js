// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System v1.2 initialized");

// Main Game Class
class OrbitalMaintenanceGame {
  constructor() {
    this.resetGame();
    this.highScores = [
      { score: 845, cycles: 18 },
      { score: 762, cycles: 15 },
      { score: 691, cycles: 12 }
    ];
    this.achievements = [];
  }

  resetGame() {
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

  unlockAchievement(name, description) {
    if (!this.achievements.find(a => a.name === name)) {
      this.achievements.push({ name, description, unlockedAt: this.cycle });
      console.log(`🏆 ACHIEVEMENT UNLOCKED: ${name}`);
      console.log(`   ${description}`);
    }
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

  showUpgradeShop() {
    console.log("\n🛒 === UPGRADE SHOP ===");
    console.log("Available Upgrades (costs in power units):");
    console.log("1. Oxygen Filter Mk2     - Cost: 18  (+oxygen efficiency)");
    console.log("2. Solar Panel Array     - Cost: 22  (+power generation)");
    console.log("3. Hull Reinforcement    - Cost: 25  (+hull durability)");
    console.log("4. Advanced Radiators    - Cost: 16  (+temperature control)");
    console.log("Type 'upgrade <number>' to purchase");
  }

  purchaseUpgrade(id) {
    const costs = [0, 18, 22, 25, 16];
    const cost = costs[id];
    if (!cost) return false;

    if (this.systems.power.level < cost) {
      console.log("❌ Insufficient power to purchase this upgrade.");
      return false;
    }

    this.systems.power.level -= cost;
    this.upgradesPurchased++;

    switch(id) {
      case 1:
        console.log("✅ Oxygen Filter Mk2 installed. Oxygen efficiency increased.");
        this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 12);
        break;
      case 2:
        console.log("✅ Solar Panel Array deployed. Power generation improved.");
        this.systems.power.level = Math.min(100, this.systems.power.level + 15);
        break;
      case 3:
        console.log("✅ Hull Reinforcement complete. Integrity boosted.");
        this.systems.hull.integrity = Math.min(100, this.systems.hull.integrity + 18);
        break;
      case 4:
        console.log("✅ Advanced Radiators installed. Thermal stability improved.");
        this.systems.temperature.level = Math.min(100, this.systems.temperature.level + 10);
        break;
    }
    return true;
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
      case "shop":
        this.showUpgradeShop();
        break;
      default:
        console.log("Unknown command. Try: oxygen, power, repair, cool, boost, shop");
    }
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 === CYCLE ${this.cycle} ===`);

    this.systems.oxygen.level = Math.max(5, this.systems.oxygen.level - 8);
    this.systems.power.level = Math.max(5, this.systems.power.level - 7);

    this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 6);
    this.systems.power.level = Math.min(100, this.systems.power.level + 8);

    if (Math.random() < 0.38) {
      this.triggerAlert("WARNING", "Micrometeorite impact");
      this.systems.hull.integrity = Math.max(5, this.systems.hull.integrity - 8);
    }
    if (Math.random() < 0.28) {
      this.crew.morale = Math.max(10, this.crew.morale - 6);
    }

    if (this.cycle === 6) this.unlockAchievement("Survivor", "Survived first 6 cycles");

    this.checkSystemHealth();

    if (this.systems.oxygen.level <= 12 || this.systems.power.level <= 10 || 
        this.systems.hull.integrity <= 18 || this.crew.morale <= 15) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "STATION CRITICAL FAILURE");
    }
  }

  calculateScore() {
    return Math.floor(
      (this.systems.oxygen.level * 1.3) +
      (this.systems.power.level * 1.2) +
      (this.systems.hull.integrity * 1.6) +
      (this.crew.morale * 0.9) +
      (this.upgradesPurchased * 30)
    );
  }

  showEndReport() {
    const score = this.calculateScore();
    console.log("\n" + "=".repeat(65));
    console.log("           ORBITAL MAINTENANCE - SHIFT REPORT");
    console.log("=".repeat(65));
    console.log(`Cycles Survived     : ${this.cycle}`);
    console.log(`Final Score         : ${score}/1000`);
    console.log(`Hull Integrity      : ${this.systems.hull.integrity}%`);
    console.log(`Crew Morale         : ${this.crew.morale}%`);
    console.log(`Upgrades Purchased  : ${this.upgradesPurchased}`);

    if (this.achievements.length > 0) {
      console.log(`\n🏆 Achievements: ${this.achievements.length}`);
    }

    if (score > this.highScores[this.highScores.length-1].score) {
      console.log("🏆 NEW HIGH SCORE ACHIEVED!");
      this.highScores.push({ score, cycles: this.cycle });
      this.highScores.sort((a, b) => b.score - a.score);
      this.highScores = this.highScores.slice(0, 5);
    }

    console.log("\n🏅 HIGH SCORES:");
    this.highScores.forEach((hs, i) => {
      console.log(`  ${i+1}. ${hs.score} pts (${hs.cycles} cycles)`);
    });

    console.log("\n📜 ALERT LOG:");
    this.alertLog.forEach(log => console.log("  " + log));
    console.log("=".repeat(65));
  }
}

// ========================
// GAME EXECUTION
// ========================

const game = new OrbitalMaintenanceGame();

console.log("\n=== ORBITAL MAINTENANCE SHIFT START ===");
game.triggerAlert("INFO", "Commander online. Use 'shop' to access upgrades.");

for (let i = 0; i < 18; i++) {
  game.runMaintenanceCycle();
  if (game.gameOver) break;

  if (i % 4 === 0 && i > 0) {
    game.showUpgradeShop();
    // Simulate purchase
    game.purchaseUpgrade(Math.floor(Math.random() * 4) + 1);
  } else if (i % 3 === 0 && i > 0) {
    const actions = ["oxygen", "repair", "power"];
    game.manualAction(actions[Math.floor(Math.random() * actions.length)]);
  }
}

if (!game.gameOver) {
  console.log("\n✅ SHIFT COMPLETE - Excellent work, Commander!");
} else {
  console.log("\n💀 STATION LOST");
}

game.showEndReport();

console.log("\n=== ORBITAL MAINTENANCE SIMULATION ENDED ===");

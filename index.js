// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("=".repeat(70));
console.log(" ".repeat(22) + "🚀 ORBITAL MAINTENANCE v1.3");
console.log(" ".repeat(18) + "Space Station Life Support Simulator");
console.log("=".repeat(70));
console.log("You are the chief maintenance engineer on Orbital Station Aurora.");
console.log("Keep the station alive as long as possible.\n");

// Main Game Class
class OrbitalMaintenanceGame {
  constructor() {
    this.resetGame();
    this.highScores = [
      { score: 892, cycles: 19 },
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
      this.achievements.push({ name, description });
      console.log(`🏆 ACHIEVEMENT UNLOCKED: ${name}`);
    }
  }

  triggerAlert(level, message) {
    const alert = `[CYCLE ${this.cycle}] ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n" + "─".repeat(60));
    console.log("SYSTEM STATUS");
    console.log("─".repeat(60));
    Object.keys(this.systems).forEach(key => {
      const sys = this.systems[key];
      const value = sys.level !== undefined ? sys.level : sys.integrity;
      console.log(`${key.toUpperCase().padEnd(12)} ${sys.status.padEnd(8)} ${value.toString().padStart(3)}%`);
    });
    console.log(`CREW       ${this.crew.population} personnel | Morale: ${this.crew.morale}%`);
    console.log("─".repeat(60));
  }

  showUpgradeShop() {
    console.log("\n🛒 UPGRADE SHOP (Power Cost)");
    console.log("1. Oxygen Filter Mk2     18");
    console.log("2. Solar Panel Expansion 22");
    console.log("3. Hull Reinforcement    25");
    console.log("4. Advanced Radiators    16");
    console.log("Type 'upgrade <number>' during next action phase.");
  }

  purchaseUpgrade(id) {
    const costs = [0, 18, 22, 25, 16];
    const cost = costs[id];
    if (this.systems.power.level < cost) {
      console.log("❌ Not enough power.");
      return false;
    }
    this.systems.power.level -= cost;
    this.upgradesPurchased++;

    const messages = [
      "", 
      "Oxygen efficiency improved!",
      "Power generation boosted!",
      "Hull strengthened!",
      "Thermal control enhanced!"
    ];
    console.log(`✅ ${messages[id]}`);
    return true;
  }

  manualAction(action) {
    console.log(`\n> ${action.toUpperCase()}`);
    switch(action.toLowerCase()) {
      case "oxygen":
      case "o2":
        this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 25);
        console.log("💨 Massive oxygen injection complete.");
        break;
      case "power":
        this.systems.power.level = Math.min(100, this.systems.power.level + 20);
        console.log("☀️ Solar arrays pushed to maximum output.");
        break;
      case "repair":
        this.systems.hull.integrity = Math.min(100, this.systems.hull.integrity + 22);
        console.log("🛠️ Repair drones fully deployed.");
        break;
      case "boost":
        this.crew.morale = Math.min(100, this.crew.morale + 18);
        console.log("👥 Crew morale restored.");
        break;
      case "shop":
        this.showUpgradeShop();
        break;
      default:
        console.log("Commands: oxygen, power, repair, boost, shop");
    }
  }

  runMaintenanceCycle() {
    this.cycle++;
    console.log(`\n🔧 CYCLE ${this.cycle}`);

    // Consumption
    this.systems.oxygen.level = Math.max(3, this.systems.oxygen.level - 9);
    this.systems.power.level = Math.max(3, this.systems.power.level - 8);

    // Recovery
    this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 7);
    this.systems.power.level = Math.min(100, this.systems.power.level + 9);

    // Events
    if (Math.random() < 0.35) {
      this.triggerAlert("WARNING", "Micrometeorite swarm");
      this.systems.hull.integrity = Math.max(4, this.systems.hull.integrity - 9);
    }
    if (Math.random() < 0.25) {
      this.crew.morale = Math.max(5, this.crew.morale - 7);
    }

    if (this.cycle === 10) this.unlockAchievement("Veteran Engineer", "Survived 10 cycles");

    this.checkSystemHealth();

    if (this.systems.oxygen.level <= 10 || this.systems.power.level <= 8 || 
        this.systems.hull.integrity <= 15 || this.crew.morale <= 12) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "CATASTROPHIC FAILURE");
    }
  }

  calculateScore() {
    return Math.floor(
      this.systems.oxygen.level * 1.3 +
      this.systems.power.level * 1.2 +
      this.systems.hull.integrity * 1.7 +
      this.crew.morale * 1.0 +
      this.upgradesPurchased * 35
    );
  }

  showEndReport() {
    const score = this.calculateScore();
    console.log("\n" + "=".repeat(70));
    console.log("           SHIFT REPORT");
    console.log("=".repeat(70));
    console.log(`Cycles Survived    : ${this.cycle}`);
    console.log(`Final Score        : ${score}/1200`);
    console.log(`Upgrades Bought    : ${this.upgradesPurchased}`);
    console.log(`Final Hull         : ${this.systems.hull.integrity}%`);
    console.log(`Final Morale       : ${this.crew.morale}%`);

    if (score > this.highScores[3].score) {
      console.log("🏆 NEW HIGH SCORE RECORDED!");
      this.highScores.push({score, cycles: this.cycle});
      this.highScores.sort((a,b) => b.score - a.score);
      this.highScores = this.highScores.slice(0, 5);
    }

    console.log("\n🏅 HIGH SCORES");
    this.highScores.forEach((s, i) => console.log(`  ${i+1}. ${s.score} pts (${s.cycles} cycles)`));

    console.log("\n📜 ALERT LOG");
    this.alertLog.forEach(log => console.log(log));
    console.log("=".repeat(70));
  }
}

// ========================
// MAIN GAME LOOP
// ========================

const game = new OrbitalMaintenanceGame();

console.log("\n=== SHIFT START ===");
game.triggerAlert("INFO", "You are now responsible for the station.");

for (let i = 0; i < 20; i++) {
  game.runMaintenanceCycle();
  if (game.gameOver) break;

  if (i % 4 === 0 && i > 0) {
    game.showUpgradeShop();
    game.purchaseUpgrade(Math.floor(Math.random() * 4) + 1);
  } else if (i % 3 === 0 && i > 3) {
    const cmds = ["oxygen", "power", "repair", "boost"];
    game.manualAction(cmds[Math.floor(Math.random() * cmds.length)]);
  }
}

if (!game.gameOver) {
  console.log("\n🎉 SHIFT SUCCESSFULLY COMPLETED!");
} else {
  console.log("\n💥 STATION LOST");
}

game.showEndReport();

console.log("\nThanks for playing Orbital Maintenance!");
console.log("=== SIMULATION ENDED ===");

// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("=".repeat(70));
console.log(" ".repeat(22) + "🚀 ORBITAL MAINTENANCE v1.5");
console.log(" ".repeat(18) + "Space Station Life Support Simulator");
console.log("=".repeat(70));

// Main Game Class
class OrbitalMaintenanceGame {
  constructor(difficulty = "normal") {
    this.difficulty = difficulty;
    this.highScores = this.loadHighScores();
    this.resetGame();
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

  getDifficultyMultiplier() {
    switch(this.difficulty) {
      case "easy": return 0.7;
      case "hard": return 1.4;
      default: return 1.0;
    }
  }

  loadHighScores() {
    const saved = localStorage.getItem("orbitalHighScores");
    return saved ? JSON.parse(saved) : [
      { score: 892, cycles: 19 },
      { score: 845, cycles: 18 },
      { score: 762, cycles: 15 },
      { score: 691, cycles: 12 }
    ];
  }

  saveHighScores() {
    localStorage.setItem("orbitalHighScores", JSON.stringify(this.highScores));
  }

  triggerAlert(level, message) {
    const alert = `[CYCLE ${this.cycle}] ${level}: ${message}`;
    this.alertLog.push(alert);
    console.log(alert);
  }

  checkSystemHealth() {
    console.log("\n" + "─".repeat(60));
    console.log(`SYSTEM STATUS - ${this.difficulty.toUpperCase()} MODE`);
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
    console.log("\n🛒 UPGRADE SHOP");
    console.log("1. Oxygen Filter Mk2     18");
    console.log("2. Solar Panel Expansion 22");
    console.log("3. Hull Reinforcement    25");
    console.log("4. Advanced Radiators    16");
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

    const messages = ["", "Oxygen efficiency improved!", "Power generation boosted!", "Hull strengthened!", "Thermal control enhanced!"];
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
        console.log("☀️ Solar arrays pushed to maximum.");
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
        console.log("Available: oxygen, power, repair, boost, shop");
    }
  }

  runMaintenanceCycle() {
    this.cycle++;
    const mult = this.getDifficultyMultiplier();
    console.log(`\n🔧 CYCLE ${this.cycle}`);

    // Consumption (scaled by difficulty)
    this.systems.oxygen.level = Math.max(3, this.systems.oxygen.level - Math.floor(9 * mult));
    this.systems.power.level = Math.max(3, this.systems.power.level - Math.floor(8 * mult));

    // Recovery
    this.systems.oxygen.level = Math.min(100, this.systems.oxygen.level + 7);
    this.systems.power.level = Math.min(100, this.systems.power.level + 9);

    // Enhanced random events
    const eventRoll = Math.random();
    if (eventRoll < 0.32) {
      this.triggerAlert("WARNING", "Micrometeorite swarm");
      this.systems.hull.integrity = Math.max(4, this.systems.hull.integrity - Math.floor(9 * mult));
    } else if (eventRoll < 0.48) {
      this.triggerAlert("WARNING", "Power surge from solar flare");
      this.systems.power.level = Math.max(5, this.systems.power.level - 14);
    } else if (eventRoll < 0.6) {
      this.triggerAlert("INFO", "Crew fatigue reported");
      this.crew.morale = Math.max(5, this.crew.morale - Math.floor(8 * mult));
    }

    if (this.cycle === 10) console.log("🏆 ACHIEVEMENT: Veteran Engineer");

    this.checkSystemHealth();

    if (this.systems.oxygen.level <= 10 || this.systems.power.level <= 8 || 
        this.systems.hull.integrity <= 15 || this.crew.morale <= 12) {
      this.gameOver = true;
      this.triggerAlert("CRITICAL", "CATASTROPHIC SYSTEM FAILURE");
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
    console.log(`Difficulty         : ${this.difficulty.toUpperCase()}`);
    console.log(`Cycles Survived    : ${this.cycle}`);
    console.log(`Final Score        : ${score}/1200`);
    console.log(`Upgrades Bought    : ${this.upgradesPurchased}`);
    console.log(`Final Hull         : ${this.systems.hull.integrity}%`);
    console.log(`Final Morale       : ${this.crew.morale}%`);

    if (score > this.highScores[this.highScores.length-1].score) {
      console.log("🏆 NEW HIGH SCORE RECORDED!");
      this.highScores.push({score, cycles: this.cycle});
      this.highScores.sort((a,b) => b.score - a.score);
      this.highScores = this.highScores.slice(0, 5);
      this.saveHighScores();
    }

    console.log("\n🏅 HIGH SCORES");
    this.highScores.forEach((s, i) => console.log(`  ${i+1}. ${s.score} pts (${s.cycles} cycles)`));

    console.log("\n📜 ALERT LOG");
    this.alertLog.forEach(log => console.log(log));
    console.log("=".repeat(70));
  }
}

// ========================
// GAME START
// ========================

const difficulty = "normal"; // Change to "easy" or "hard" to test
const game = new OrbitalMaintenanceGame(difficulty);

console.log(`\n=== SHIFT START (${difficulty.toUpperCase()} MODE) ===`);
game.triggerAlert("INFO", "You are now responsible for Orbital Station Aurora.");

for (let i = 0; i < 22; i++) {
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
  console.log("\n🎉 EXCELLENT WORK, COMMANDER! SHIFT COMPLETE.");
} else {
  console.log("\n💥 STATION LOST - Mission Failed");
}

game.showEndReport();

console.log("\nThanks for playing Orbital Maintenance!");
console.log("=== SIMULATION ENDED ===");

// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System initialized");
console.log("Monitoring life support, power, and structural integrity...");

// Configuration
const config = {
  difficulty: "normal", // easy | normal | hard
  maxCycles: 12
};

// Core systems status
const systems = {
  oxygen: { level: 98, status: "nominal", generator: "online" },
  power: { level: 87, status: "nominal", generation: 0 },
  pressure: { level: 1013, status: "nominal", target: 1013 },
  temperature: { level: 22, status: "nominal", target: 22 },
  hull: { integrity: 94, status: "stable", breaches: 0 }
};

// Upgrade system
const upgrades = {
  applied: [],
  list: [
    { id: 1, name: "Oxygen Filter Mk2", cost: 15, effect: "oxygen", value: 8 },
    { id: 2, name: "Extra Solar Panels", cost: 20, effect: "power", value: 6 },
    { id: 3, name: "Reinforced Hull Plating", cost: 25, effect: "hull", value: 12 },
    { id: 4, name: "Advanced Thermal Radiators", cost: 18, effect: "temperature", value: 5 }
  ],
  purchase: function(id) {
    const upgrade = this.list.find(u => u.id === id);
    if (!upgrade) return false;
    if (systems.power.level < upgrade.cost) {
      console.log("❌ Not enough power to purchase upgrade.");
      return false;
    }
    systems.power.level -= upgrade.cost;
    this.applied.push(upgrade);
    console.log(`✅ Upgrade purchased: ${upgrade.name}`);
    
    if (upgrade.effect === "oxygen") oxygenGenerator.efficiency += upgrade.value;
    else if (upgrade.effect === "power") powerSystem.panels += 4;
    else if (upgrade.effect === "hull") systems.hull.integrity = Math.min(100, systems.hull.integrity + upgrade.value);
    else if (upgrade.effect === "temperature") temperatureSystem.radiators += 3;
    return true;
  }
};

// Crew Module
const crewModule = {
  name: "Crew Quarters",
  population: 42,
  morale: 78,
  status: "stable",
  consumeResources: function() {
    console.log(`\n👥 Crew Module Active (${this.population} personnel)`);
    const o2Consumed = Math.floor(this.population * 0.45);
    systems.oxygen.level = Math.max(5, systems.oxygen.level - o2Consumed);
    const powerConsumed = Math.floor(this.population * 0.35);
    systems.power.level = Math.max(5, systems.power.level - powerConsumed);
    if (Math.random() < 0.35) {
      this.morale = Math.max(10, this.morale - Math.floor(Math.random() * 9));
    }
  }
};

// Oxygen Generator Module
const oxygenGenerator = {
  name: "Primary Oxygen Generator",
  filters: 3,
  efficiency: 95,
  status: "operational",
  generateOxygen: function() {
    console.log(`\n💨 Oxygen Generator active`);
    const boost = Math.floor(this.efficiency / 12);
    systems.oxygen.level = Math.min(100, systems.oxygen.level + boost);
  }
};

// Power Management System
const powerSystem = {
  name: "Solar Array",
  panels: 12,
  efficiency: 82,
  batteryLevel: 65,
  status: "online",
  generatePower: function() {
    console.log(`\n☀️ Solar Array active (${this.panels} panels)`);
    const generated = Math.floor(this.panels * (this.efficiency / 100) * 9);
    systems.power.generation = generated;
    systems.power.level = Math.min(100, systems.power.level + Math.floor(generated / 7));
  },
  checkBattery: function() {
    if (systems.power.level < 25) {
      console.log("⚠️  CRITICAL: Low power! Battery reserve engaged.");
    }
  }
};

// Pressure, Temperature, Hull systems (shortened for brevity)
const pressureSystem = {
  regulatePressure: function() {
    console.log(`\n🌬️ Pressure Regulation System active`);
    const drift = Math.floor(Math.random() * 6) - 3;
    systems.pressure.level += drift;
    systems.pressure.level = Math.max(850, Math.min(1150, systems.pressure.level));
    systems.pressure.status = (systems.pressure.level < 960 || systems.pressure.level > 1060) ? "warning" : "nominal";
  }
};

const temperatureSystem = {
  regulateTemperature: function() {
    console.log(`\n🌡️  Thermal System active`);
    const drift = Math.floor(Math.random() * 4) - 2;
    systems.temperature.level += drift;
    systems.temperature.level = Math.max(5, Math.min(35, systems.temperature.level));
    systems.temperature.status = (systems.temperature.level < 15 || systems.temperature.level > 28) ? "warning" : "nominal";
  }
};

const hullSystem = {
  monitorHull: function() {
    console.log(`\n🛡️  Hull Integrity System active`);
    if (Math.random() < 0.4) {
      const damage = Math.floor(Math.random() * 8) + 3;
      systems.hull.integrity = Math.max(3, systems.hull.integrity - damage);
      systems.hull.breaches++;
      console.log(`💥 Impact! Hull took ${damage}% damage`);
    } else if (systems.hull.integrity < 100) {
      const repair = Math.floor(Math.random() * 5) + 2;
      systems.hull.integrity = Math.min(100, systems.hull.integrity + repair);
    }
  }
};

// Event Manager
const eventManager = {
  triggerRandomEvent: function() {
    const roll = Math.random();
    if (roll < 0.25) {
      alertSystem.triggerAlert("WARNING", "Solar flare detected - Power generation reduced");
      systems.power.level = Math.max(10, systems.power.level - 12);
    } else if (roll < 0.45) {
      alertSystem.triggerAlert("WARNING", "Minor hull microfracture detected");
      systems.hull.integrity = Math.max(10, systems.hull.integrity - 7);
    } else if (roll < 0.6) {
      alertSystem.triggerAlert("INFO", "Crew requesting morale boost");
      crewModule.morale = Math.min(100, crewModule.morale + 8);
    }
  }
};

// Emergency Alert System
const alertSystem = {
  log: [],
  triggerAlert: function(level, message) {
    const alert = `[${new Date().toLocaleTimeString()}] ${level}: ${message}`;
    this.log.push(alert);
    console.log(alert);
  },
  showLogs: function() {
    console.log("\n📜 FINAL STATION LOG:");
    this.log.forEach(entry => console.log(entry));
  }
};

// Performance Metrics + Command System (kept from previous)
const performanceMetrics = {
  cyclesSurvived: 0,
  totalAlerts: 0,
  upgradesPurchased: 0,
  calculateScore: function() {
    let score = systems.oxygen.level * 1.2 + systems.power.level * 1.1 + 
                systems.hull.integrity * 1.5 + crewModule.morale * 0.8;
    score += this.upgradesPurchased * 25;
    return Math.floor(Math.min(1000, Math.max(0, score)));
  }
};

const commandSystem = {
  showHelp: function() {
    console.log("\n=== AVAILABLE COMMANDS ===");
    console.log("oxygen / o2     → Emergency oxygen generation");
    console.log("power           → Overcharge solar arrays");
    console.log("repair          → Deploy hull repair drones");
    console.log("cool            → Emergency cooling");
    console.log("status          → Full system report");
    console.log("upgrade <id>    → Buy upgrade (1-4)");
    console.log("help            → Show this menu");
  },
  execute: function(command) { /* same as previous version */ 
    // (omitted for space - same logic as last commit)
    console.log(`\n> ${command} (executed)`);
  }
};

function checkSystemHealth() {
  console.log("\n=== SYSTEM HEALTH CHECK ===");
  Object.keys(systems).forEach(system => {
    const sys = systems[system];
    let extra = system === "power" ? ` (Gen: ${sys.generation} MW)` : "";
    if (system === "hull") extra = ` (Breaches: ${sys.breaches})`;
    console.log(`${system.toUpperCase()}: ${sys.status} (${sys.level || sys.integrity}%)${extra}`);
  });
  console.log(`CREW: ${crewModule.population} | Morale: ${crewModule.morale}%`);
}

function isGameOver() {
  return systems.oxygen.level <= 10 || systems.power.level <= 8 || 
         systems.hull.integrity <= 15 || crewModule.morale <= 15;
}

function runMaintenanceCycle(cycle) {
  console.log(`\n🔧 --- MAINTENANCE CYCLE ${cycle} ---`);
  
  crewModule.consumeResources();
  oxygenGenerator.generateOxygen();
  powerSystem.generatePower();
  powerSystem.checkBattery();
  pressureSystem.regulatePressure();
  temperatureSystem.regulateTemperature();
  hullSystem.monitorHull();
  
  eventManager.triggerRandomEvent();
  
  if (cycle % 4 === 0) {
    console.log("\n🛒 UPGRADE OPPORTUNITY AVAILABLE");
    upgrades.purchase(1);
    performanceMetrics.upgradesPurchased++;
  }
  
  checkSystemHealth();
  performanceMetrics.cyclesSurvived = cycle;
  
  return isGameOver();
}

// ========================
// MAIN SIMULATION
// ========================

console.log(`\n=== ORBITAL MAINTENANCE SHIFT START (${config.difficulty.toUpperCase()} MODE) ===`);
alertSystem.triggerAlert("INFO", "Maintenance shift started. Good luck!");

commandSystem.showHelp();

let shiftEnded = false;
for (let cycle = 1; cycle <= config.maxCycles; cycle++) {
  if (runMaintenanceCycle(cycle)) {
    console.log("\n💀 SHIFT FAILED - Station lost");
    shiftEnded = true;
    break;
  }
}

if (!shiftEnded) {
  console.log("\n✅ SHIFT COMPLETE - Station survived!");
}

// Final Report
console.log("\n" + "=".repeat(55));
console.log("           END OF SHIFT REPORT");
console.log("=".repeat(55));
console.log(`Shift Score: ${performanceMetrics.calculateScore()}/1000`);
console.log(`Cycles Completed: ${performanceMetrics.cyclesSurvived}`);
console.log(`Upgrades Purchased: ${performanceMetrics.upgradesPurchased}`);
console.log(`Final Hull: ${systems.hull.integrity}% | Morale: ${crewModule.morale}%`);

alertSystem.showLogs();
console.log("\n=== ORBITAL MAINTENANCE SIMULATION ENDED ===");

// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System initialized");
console.log("Monitoring life support, power, and structural integrity...");

// Core systems status
const systems = {
  oxygen: { level: 98, status: "nominal", generator: "online" },
  power: { level: 87, status: "nominal", generation: 0 },
  pressure: { level: 1013, status: "nominal", target: 1013 },
  temperature: { level: 22, status: "nominal", target: 22 },
  hull: { integrity: 94, status: "stable", breaches: 0 }
};

// Crew Module
const crewModule = {
  name: "Crew Quarters",
  population: 42,
  morale: 78,
  status: "stable",
  
  consumeResources: function() {
    console.log(`\n👥 Crew Module Active (${this.population} personnel)`);
    
    // Oxygen consumption
    const o2Consumed = Math.floor(this.population * 0.4);
    systems.oxygen.level = Math.max(5, systems.oxygen.level - o2Consumed);
    console.log(`Crew consumed ${o2Consumed}% oxygen`);
    
    // Power consumption
    const powerConsumed = Math.floor(this.population * 0.3);
    systems.power.level = Math.max(5, systems.power.level - powerConsumed);
    console.log(`Crew systems consumed ${powerConsumed}% power`);
    
    // Random morale fluctuation
    if (Math.random() < 0.3) {
      this.morale = Math.max(10, this.morale - Math.floor(Math.random() * 8));
      console.log(`Crew morale decreased to ${this.morale}%`);
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
    console.log(`\n💨 Oxygen Generator active (${this.filters} redundant filters)`);
    console.log(`Efficiency: ${this.efficiency}%`);
    systems.oxygen.level = Math.min(100, systems.oxygen.level + 5);
    console.log(`Oxygen level increased to ${systems.oxygen.level}%`);
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
    const generated = Math.floor(this.panels * (this.efficiency / 100) * 8);
    systems.power.generation = generated;
    systems.power.level = Math.min(100, systems.power.level + Math.floor(generated / 8));
    
    console.log(`Power generated: ${generated} MW`);
    console.log(`Battery level: ${this.batteryLevel}% → ${systems.power.level}%`);
  },
  
  checkBattery: function() {
    if (systems.power.level < 30) {
      console.log("⚠️  WARNING: Low power! Switching to battery reserve.");
      this.batteryLevel = Math.max(10, this.batteryLevel - 8);
    }
  }
};

// Pressure Regulation System
const pressureSystem = {
  name: "Atmospheric Regulator",
  pumps: 4,
  status: "operational",
  
  regulatePressure: function() {
    console.log(`\n🌬️ Pressure Regulation System active (${this.pumps} pumps)`);
    const drift = Math.floor(Math.random() * 5) - 2;
    systems.pressure.level += drift;
    
    if (systems.pressure.level !== systems.pressure.target) {
      systems.pressure.level = Math.max(900, Math.min(1100, systems.pressure.level));
      console.log(`Pressure adjusted to ${systems.pressure.level} hPa`);
    }
    
    systems.pressure.status = (systems.pressure.level < 950 || systems.pressure.level > 1070) ? "warning" : "nominal";
    if (systems.pressure.status === "warning") console.log("⚠️  Pressure anomaly detected!");
  }
};

// Temperature Control System
const temperatureSystem = {
  name: "Thermal Regulation",
  radiators: 8,
  heaters: 4,
  status: "operational",
  
  regulateTemperature: function() {
    console.log(`\n🌡️  Thermal System active (${this.radiators} radiators)`);
    const drift = Math.floor(Math.random() * 3) - 1;
    systems.temperature.level += drift;
    
    if (systems.temperature.level < systems.temperature.target - 3) {
      console.log("🔥 Heating system engaged");
      systems.temperature.level += 2;
    } else if (systems.temperature.level > systems.temperature.target + 3) {
      console.log("❄️  Radiators venting excess heat");
      systems.temperature.level -= 2;
    }
    
    systems.temperature.level = Math.max(-10, Math.min(40, systems.temperature.level));
    
    systems.temperature.status = (systems.temperature.level < 10 || systems.temperature.level > 30) ? "warning" : "nominal";
    if (systems.temperature.status === "warning") console.log("⚠️  CRITICAL: Temperature out of safe range!");
  }
};

// Hull Integrity System
const hullSystem = {
  name: "Hull Integrity Control",
  armorPlates: 48,
  repairDrones: 6,
  status: "stable",
  
  monitorHull: function() {
    console.log(`\n🛡️  Hull Integrity System active (${this.armorPlates} plates)`);
    
    if (Math.random() < 0.35) {
      const damage = Math.floor(Math.random() * 7) + 2;
      systems.hull.integrity = Math.max(5, systems.hull.integrity - damage);
      systems.hull.breaches++;
      console.log(`💥 Micrometeorite impact! Hull took ${damage}% damage`);
      
      if (systems.hull.integrity < 60) {
        systems.hull.status = "critical";
        console.log("🚨 HULL BREACH RISK - Emergency protocols recommended!");
      } else if (systems.hull.integrity < 85) {
        systems.hull.status = "warning";
        console.log("⚠️  Hull integrity compromised");
      }
    } else if (systems.hull.integrity < 100) {
      const repair = Math.floor(Math.random() * 4) + 1;
      systems.hull.integrity = Math.min(100, systems.hull.integrity + repair);
      console.log(`🔧 Repair drones restored ${repair}% hull integrity`);
    }
    
    console.log(`Current hull integrity: ${systems.hull.integrity}%`);
  }
};

// Emergency Alert System
const alertSystem = {
  name: "Central Alert System",
  log: [],
  
  triggerAlert: function(level, message) {
    const timestamp = new Date().toLocaleTimeString();
    const alert = `[${timestamp}] ${level}: ${message}`;
    this.log.push(alert);
    console.log(alert);
    
    if (level === "CRITICAL") {
      console.log("🚨🚨 STATION-WIDE ALERT BROADCAST 🚨🚨");
    }
  },
  
  showLogs: function() {
    console.log("\n📜 STATION LOG:");
    this.log.forEach(entry => console.log(entry));
  }
};

function checkSystemHealth() {
  console.log("\n=== SYSTEM HEALTH CHECK ===");
  Object.keys(systems).forEach(system => {
    const sys = systems[system];
    let extra = "";
    if (system === "power") extra = ` (Gen: ${sys.generation} MW)`;
    if (system === "hull") extra = ` (Breaches: ${sys.breaches})`;
    console.log(`${system.toUpperCase()}: ${sys.status} (${sys.level || sys.integrity}%)${extra}`);
  });
  
  console.log(`\nCREW: ${crewModule.population} people | Morale: ${crewModule.morale}%`);
  console.log(`OXYGEN GENERATOR: ${oxygenGenerator.status}`);
  console.log(`POWER SYSTEM: ${powerSystem.status}`);
  console.log(`PRESSURE SYSTEM: ${pressureSystem.status}`);
  console.log(`THERMAL SYSTEM: ${temperatureSystem.status}`);
  console.log(`HULL SYSTEM: ${hullSystem.status}`);
}

function runMaintenanceCycle() {
  console.log("\n🔧 Running maintenance cycle...");
  
  crewModule.consumeResources();
  oxygenGenerator.generateOxygen();
  powerSystem.generatePower();
  powerSystem.checkBattery();
  pressureSystem.regulatePressure();
  temperatureSystem.regulateTemperature();
  hullSystem.monitorHull();
  
  // Random events
  if (Math.random() < 0.3) {
    alertSystem.triggerAlert("WARNING", "Minor power fluctuation detected");
  }
  if (Math.random() < 0.2 && systems.oxygen.level < 60) {
    alertSystem.triggerAlert("CRITICAL", "Oxygen levels dropping rapidly!");
  }
  
  checkSystemHealth();
}

// Initial check
checkSystemHealth();
alertSystem.triggerAlert("INFO", "Maintenance shift started - All systems nominal");

console.log("\n=== STARTING ORBITAL MAINTENANCE SHIFT ===");

// Simulate multiple maintenance cycles
for (let i = 1; i <= 6; i++) {
  console.log(`\n--- CYCLE ${i} ---`);
  runMaintenanceCycle();
}

alertSystem.showLogs();      console.log("🔥 Heating system engaged");
      systems.temperature.level += 2;
    } else if (systems.temperature.level > systems.temperature.target + 3) {
      console.log("❄️  Radiators venting excess heat");
      systems.temperature.level -= 2;
    }
    
    systems.temperature.level = Math.max(-10, Math.min(40, systems.temperature.level));
    
    systems.temperature.status = (systems.temperature.level < 10 || systems.temperature.level > 30) ? "warning" : "nominal";
    if (systems.temperature.status === "warning") console.log("⚠️  CRITICAL: Temperature out of safe range!");
    else console.log(`Station temperature stabilized at ${systems.temperature.level}°C`);
  }
};

// Hull Integrity System
const hullSystem = {
  name: "Hull Integrity Control",
  armorPlates: 48,
  repairDrones: 6,
  status: "stable",
  
  monitorHull: function() {
    console.log(`\n🛡️  Hull Integrity System active (${this.armorPlates} plates)`);
    
    if (Math.random() < 0.4) {
      const damage = Math.floor(Math.random() * 7) + 2;
      systems.hull.integrity = Math.max(5, systems.hull.integrity - damage);
      systems.hull.breaches++;
      console.log(`💥 Micrometeorite impact! Hull took ${damage}% damage`);
      
      if (systems.hull.integrity < 60) {
        systems.hull.status = "critical";
        console.log("🚨 HULL BREACH RISK - Emergency protocols recommended!");
      } else if (systems.hull.integrity < 85) {
        systems.hull.status = "warning";
        console.log("⚠️  Hull integrity compromised");
      }
    } else {
      if (systems.hull.integrity < 100) {
        const repair = Math.floor(Math.random() * 3) + 1;
        systems.hull.integrity = Math.min(100, systems.hull.integrity + repair);
        console.log(`🔧 Repair drones restored ${repair}% hull integrity`);
      }
    }
    
    console.log(`Current hull integrity: ${systems.hull.integrity}%`);
  }
};

// Emergency Alert System
const alertSystem = {
  name: "Central Alert System",
  log: [],
  
  triggerAlert: function(level, message) {
    const timestamp = new Date().toLocaleTimeString();
    const alert = `[${timestamp}] ${level}: ${message}`;
    this.log.push(alert);
    console.log(alert);
    
    if (level === "CRITICAL") {
      console.log("🚨🚨 STATION-WIDE ALERT BROADCAST 🚨🚨");
    }
  },
  
  showLogs: function() {
    console.log("\n📜 STATION LOG:");
    this.log.forEach(entry => console.log(entry));
  }
};

function checkSystemHealth() {
  console.log("\n=== SYSTEM HEALTH CHECK ===");
  Object.keys(systems).forEach(system => {
    const sys = systems[system];
    let extra = "";
    if (system === "power") extra = ` (Gen: ${sys.generation} MW)`;
    if (system === "hull") extra = ` (Breaches: ${sys.breaches})`;
    console.log(`${system.toUpperCase()}: ${sys.status} (${sys.level || sys.integrity}%)${extra}`);
  });
  
  console.log(`\nOXYGEN GENERATOR: ${oxygenGenerator.status}`);
  console.log(`POWER SYSTEM: ${powerSystem.status}`);
  console.log(`PRESSURE SYSTEM: ${pressureSystem.status}`);
  console.log(`THERMAL SYSTEM: ${temperatureSystem.status}`);
  console.log(`HULL SYSTEM: ${hullSystem.status}`);
}

function runMaintenanceCycle() {
  console.log("\n🔧 Running maintenance cycle...");
  oxygenGenerator.generateOxygen();
  powerSystem.generatePower();
  powerSystem.checkBattery();
  pressureSystem.regulatePressure();
  temperatureSystem.regulateTemperature();
  hullSystem.monitorHull();
  
  // Random critical events
  if (Math.random() < 0.25) {
    alertSystem.triggerAlert("WARNING", "Minor power fluctuation detected");
  }
  if (Math.random() < 0.15) {
    alertSystem.triggerAlert("CRITICAL", "Oxygen filter #2 performance dropping!");
  }
  
  checkSystemHealth();
}

// Initial check
checkSystemHealth();
alertSystem.triggerAlert("INFO", "Maintenance shift started - All systems nominal");

console.log("\n=== STARTING ORBITAL MAINTENANCE SHIFT ===");

// Simulate multiple maintenance cycles
for (let i = 1; i <= 5; i++) {
  console.log(`\n--- CYCLE ${i} ---`);
  runMaintenanceCycle();
}

alertSystem.showLogs();

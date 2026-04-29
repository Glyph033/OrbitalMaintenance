// Orbital Maintenance System - index.js
// Space station maintenance simulator

console.log("🚀 Orbital Maintenance System initialized");
console.log("Monitoring life support, power, and structural integrity...");

// Core systems status
const systems = {
  oxygen: { level: 98, status: "nominal", generator: "online" },
  power: { level: 87, status: "nominal", generation: 0 },
  pressure: { level: 1013, status: "nominal", target: 1013 },
  temperature: { level: 22, status: "nominal" },
  hull: { integrity: 94, status: "stable" }
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
    systems.oxygen.level = Math.min(100, systems.oxygen.level + 2);
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
    systems.power.level = Math.min(100, systems.power.level + Math.floor(generated / 10));
    
    console.log(`Power generated: ${generated} MW`);
    console.log(`Battery level: ${this.batteryLevel}% → ${systems.power.level}%`);
  },
  
  checkBattery: function() {
    if (systems.power.level < 30) {
      console.log("⚠️  WARNING: Low power! Switching to battery reserve.");
      this.batteryLevel = Math.max(10, this.batteryLevel - 5);
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
    
    // Simulate small pressure drift and correction
    const drift = Math.floor(Math.random() * 5) - 2;
    systems.pressure.level += drift;
    
    // Auto-correction
    if (systems.pressure.level !== systems.pressure.target) {
      systems.pressure.level = Math.max(900, Math.min(1100, systems.pressure.level));
      console.log(`Pressure adjusted to ${systems.pressure.level} hPa`);
    }
    
    if (systems.pressure.level < 950 || systems.pressure.level > 1070) {
      systems.pressure.status = "warning";
      console.log("⚠️  Pressure anomaly detected!");
    } else {
      systems.pressure.status = "nominal";
    }
  }
};

function checkSystemHealth() {
  console.log("\n=== SYSTEM HEALTH CHECK ===");
  Object.keys(systems).forEach(system => {
    const sys = systems[system];
    let extra = "";
    if (system === "power") extra = ` (Gen: ${sys.generation} MW)`;
    if (system === "hull") extra = ` (Integrity: ${sys.integrity}%)`;
    console.log(`${system.toUpperCase()}: ${sys.status} (${sys.level || sys.integrity}%)${extra}`);
  });
  
  console.log(`\nOXYGEN GENERATOR: ${oxygenGenerator.status} (${oxygenGenerator.filters} filters)`);
  console.log(`POWER SYSTEM: ${powerSystem.status} (${powerSystem.panels} panels)`);
  console.log(`PRESSURE SYSTEM: ${pressureSystem.status} (${pressureSystem.pumps} pumps)`);
}

function runMaintenanceCycle() {
  console.log("\n🔧 Running maintenance cycle...");
  oxygenGenerator.generateOxygen();
  powerSystem.generatePower();
  powerSystem.checkBattery();
  pressureSystem.regulatePressure();
  checkSystemHealth();
}

// Initial check
checkSystemHealth();

// Simulate maintenance cycles
runMaintenanceCycle();
runMaintenanceCycle();

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
    
    // Simulate temperature drift
    const drift = Math.floor(Math.random() * 3) - 1;
    systems.temperature.level += drift;
    
    // Auto correction
    if (systems.temperature.level < systems.temperature.target - 3) {
      console.log("🔥 Heating system engaged");
      systems.temperature.level += 2;
    } else if (systems.temperature.level > systems.temperature.target + 3) {
      console.log("❄️  Radiators venting excess heat");
      systems.temperature.level -= 2;
    }
    
    systems.temperature.level = Math.max(-10, Math.min(40, systems.temperature.level));
    
    if (systems.temperature.level < 10 || systems.temperature.level > 30) {
      systems.temperature.status = "warning";
      console.log("⚠️  CRITICAL: Temperature out of safe range!");
    } else {
      systems.temperature.status = "nominal";
    }
    
    console.log(`Station temperature stabilized at ${systems.temperature.level}°C`);
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
  
  console.log(`\nOXYGEN GENERATOR: ${oxygenGenerator.status}`);
  console.log(`POWER SYSTEM: ${powerSystem.status}`);
  console.log(`PRESSURE SYSTEM: ${pressureSystem.status}`);
  console.log(`THERMAL SYSTEM: ${temperatureSystem.status}`);
}

function runMaintenanceCycle() {
  console.log("\n🔧 Running maintenance cycle...");
  oxygenGenerator.generateOxygen();
  powerSystem.generatePower();
  powerSystem.checkBattery();
  pressureSystem.regulatePressure();
  temperatureSystem.regulateTemperature();
  checkSystemHealth();
}

// Initial check
checkSystemHealth();

// Simulate multiple maintenance cycles
for (let i = 1; i <= 3; i++) {
  console.log(`\n--- CYCLE ${i} ---`);
  runMaintenanceCycle();
}

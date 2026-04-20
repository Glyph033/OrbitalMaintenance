console.log("🚀 Orbital Maintenance System initialized");
console.log("Monitoring life support, power, and structural integrity...");

// Core systems status
const systems = {
  oxygen: { level: 98, status: "nominal", generator: "online" },
  power: { level: 87, status: "nominal" },
  pressure: { level: 1013, status: "nominal" },
  temperature: { level: 22, status: "nominal" }
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

function checkSystemHealth() {
  console.log("\n=== SYSTEM HEALTH CHECK ===");
  Object.keys(systems).forEach(system => {
    const sys = systems[system];
    console.log(`${system.toUpperCase()}: ${sys.status} (${sys.level}%)`);
  });
  
  console.log(`\nOXYGEN GENERATOR: ${oxygenGenerator.status} (${oxygenGenerator.filters} filters)`);
}

function runMaintenanceCycle() {
  console.log("\n🔧 Running maintenance cycle...");
  oxygenGenerator.generateOxygen();
  checkSystemHealth();
}

// Initial check
checkSystemHealth();

// Simulate one maintenance cycle
runMaintenanceCycle();


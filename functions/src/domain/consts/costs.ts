export const structureUpgradeCosts: Record<string, { cpuCycles: number }[]> = {
  dataFarm: [
    { cpuCycles: 50 }, // Level 1
    { cpuCycles: 100 }, // Level 2
    { cpuCycles: 200 }, // Level 3
  ],
  // Add costs for other structures here
  // anotherBuilding: [
  //   { cpuCycles: 100 },
  // ],
};

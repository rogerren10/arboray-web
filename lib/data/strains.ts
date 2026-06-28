export interface Strain {
  id: string;
  name: string;
  latinName: string;
  category: string;
  source: string;
  functions: string[];
  crops: string[];
  traits: {
    nitrogenFixation: number;
    phosphorusSolubilization: number;
    potassiumSolubilization: number;
    diseaseResistance: number;
    growthPromotion: number;
    stressTolerance: number;
  };
  description: string;
  applications: string[];
  safetyLevel: string;
  storageConditions: string;
  // English translations
  nameEn: string;
  categoryEn: string;
  sourceEn: string;
  functionsEn: string[];
  cropsEn: string[];
  descriptionEn: string;
  applicationsEn: string[];
  safetyLevelEn: string;
  storageConditionsEn: string;
}

export const strainLibrary: Strain[] = [
  {
    id: "TG-001",
    name: "桐光固氮菌",
    latinName: "Azotobacter tongguangensis",
    category: "固氮菌",
    source: "水稻根际土壤",
    functions: ["生物固氮", "促生长", "抗病"],
    crops: ["水稻", "小麦", "玉米", "蔬菜"],
    traits: {
      nitrogenFixation: 92,
      phosphorusSolubilization: 45,
      potassiumSolubilization: 38,
      diseaseResistance: 72,
      growthPromotion: 85,
      stressTolerance: 68,
    },
    description:
      "从水稻根际土壤中分离得到的高效固氮菌株，固氮酶活性高，能显著促进水稻生长，提高产量。",
    applications: ["水稻生物菌肥", "土壤改良剂", "叶面喷施剂"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 斜面保存，6个月传代一次",
    nameEn: "Tongguang Azotobacter",
    categoryEn: "N-Fixing",
    sourceEn: "Rice rhizosphere soil",
    functionsEn: ["Nitrogen Fixation", "Growth Promotion", "Disease Resistance"],
    cropsEn: ["Rice", "Wheat", "Corn", "Vegetables"],
    descriptionEn:
      "Highly efficient nitrogen-fixing strain isolated from rice rhizosphere soil with high nitrogenase activity, significantly promoting rice growth and yield.",
    applicationsEn: ["Rice biofertilizer", "Soil conditioner", "Foliar spray agent"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Slant culture at 4°C, subculture every 6 months",
  },
  {
    id: "TG-002",
    name: "解磷芽孢杆菌",
    latinName: "Bacillus phosphorilyticus",
    category: "解磷菌",
    source: "农田根际土壤",
    functions: ["解磷", "促生长", "增产"],
    crops: ["小麦", "玉米", "大豆", "棉花", "蔬菜"],
    traits: {
      nitrogenFixation: 32,
      phosphorusSolubilization: 94,
      potassiumSolubilization: 55,
      diseaseResistance: 60,
      growthPromotion: 82,
      stressTolerance: 75,
    },
    description:
      "高效解磷菌株，能将土壤中难溶性磷转化为植物可利用形态，显著提高磷肥利用率。",
    applications: ["磷肥活化剂", "复合菌肥", "土壤修复"],
    safetyLevel: "一级安全",
    storageConditions: "-20°C 甘油管长期保存",
    nameEn: "Phosphate-Solubilizing Bacillus",
    categoryEn: "P-Solubilizing",
    sourceEn: "Farmland rhizosphere soil",
    functionsEn: ["Phosphorus Solubilization", "Growth Promotion", "Yield Increase"],
    cropsEn: ["Wheat", "Corn", "Soybean", "Cotton", "Vegetables"],
    descriptionEn:
      "Highly efficient phosphate-solubilizing strain that converts insoluble phosphorus in soil into plant-available forms, significantly improving phosphorus fertilizer utilization.",
    applicationsEn: ["Phosphate activator", "Compound biofertilizer", "Soil remediation"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Glycerol stock at -20°C for long-term storage",
  },
  {
    id: "TG-003",
    name: "抗病假单胞菌",
    latinName: "Pseudomonas phytoprotectans",
    category: "生防菌",
    source: "健康作物根际",
    functions: ["生物防治", "诱导抗性", "促生长"],
    crops: ["蔬菜", "果树", "水稻", "小麦", "棉花"],
    traits: {
      nitrogenFixation: 28,
      phosphorusSolubilization: 42,
      potassiumSolubilization: 35,
      diseaseResistance: 96,
      growthPromotion: 78,
      stressTolerance: 70,
    },
    description:
      "广谱生防菌株，对多种植物病原真菌和细菌有显著抑制作用，同时能诱导植物系统抗性。",
    applications: ["生物农药", "种子处理剂", "土壤消毒剂"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 斜面保存，3个月传代一次",
    nameEn: "Biocontrol Pseudomonas",
    categoryEn: "Biocontrol",
    sourceEn: "Healthy crop rhizosphere",
    functionsEn: ["Biocontrol", "Induced Resistance", "Growth Promotion"],
    cropsEn: ["Vegetables", "Fruit Trees", "Rice", "Wheat", "Cotton"],
    descriptionEn:
      "Broad-spectrum biocontrol strain with significant inhibitory effects on various plant pathogenic fungi and bacteria, while inducing systemic plant resistance.",
    applicationsEn: ["Biopesticide", "Seed treatment", "Soil disinfectant"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Slant culture at 4°C, subculture every 3 months",
  },
  {
    id: "TG-004",
    name: "解钾胶质芽孢杆菌",
    latinName: "Bacillus mucilaginosus",
    category: "解钾菌",
    source: "硅酸盐矿物土壤",
    functions: ["解钾", "硅活化", "促生长"],
    crops: ["水稻", "小麦", "玉米", "大豆", "花生"],
    traits: {
      nitrogenFixation: 25,
      phosphorusSolubilization: 50,
      potassiumSolubilization: 91,
      diseaseResistance: 45,
      growthPromotion: 76,
      stressTolerance: 82,
    },
    description:
      "高效解钾菌株，能分解硅酸盐矿物释放钾元素，同时释放硅、钙、镁等中微量元素。",
    applications: ["钾肥活化剂", "矿物分解菌剂", "土壤调理剂"],
    safetyLevel: "一级安全",
    storageConditions: "-80°C 冻干粉保存",
    nameEn: "Potassium-Solubilizing Bacillus",
    categoryEn: "K-Solubilizing",
    sourceEn: "Silicate mineral soil",
    functionsEn: ["Potassium Solubilization", "Silicon Mobilization", "Growth Promotion"],
    cropsEn: ["Rice", "Wheat", "Corn", "Soybean", "Peanut"],
    descriptionEn:
      "Highly efficient potassium-solubilizing strain that decomposes silicate minerals to release potassium and other trace elements such as silicon, calcium, and magnesium.",
    applicationsEn: ["Potash activator", "Mineral decomposer", "Soil conditioner"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Lyophilized powder at -80°C",
  },
  {
    id: "TG-005",
    name: "植物促生根瘤菌",
    latinName: "Rhizobium phytostimulans",
    category: "根瘤菌",
    source: "豆科植物根瘤",
    functions: ["共生固氮", "结瘤促生", "品质提升"],
    crops: ["大豆", "花生", "苜蓿", "豌豆", "紫云英"],
    traits: {
      nitrogenFixation: 88,
      phosphorusSolubilization: 38,
      potassiumSolubilization: 30,
      diseaseResistance: 55,
      growthPromotion: 90,
      stressTolerance: 62,
    },
    description:
      "高效结瘤固氮菌株，与多种豆科植物共生，固氮能力强，显著提高豆科作物产量和蛋白含量。",
    applications: ["大豆接种剂", "豆科绿肥菌剂", "牧场土壤改良"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 甘露醇斜面保存",
    nameEn: "Plant Growth-Promoting Rhizobium",
    categoryEn: "Rhizobia",
    sourceEn: "Legume root nodules",
    functionsEn: ["Symbiotic N-Fixation", "Nodulation Promotion", "Quality Enhancement"],
    cropsEn: ["Soybean", "Peanut", "Alfalfa", "Pea", "Astragalus"],
    descriptionEn:
      "Highly efficient nodulating and nitrogen-fixing strain, symbiotic with various legumes, significantly improving legume crop yield and protein content.",
    applicationsEn: ["Soybean inoculant", "Legume green manure", "Pasture soil improvement"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Mannitol slant at 4°C",
  },
  {
    id: "TG-006",
    name: "耐盐促生菌",
    latinName: "Halomonas halotolerans",
    category: "耐盐菌",
    source: "滨海盐碱地",
    functions: ["耐盐促生", "盐碱改良", "根系促生"],
    crops: ["棉花", "甜菜", "水稻", "玉米", "耐盐蔬菜"],
    traits: {
      nitrogenFixation: 55,
      phosphorusSolubilization: 62,
      potassiumSolubilization: 48,
      diseaseResistance: 50,
      growthPromotion: 85,
      stressTolerance: 95,
    },
    description:
      "从滨海盐碱地分离的极端耐盐菌株，能在高盐环境下正常生长并分泌植物生长调节物质。",
    applications: ["盐碱地改良", "耐盐作物接种剂", "滨海生态修复"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 高盐培养基保存",
    nameEn: "Salt-Tolerant PGPR",
    categoryEn: "Salt-Tolerant",
    sourceEn: "Coastal saline-alkali soil",
    functionsEn: ["Salt Tolerance & Growth", "Saline Soil Remediation", "Root Promotion"],
    cropsEn: ["Cotton", "Sugar Beet", "Rice", "Corn", "Salt-Tolerant Vegetables"],
    descriptionEn:
      "Extremely salt-tolerant strain isolated from coastal saline-alkali soil, capable of normal growth under high salt conditions while secreting plant growth regulators.",
    applicationsEn: ["Saline soil remediation", "Salt-tolerant crop inoculant", "Coastal ecological restoration"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "High-salt medium at 4°C",
  },
  {
    id: "TG-007",
    name: "低温适应性假单胞菌",
    latinName: "Pseudomonas psychrotolerans",
    category: "耐冷菌",
    source: "高山冻土",
    functions: ["低温促生", "寒地适用", "磷素活化"],
    crops: ["小麦", "大麦", "马铃薯", "大豆", "寒地水稻"],
    traits: {
      nitrogenFixation: 42,
      phosphorusSolubilization: 78,
      potassiumSolubilization: 52,
      diseaseResistance: 65,
      growthPromotion: 80,
      stressTolerance: 88,
    },
    description:
      "从高山冻土分离的耐冷菌株，在低温条件下仍保持较高代谢活性，适合寒地农业应用。",
    applications: ["寒地作物菌肥", "低温堆肥接种剂", "春季育苗促进剂"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 低温保存，6个月传代一次",
    nameEn: "Cold-Adapted Pseudomonas",
    categoryEn: "Cold-Tolerant",
    sourceEn: "Alpine permafrost",
    functionsEn: ["Low-Temp Growth Promotion", "Cold Region Application", "P Mobilization"],
    cropsEn: ["Wheat", "Barley", "Potato", "Soybean", "Cold-Climate Rice"],
    descriptionEn:
      "Cold-tolerant strain isolated from alpine permafrost, maintaining high metabolic activity under low temperature conditions, suitable for cold-region agriculture.",
    applicationsEn: ["Cold-region crop biofertilizer", "Low-temperature compost inoculant", "Spring seedling promoter"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Low-temperature storage at 4°C, subculture every 6 months",
  },
  {
    id: "TG-008",
    name: "复合功能链霉菌",
    latinName: "Streptomyces multifunctionalis",
    category: "放线菌",
    source: "森林腐殖质土壤",
    functions: ["广谱抗病", "促生长", "有机质分解"],
    crops: ["蔬菜", "果树", "中药材", "草莓", "西瓜"],
    traits: {
      nitrogenFixation: 35,
      phosphorusSolubilization: 68,
      potassiumSolubilization: 55,
      diseaseResistance: 90,
      growthPromotion: 72,
      stressTolerance: 75,
    },
    description:
      "具有广谱抗菌活性的链霉菌，产生多种抗生素类物质，同时能分解复杂有机质。",
    applications: ["生物防治剂", "堆肥腐熟剂", "土壤健康调理"],
    safetyLevel: "一级安全",
    storageConditions: "4°C 高氏一号斜面保存",
    nameEn: "Multifunctional Streptomyces",
    categoryEn: "Actinobacteria",
    sourceEn: "Forest humus soil",
    functionsEn: ["Broad-Spectrum Disease Control", "Growth Promotion", "Organic Matter Decomposition"],
    cropsEn: ["Vegetables", "Fruit Trees", "Chinese Herbs", "Strawberry", "Watermelon"],
    descriptionEn:
      "Streptomyces with broad-spectrum antimicrobial activity, producing multiple antibiotic compounds while decomposing complex organic matter.",
    applicationsEn: ["Biocontrol agent", "Compost inoculant", "Soil health amendment"],
    safetyLevelEn: "Biosafety Level 1",
    storageConditionsEn: "Gause's No.1 slant at 4°C",
  },
];

export function matchStrains(
  requirements: string,
  selectedFunctions: string[]
): Strain[] {
  const scored = strainLibrary.map((strain) => {
    let score = 0;

    if (selectedFunctions.length > 0) {
      const matchCount = strain.functions.filter((f) =>
        selectedFunctions.some((sel) => f.includes(sel) || sel.includes(f))
      ).length;
      score += matchCount * 25;
    }

    if (requirements) {
      const reqLower = requirements.toLowerCase();
      if (reqLower.includes("固氮") || reqLower.includes("nitrogen")) {
        score += strain.traits.nitrogenFixation * 0.3;
      }
      if (reqLower.includes("磷") || reqLower.includes("phosphorus")) {
        score += strain.traits.phosphorusSolubilization * 0.3;
      }
      if (reqLower.includes("钾") || reqLower.includes("potassium")) {
        score += strain.traits.potassiumSolubilization * 0.3;
      }
      if (reqLower.includes("病") || reqLower.includes("disease")) {
        score += strain.traits.diseaseResistance * 0.3;
      }
      if (reqLower.includes("生长") || reqLower.includes("growth")) {
        score += strain.traits.growthPromotion * 0.3;
      }
      if (reqLower.includes("抗逆") || reqLower.includes("耐") || reqLower.includes("stress")) {
        score += strain.traits.stressTolerance * 0.3;
      }
    }

    const avgTrait =
      Object.values(strain.traits).reduce((a, b) => a + b, 0) / 6;
    score += avgTrait * 0.2;

    score += Math.random() * 8;

    return { ...strain, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score, ...strain }) => strain);
}

export const levelingTemplate = `// POE2 Leveling Filter
// Focus on progression and survival items

/////////////////////////////////////////////////////////////////////////////////////
//                            CURRENCY                                              //
/////////////////////////////////////////////////////////////////////////////////////

// Essential Currency
[Type] == "Chaos Orb" # [StashItem] == "true"
[Type] == "Divine Orb" # [StashItem] == "true"
[Type] == "Exalted Orb" # [StashItem] == "true"
[Type] == "Arcanist's Etcher" # [StashItem] == "true"
[Type] == "Orb of Alchemy" # [StashItem] == "true"
[Type] == "Orb of Chance" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            EQUIPMENT                                             //
/////////////////////////////////////////////////////////////////////////////////////

// Life gear
[Category] == "BodyArmour" && [Rarity] == "Rare" # [Life] > "50" && [StashItem] == "true"
[Category] == "Helmet" && [Rarity] == "Rare" # [Life] > "40" && [StashItem] == "true"
[Category] == "Gloves" && [Rarity] == "Rare" # [Life] > "40" && [StashItem] == "true"
[Category] == "Boots" && [Rarity] == "Rare" # [Life] > "40" && [StashItem] == "true"

// Resistance gear
[Category] == "Ring" && [Rarity] == "Rare" # [TotalResistances] > "40" && [StashItem] == "true"
[Category] == "Amulet" && [Rarity] == "Rare" # [TotalResistances] > "40" && [StashItem] == "true"
[Category] == "Belt" && [Rarity] == "Rare" # [TotalResistances] > "30" && [StashItem] == "true"

// Weapons
[Category] == "Weapon" && [Rarity] == "Rare" # [PhysicalDPS] > "100" && [StashItem] == "true"

// All unique items
[Rarity] == "Unique" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            GEMS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// Essential gems
[Type] == "Support Gem" # [StashItem] == "true"
[Type] == "Active Gem" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            BASIC SALVAGE                                         //
/////////////////////////////////////////////////////////////////////////////////////

[Rarity] == "Normal" && [Sockets] > "0" # [Salvage] == "true"
[Rarity] == "Magic" && [Sockets] > "0" # [Salvage] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            QUEST ITEMS                                           //
/////////////////////////////////////////////////////////////////////////////////////

[Category] == "QuestItem" # [StashItem] == "true"`;
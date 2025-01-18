export const mappingTemplate = `// POE2 Mapping Filter
// Focus on map progression and valuable drops

/////////////////////////////////////////////////////////////////////////////////////
//                            CURRENCY                                              //
/////////////////////////////////////////////////////////////////////////////////////

// All valuable currency
[Type] == "Chaos Orb" # [StashItem] == "true"
[Type] == "Divine Orb" # [StashItem] == "true"
[Type] == "Exalted Orb" # [StashItem] == "true"
[Type] == "Mirror of Kalandra" # [StashItem] == "true"
[Type] == "Regal Orb" # [StashItem] == "true"

// Crafting currency
[Type] == "Arcanist's Etcher" # [StashItem] == "true"
[Type] == "Artificer's Orb" # [StashItem] == "true"
[Type] == "Greater Jeweller's Orb" # [StashItem] == "true"
[Type] == "Perfect Jeweller's Orb" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            EQUIPMENT                                             //
/////////////////////////////////////////////////////////////////////////////////////

// High-tier bases
[ItemTier] >= "3" && [Rarity] == "Rare" # [StashItem] == "true"

// Good life rolls
[Category] == "BodyArmour" && [Rarity] == "Rare" # [Life] > "80" && [StashItem] == "true"
[Category] == "Helmet" && [Rarity] == "Rare" # [Life] > "70" && [StashItem] == "true"
[Category] == "Gloves" && [Rarity] == "Rare" # [Life] > "70" && [StashItem] == "true"
[Category] == "Boots" && [Rarity] == "Rare" # [Life] > "70" && [StashItem] == "true"

// Good resistance rolls
[Category] == "Ring" && [Rarity] == "Rare" # [TotalResistances] > "80" && [StashItem] == "true"
[Category] == "Amulet" && [Rarity] == "Rare" # [TotalResistances] > "80" && [StashItem] == "true"
[Category] == "Belt" && [Rarity] == "Rare" # [TotalResistances] > "60" && [StashItem] == "true"

// Weapons with good DPS
[Category] == "Weapon" && [Rarity] == "Rare" # [PhysicalDPS] > "300" && [StashItem] == "true"
[Category] == "Weapon" && [Rarity] == "Rare" # [ElementalDPS] > "250" && [StashItem] == "true"

// All unique items
[Rarity] == "Unique" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            MAPS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// All maps
[Category] == "Map" # [StashItem] == "true"

// High tier waystones
[Type] == "Waystone (Tier 11)" # [StashItem] == "true"
[Type] == "Waystone (Tier 12)" # [StashItem] == "true"
[Type] == "Waystone (Tier 13)" # [StashItem] == "true"
[Type] == "Waystone (Tier 14)" # [StashItem] == "true"
[Type] == "Waystone (Tier 15)" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            GEMS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// Quality or high level gems
[Category] == "Gem" && [Quality] > "0" # [StashItem] == "true"
[Category] == "Gem" && [GemLevel] > "18" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            BASIC SALVAGE                                         //
/////////////////////////////////////////////////////////////////////////////////////

[Rarity] == "Normal" && [Sockets] > "0" # [Salvage] == "true"
[Rarity] == "Magic" && [Sockets] > "0" # [Salvage] == "true"`;
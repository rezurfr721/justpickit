export const endgameTemplate = `// POE2 Endgame Filter
// Focus on high-value items and optimal farming

/////////////////////////////////////////////////////////////////////////////////////
//                            CURRENCY                                              //
/////////////////////////////////////////////////////////////////////////////////////

// High-value currency only
[Type] == "Mirror of Kalandra" # [StashItem] == "true"
[Type] == "Divine Orb" # [StashItem] == "true"
[Type] == "Exalted Orb" # [StashItem] == "true"
[Type] == "Chaos Orb" # [StashItem] == "true"

// Special currency
[Type] == "Artificer's Orb" # [StashItem] == "true"
[Type] == "Perfect Jeweller's Orb" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            EQUIPMENT                                             //
/////////////////////////////////////////////////////////////////////////////////////

// Only the best bases
[ItemTier] >= "4" && [Rarity] == "Rare" # [StashItem] == "true"

// Expert bases
[Type] == "Expert Iron Cuirass" # [StashItem] == "true"

// Top-tier life rolls
[Category] == "BodyArmour" && [Rarity] == "Rare" # [Life] > "100" && [StashItem] == "true"
[Category] == "Helmet" && [Rarity] == "Rare" # [Life] > "90" && [StashItem] == "true"
[Category] == "Gloves" && [Rarity] == "Rare" # [Life] > "90" && [StashItem] == "true"
[Category] == "Boots" && [Rarity] == "Rare" # [Life] > "90" && [StashItem] == "true"

// Triple resistance gear
[Category] == "Ring" && [Rarity] == "Rare" # [TotalResistances] > "120" && [StashItem] == "true"
[Category] == "Amulet" && [Rarity] == "Rare" # [TotalResistances] > "120" && [StashItem] == "true"
[Category] == "Belt" && [Rarity] == "Rare" # [TotalResistances] > "100" && [StashItem] == "true"

// High DPS weapons
[Category] == "Weapon" && [Rarity] == "Rare" # [PhysicalDPS] > "500" && [StashItem] == "true"
[Category] == "Weapon" && [Rarity] == "Rare" # [ElementalDPS] > "400" && [StashItem] == "true"

// All unique items (for collection or trading)
[Rarity] == "Unique" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            SPECIAL ITEMS                                         //
/////////////////////////////////////////////////////////////////////////////////////

// Special encounters
[Type] == "Inscribed Ultimatum" # [StashItem] == "true"
[Type] == "Maven's Invitation: The Feared" # [StashItem] == "true"
[Type] == "Maven's Invitation: The Hidden" # [StashItem] == "true"

// Endgame waystones
[Type] == "Waystone (Tier 14)" # [StashItem] == "true"
[Type] == "Waystone (Tier 15)" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            GEMS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// Only exceptional gems
[Category] == "Gem" && [Quality] > "15" # [StashItem] == "true"
[Category] == "Gem" && [GemLevel] >= "20" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            CRAFTING BASES                                        //
/////////////////////////////////////////////////////////////////////////////////////

// High item level bases for crafting
[ItemLevel] >= "86" && [Rarity] == "Normal" # [StashItem] == "true"
[ItemLevel] >= "86" && [Rarity] == "Magic" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            BASIC SALVAGE                                         //
/////////////////////////////////////////////////////////////////////////////////////

[Rarity] == "Normal" && [Sockets] > "0" # [Salvage] == "true"
[Rarity] == "Magic" && [Sockets] > "0" # [Salvage] == "true"`;
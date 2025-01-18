export const beginnerTemplate = `// POE2 Beginner Filter Template
// Focus on essential items and currency

/////////////////////////////////////////////////////////////////////////////////////
//                            CURRENCY                                              //
/////////////////////////////////////////////////////////////////////////////////////

[Type] == "Chaos Orb" # [StashItem] == "true"
[Type] == "Divine Orb" # [StashItem] == "true"
[Type] == "Exalted Orb" # [StashItem] == "true"
[Type] == "Mirror of Kalandra" # [StashItem] == "true"

// Basic currency
[Type] == "Arcanist's Etcher" # [StashItem] == "true"
[Type] == "Orb of Alchemy" # [StashItem] == "true"
[Type] == "Orb of Chance" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            EQUIPMENT                                             //
/////////////////////////////////////////////////////////////////////////////////////

// Rare items with good life and resistances
[Rarity] == "Rare" # [Life] > "50" && [TotalResistances] > "60" && [StashItem] == "true"

// All unique items
[Rarity] == "Unique" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            GEMS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// Quality gems
[Category] == "Gem" && [Quality] > "0" # [StashItem] == "true"

// High level gems
[Category] == "Gem" && [GemLevel] > "18" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            MAPS                                                  //
/////////////////////////////////////////////////////////////////////////////////////

// All maps
[Category] == "Map" # [StashItem] == "true"

/////////////////////////////////////////////////////////////////////////////////////
//                            BASIC SALVAGE                                         //
/////////////////////////////////////////////////////////////////////////////////////

[Rarity] == "Normal" && [Sockets] > "0" # [Salvage] == "true"
[Rarity] == "Magic" && [Sockets] > "0" # [Salvage] == "true"`;
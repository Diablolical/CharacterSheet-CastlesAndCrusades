var rules = {

    attributes: {
        str: "strength",
        dex: "dexterity",
        con: "constitution",
        int: "intelligence",
        wis: "wisdom",
        cha: "charisma"
    },
    modifierLevels: {
        '-4': {min: 1, max: 1},
        '-3': {min: 2, max: 3},
        '-2': {min: 4, max: 5},
        '-1': {min: 6, max: 8},
        '0': {min: 9, max: 12},
        '1': {min: 13, max: 15},
        '2': {min: 16, max: 17},
        '3': {min: 18, max: 20}
    },
    classes: {
        Fighter: {
            primary: "str",
            BtH: {
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
                '10': 10,
                '11': 11,
                '12': 12,
                '13': 13,
                '14': 14,
                '15': 15,
                '16': 16,
                '17': 17,
                '18': 18,
                '19': 19,
                '20': 20
            }
        },
        Ranger: {
            primary: "str",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 9,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        },
        Rogue: {
            primary: "dex",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 1,
                '5': 2,
                '6': 2,
                '7': 2,
                '8': 3,
                '9': 3,
                '10': 3,
                '11': 4,
                '12': 4,
                '13': 4,
                '14': 5,
                '15': 5,
                '16': 5,
                '17': 6,
                '18': 6,
                '19': 6,
                '20': 7
            }
        },
        Assassin: {
            primary: "dex",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 1,
                '5': 2,
                '6': 2,
                '7': 2,
                '8': 3,
                '9': 3,
                '10': 3,
                '11': 4,
                '12': 4,
                '13': 4,
                '14': 5,
                '15': 5,
                '16': 5,
                '17': 6,
                '18': 6,
                '19': 6,
                '20': 7
            }
        },
        Barbarian: {
            primary: "con",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 9,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        },
        Monk: {
            primary: "con",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 9,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        },
        Wizard: {
            primary: "int",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 1,
                '5': 1,
                '6': 2,
                '7': 2,
                '8': 2,
                '9': 2,
                '10': 3,
                '11': 3,
                '12': 3,
                '13': 3,
                '14': 4,
                '15': 4,
                '16': 4,
                '17': 4,
                '18': 5,
                '19': 5,
                '20': 5
            }
        },
        Illusionist: {
            primary: "int",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 1,
                '5': 1,
                '6': 2,
                '7': 2,
                '8': 2,
                '9': 2,
                '10': 3,
                '11': 3,
                '12': 3,
                '13': 3,
                '14': 4,
                '15': 4,
                '16': 4,
                '17': 4,
                '18': 5,
                '19': 5,
                '20': 5
            }
        },
        Cleric: {
            primary: "wis",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 2,
                '5': 2,
                '6': 3,
                '7': 3,
                '8': 4,
                '9': 4,
                '10': 5,
                '11': 5,
                '12': 6,
                '13': 6,
                '14': 7,
                '15': 7,
                '16': 8,
                '17': 8,
                '18': 9,
                '19': 9,
                '20': 10
            }
        },
        Druid: {
            primary: "wis",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 1,
                '4': 2,
                '5': 2,
                '6': 3,
                '7': 3,
                '8': 4,
                '9': 4,
                '10': 5,
                '11': 5,
                '12': 6,
                '13': 6,
                '14': 7,
                '15': 7,
                '16': 8,
                '17': 8,
                '18': 9,
                '19': 9,
                '20': 10
            }
        },
        Knight: {
            primary: "cha",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 8,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        },
        Bard: {
            primary: "cha",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 8,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        },
        Paladin: {
            primary: "cha",
            BtH: {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
                '8': 7,
                '9': 8,
                '10': 8,
                '11': 10,
                '12': 11,
                '13': 12,
                '14': 13,
                '15': 14,
                '16': 15,
                '17': 16,
                '18': 17,
                '19': 18,
                '20': 19
            }
        }
    },
    races: {
        Human: {
            primaryAttributes: 3,
            abilities: {

            }
        },
        Elf: {
            primaryAttributes: 2,
            abilities: {

            }
        },
        'Half-Elf': {
            primaryAttributes: 2,
            abilities: {

            }
        },
        Gnome: {
            primaryAttributes: 2,
            abilities: {

            }
        },
        Halfling: {
            primaryAttributes: 2,
            abilities: {

            }
        },
        Dwarf: {
            primaryAttributes: 2,
            abilities: {

            }
        },
        'Half-Orc': {
              primaryAttributes: 2,
            abilities: {

            }
        }
    },
    itemTypes: {
        Weapons: { itemType: "weapon", type: "", weight: 0, bonusToHit: 0, bonusDamage: 0, damage: 0, special: "", twoHanded: false},
        Shields: { itemType: "shield", type: "", weight: 0, acBonus: 0},
        Armor: { itemType: "armor", type: "", weight: 0, acBonus: 0},
        Cloaks: { itemType: "cloak", type: "", weight: 0, acBonus: 0, saveBonus: 0, other: "" },
        Amulets: { itemType: "amulet", type: "", weight: 0, acBonus: 0, saveBonus: 0, other: "" },
        Rings: { itemType: "ring", type: "", weight: 0, acBonus: 0, saveBonus: 0, other: ""},
        Boots: { itemType: "boots", type: "", weight: 0, other: ""}
    }
};
"use strict";

/*var character =  {
    general: {
        name: "",
        title: "",
        race: "",
        class: "",
        alignment: "",
        deity: "",
        level: 0
    },
    physical: {
        age: "",
        gender: "",
        hair: "",
        eyes: "",
        height: "",
        weight: "",
        clothing: "",
        other: ""
    },
    characterization: {
        languages: "",
        description: "",
        personality: "",
        background: ""
    },
    attributes: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
    },
    modifiers: {
        strMod: "",
        dexMod: "",
        conMod: "",
        intMod: "",
        wisMod: "",
        chaMod: ""
    },
    level: {
        level: 0,
        experience: 0
    },
    defense: {
        armorAC: "",
        shieldAC: "",
        miscAC: "",
        HP: ""
    },
    offense: {
        miscToHit: ""
    },
    abilities: [],
    weapons: [
        {type: "", bonusToHit: 0, bonusDamage: 0, damage: 0, special: ""}
    ],
    armor: [
        {type: "", ac: 0}
    ]
};*/
/*Vue.component('ability-modifier', {
    template : '<span><input type="text" name="con-modifier" v-bind:value="conMod" readonly="readonly"><label>Ability Modifier</label></span>',
}); */
if (typeof character !== "object") {
    var character = {
        general: {
            name: "",
            title: "",
            race: "",
            class: "",
            alignment: "",
            deity: ""
        },
        physical: {
            age: "",
            gender: "",
            hair: "",
            eyes: "",
            height: "",
            weight: "",
            clothing: "",
            other: ""
        },
        characterization: {
            languages: "",
            description: "",
            personality: "",
            background: ""
        },
        attributes: {
            str: {
                val: 0,
                primary: false,
                disabled: false
            },
            dex: {
                val: 0,
                primary: false,
                disabled: false
            },
            con: {
                val: 0,
                primary: false,
                disabled: false
            },
            int: {
                val: 0,
                primary: false,
                disabled: false
            },
            wis: {
                val: 0,
                primary: false,
                disabled: false
            },
            cha: {
                val: 0,
                primary: false,
                disabled: false
            }
        },
        primaryAttributes: [],
        level: {
            level: 1,
            experience: 0
        },
        defense: {
            armorAC: "",
            shieldAC: "",
            miscAC: "",
            HP: ""
        },
        offense: {
            miscToHit: ""
        },
        abilities: [],
        equipment: {
            weapon: [{type: "", weight: 0, bonusToHit: 0, bonusDamage: 0, damage: 0, special: "", twoHanded: false}],
            shield: [{type: "", weight: 0, acBonus: 0}],
            armor: [{type: "", weight: 0, acBonus: 0}],
            cloak: [{type: "", weight: 0, acBonus: 0, saveBonus: 0, other: ""}],
            amulet: [{type: "", weight: 0, acBonus: 0, saveBonus: 0, other: ""}],
            rings: [{type: "", weight: 0, acBonus: 0, saveBonus: 0, other: ""}],
            boots: [{type: "", weight: 0, other: ""}]
        },
        packItems: {
            weapons: [],
            armor: [],
            magicalItems: [],
            other: []
        }
    };
}

var app = new Vue({
    el: '#sheet',
    data: {
        character: character,
        rules: rules,
        classSelected: ""
    },
    computed: {
        strMod: function () {
            var val = parseInt(this.character.attributes.str.val);
            return this.updateModifier(val);
        },
        dexMod: function () {
            var val = parseInt(this.character.attributes.dex.val);
            return this.updateModifier(val);
        },
        conMod: function () {
            var val = parseInt(this.character.attributes.con.val);
            return this.updateModifier(val);
        },
        intMod: function() {
            var val = parseInt(this.character.attributes.int.val);
            return this.updateModifier(val);
        },
        wisMod: function () {
            var val = parseInt(this.character.attributes.wis.val);
            return this.updateModifier(val);
        },
        chaMod: function () {
            var val = parseInt(this.character.attributes.cha.val);
            return this.updateModifier(val);
        },
        armorClass: function() {
            var ac = 10 + parseInt(this.dexMod);
            if (this.character.defense.armorAC !== "") {
                ac += parseInt(this.character.defense.armorAC);
            }
            if (this.character.defense.shieldAC !== "") {
                ac += parseInt(this.character.defense.shieldAC);
            }
            if (this.character.defense.miscAC !== "") {
                ac += parseInt(this.character.defense.miscAC);
            }
            if (this.character.equipment.armor.acBonus !== 0) {
                ac += parseInt(this.character.equipment.armor[0].acBonus);
            }
            console.log(ac);
            return ac;
        },
        levelToHitMod: function() {
            if (this.character.general.class !== "") {
                var className = this.character.general.class;
                var classToHit = this.rules.classes[className].BtH[this.character.level.level];
                console.log(classToHit);
                return classToHit;
            }
        },
        toHit: function() {
            var toHit =  20 + parseInt(this.dexMod);
            console.log(toHit);
            if (this.character.offense.miscToHit !== "") {
                toHit += parseInt(this.character.offense.miscToHit);
            }
            return toHit;
        },
        classNames: function() {
            return Object.keys(this.rules.classes);
        },
        races: function() {
            return Object.keys(this.rules.races);
        },
        maxPrimary: function() {
            if (this.general.race !== "") {
                return this.rules.races[this.general.race].primaryAttributes;
            }
        },
        primariesSelectable: function() {
            if (this.character.primaryAttributes.length === this.maxPrimary) {
                for(attr in this.character.attributes) {
                    attr.disabled = true;
                }
                return;
            }
            for(attr in this.character.attributes) {
                if (!attr.primary) {
                    attr.disabled = false;
                }
            }
        }
    },
    methods: {
        updateModifier: function (val) {
            if (typeof this.rules === "undefined" || !this.rules.hasOwnProperty('modifierLevels')) {
                alert("Unable to load rules!");
                return;
            }
            if (val <= 0) {
                return 0;
            }
            if (val >= 20) {
                return 3;
            }
            var levels = this.rules.modifierLevels;
            var modifier = 0;
            Object.keys(levels).some(function (score){
                if (val >= levels[score].min && val <= levels[score].max){
                    modifier = score;
                }
            });
            console.log(modifier);
            return modifier;
        },
        save: function() {
            var data = JSON.stringify(character);
            console.log(data);
            $.when($.ajax({
                    method: 'POST',
                    url: '/',
                    data: data,
                    contentType: "application/json"
            }))
            .done(function (data) {
                console.log("Post success with data:", data);
            })
            .fail(function (data) {
                console.log("Post failed with data: ", data);
            });
        },
        addItem: function (location, itemType) {
            var newItem = {};
            switch (itemType) {
                case "weapon":
                    newItem = {type: "", weight: 0, bonusToHit: 0, bonusDamage: 0, damage: 0, special: "", twoHanded: false };
                break;
                case "shield":
                    newItem = {type: "", weight: 0, acBonus: 0};
                break;
                case "armor":
                    newItem = {type: "", weight: 0, acBonus: 0};
                break;
                case "magicalItem":
                    newItem = {};
                break;
                default:
                    newItem = {};
            }
            this[location][itemType].push(newItem);
        },
        updatePrimary: function() { 
            var className = this.character.general.class;
            var classPrimary = this.rules.classes[className].primary;
            var oldClass = this.classSelected;
            if( oldClass !== "") {
                var oldPrimary = this.rules.classes[oldClass].primary;
                if (oldPrimary !== classPrimary) {
                    this.character.attributes[oldPrimary].primary = false;
                    this.character.attributes[oldPrimary].disabled = false
                    this.character.attributes[classPrimary].primary = true;
                    this.character.attributes[classPrimary].disabled = true;
                    this.classSelected = className;
                }
                return;
            }
            this.character.attributes[classPrimary].primary = true;
            this.character.attributes[classPrimary].disabled = true;
            this.classSelected = className;
        }
    }
});
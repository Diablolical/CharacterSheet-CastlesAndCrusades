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
                disabled: true
            },
            dex: {
                val: 0,
                primary: false,
                disabled: true
            },
            con: {
                val: 0,
                primary: false,
                disabled: true
            },
            int: {
                val: 0,
                primary: false,
                disabled: true
            },
            wis: {
                val: 0,
                primary: false,
                disabled: true
            },
            cha: {
                val: 0,
                primary: false,
                disabled: true
            }
        },
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
            ring: [{type: "", weight: 0, acBonus: 0, saveBonus: 0, other: ""}],
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
        classPrimary: "",
        primaryAttributes: []
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
        maxPrimaries: function() {
            console.log("Updating Max");
            if (this.character.general.race !== "") {
                var maxPrimaries = this.rules.races[this.character.general.race].primaryAttributes;
                return maxPrimaries;
            }
            return 1;
        },
        itemTypes: function() {
            return Object.keys(this.rules.itemTypes);
        }
    },
    watch: {
        primaryAttributes: function() {
            this.updatePrimaries();
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
            "use strict";
            var data = JSON.stringify(character);
            console.log(data);
            $.when(
                $.ajax({
                    method: 'POST',
                    url: '/',
                    data: data,
                    contentType: "application/json"
                })
            ).done(function (data) {
                console.log("Post success with data:", data);
                return true;
            }).fail(function (data) {
                console.log("Post failed with data: ", data);
                return false;
            });
        },
        addItem: function (location, itemType) {
            "use strict";
            var newItem = {};
            switch (itemType) {
            case "weapon":
                newItem = {type: "", weight: 0, bonusToHit: 0, bonusDamage: 0, damage: 0, special: "", twoHanded: false};
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
        addAbility: function () {
            "use strict";
            var ability = {name: "", description: ""};
            this.character.abilities.push(ability);
        },
        updateClassPrimary: function () {
            "use strict";
            var className = this.character.general.class;
            var oldPrimary = this.classPrimary;
            if (!className) {
                var n = this.primaryAttributes.indexOf(oldPrimary);
                this.primaryAttributes.splice(n, 1);
                this.classPrimary = "";
                return;
            }
            var classPrimary = this.rules.classes[className].primary;
            if (oldPrimary !== "") {
                if (oldPrimary !== classPrimary) {
                    var i = this.primaryAttributes.indexOf(oldPrimary);
                    this.primaryAttributes.splice(i, 1);
                    if (this.primaryAttributes.indexOf(classPrimary) === -1) {
                        this.primaryAttributes.push(classPrimary);
                    }
                }
            } else if (this.primaryAttributes.indexOf(classPrimary) === -1) {
                this.primaryAttributes.push(classPrimary);
            }
            this.classPrimary = classPrimary;
        },
        updateRacePrimaries: function() {
            if (this.character.general.race !== "") {
                if (this.primaryAttributes.length > this.maxPrimaries) {
                    this.primaryAttributes = [];
                    if (this.classPrimary !== "") {
                        this.primaryAttributes.push(this.classPrimary);
                    }
                }
            }
            this.updatePrimaries();
        },
        updatePrimaries: function() {
            var maxed = this.primaryAttributes.length < this.maxPrimaries ? false : true;
            for (var attr in this.character.attributes) {
                if (this.primaryAttributes.indexOf(attr) !== -1) {
                    this.character.attributes[attr].primary = true;
                    if (this.classPrimary === attr) {
                        this.character.attributes[attr].disabled = true;
                    }
                    continue;
                }
                if (maxed) {
                    this.character.attributes[attr].disabled = true;
                    continue;
                }
                this.character.attributes[attr].disabled = false;
            }
            return;
        }
    }
});

Vue.component('item', {
  template: '#item-template'
})
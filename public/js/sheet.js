"use strict";

var Item = {
    template: '#add-item',
    props: {
        item: {
            type: Object,
            default: function () {
                return rules.itemTypes.weapon;
            }
        }
    },
    methods: {
        save: function () {
            console.log("Saving Item", this.item);
            this.$emit('save', this.item);
        },
        update: function (value) {
            this.$emit('input', value)
        }
    }
};

var Ability = {
    template: '#add-ability',
    props: {
        ability: {
            type: Object,
            default: function () {
                return { name: "", description: ""}
            }
        }
    },
    methods: {
        save: function (ability) {
            console.log("Saving Ability", this.ability);
            this.$emit('save', this.ability);
        },
        update: function (value) {
            this.$emit('input', value)
        }
    }
}

var app = new Vue({
    el: '#sheet',
    data: {
        character: character,
        rules: rules,
        classPrimary: "",
        primaryAttributes: [],
        addingAbility: false,
        addingItem: false,
        newItem: {},
        newAbility: {}
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
            if (this.character.equipment.Armor.acBonus !== 0) {
                ac += parseInt(this.character.equipment.Armor[0].acBonus);
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
        },
        newItem: function () {
            console.log("Item updated: ", this.newItem);
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
        addAbility: function () {
            this.addingAbility = true;
        },
        saveAbility: function(newAbility) {
            "use strict";
            //placeholder
            //var ability = {name: "", description: ""};
            console.log(newAbility);
            this.character.abilities.push(newAbility);
            this.newAbility = {};
            this.addingAbility = false;
        },
        addItem: function (type) {
            this.addingItem = true;
            this.newItem = this.rules.itemTypes[type];
        },
        saveItem: function(newItem) {
            "use strict";
            console.log(newItem);
            var type = newItem.itemType;
            this.character.equipment[type].push(newItem);
            this.newItem = {};
            this.addingItem = false;
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
    },
    components: {
        'edit-item': Item,
        'edit-ability': Ability
    }
});

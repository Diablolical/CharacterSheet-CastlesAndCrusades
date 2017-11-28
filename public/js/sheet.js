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
if(typeof character !== "object")
{
    alert("Unable to load character data from server");
    var character =  {
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
    };
}

var app = new Vue({
    el: '#sheet',
    data: character,
    computed: {
        strMod: function  () {
            var val = parseInt(this.attributes.str);
            return this.updateModifier(val);
        },
        dexMod: function () {
            var val = parseInt(this.attributes.dex);
            return this.updateModifier(val);
        },
        conMod: function () {
            var val = parseInt(this.attributes.con);
            return this.updateModifier(val);
        },
        intMod: function() {
            var val = parseInt(this.attributes.int);
            return this.updateModifier(val);
        },
        wisMod: function () {
            var val = parseInt(this.attributes.wis);
            return this.updateModifier(val);
        },
        chaMod: function () {
            var val = parseInt(this.attributes.cha);
            return this.updateModifier(val);
        },
        armorClass: function() {
            var ac = 10 + parseInt(this.dexMod);
            if (this.defense.armorAC !== "") {
                ac += parseInt(this.defense.armorAC);
            }
            if (this.defense.shieldAC !== "") {
                ac += parseInt(this.defense.shieldAC);
            }
            if (this.defense.miscAC !== "") {
                ac += parseInt(this.defense.miscAC);
            }
            return ac;
        },
        toHit: function() {
            var toHit =  20 + parseInt(this.dexMod) + parseInt(this.general.level);
            if (this.offense.miscToHit !== "") {
                toHit += parseInt(this.offense.miscToHit);
            }
            return toHit;
        }
    },
    methods: {
        updateModifier: function (val) {
            if (typeof rules === "undefined" || !rules.hasOwnProperty('modifierLevels')) {
                alert("Unable to load rules!");
                return;
            }
            if (val <= 0) {
                return 0;
            }
            if (val >= 20) {
                return 3;
            }
            var levels = rules.modifierLevels;
            var modifier = 0;
            Object.keys(levels).some(function (score){
                if (val >= levels[score].min && val <= levels[score].max){
                    modifier = score;
                    return;
                }
            });
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
            .done(function(data){
                console.log("Post success with data:",data);
            })
            .fail(function(data){
                console.log("Post failed with data: ",data);
            });
        }
    }
});


/*
Vue.component('weapon', {
  template: '<li>This is a weapon</li>'
});

Vue.component('armor', {
  template: '<li>This is armor</li>'
});

Vue.component('item', {
    template: '<li>THis is an item</li>'
});
 */

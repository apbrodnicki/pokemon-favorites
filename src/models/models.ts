export interface Pokemon extends Stats {
	name: string,
	sprite: string,
	types: string[],
	abilities: string[],
}

export interface Stats {
	hp: number,
	attack: number,
	defense: number,
	specialAttack: number,
	specialDefense: number,
	speed: number,
}

export interface Type extends DamageRelation {
	name: string,
}

export interface DamageRelation {
	doubleDamageFrom: string[],
	doubleDamageTo: string[],
	halfDamageFrom: string[],
	halfDamageTo: string[],
	noDamageFrom: string[],
	noDamageTo: string[],
}

export interface Types {
	normal: string,
	fire: string,
	fighting: string,
	water: string,
	flying: string,
	grass: string,
	poison: string,
	electric: string,
	ground: string,
	psychic: string,
	rock: string,
	ice: string,
	bug: string,
	dragon: string,
	ghost: string,
	dark: string,
	steel: string,
	fairy: string,
}

export interface PokemonListsTemplate {
	gen1List: string[],
	gen2List: string[],
	gen3List: string[],
	gen4List: string[],
	gen5List: string[],
	gen6List: string[],
	gen7List: string[],
	gen8List: string[],
	gen9List: string[],
	megasList: string[],
	fossilsList: string[],
	legendariesList: string[],
	regionalsList: string[],
}

export type Ability = Record<string, string>;

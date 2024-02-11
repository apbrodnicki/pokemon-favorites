export interface GenericPokemon {
	name: string,
	types: Array<{
		slot: number,
		type: {
			name: string,
			url: string,
		},
	}>,
	abilities: Array<{
		slot: number,
		is_hidden: boolean,
		ability: {
			name: string,
			url: string,
		},
	}>,
	stats: Array<{
		base_stat: number,
		effort: number,
		stat: {
			name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed',
			url: string,
		},
	}>,
	sprites: {
		front_default: string,
		versions: {
			'generation-v' : {
				'black-white': {
					animated: {
						front_default: string,
					}
				}
			}
		},
	},
	[key: string]: any,
}

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
	'special-attack': number,
	'special-defense': number,
	speed: number,
}

export interface Types {
	Normal: string,
	Fire: string,
	Fighting: string,
	Water: string,
	Flying: string,
	Grass: string,
	Poison: string,
	Electric: string,
	Ground: string,
	Psychic: string,
	Rock: string,
	Ice: string,
	Bug: string,
	Dragon: string,
	Ghost: string,
	Dark: string,
	Steel: string,
	Fairy: string,
}

export interface Ability {
	name: string,
	description: string,
}

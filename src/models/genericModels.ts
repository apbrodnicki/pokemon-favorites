export interface GenericPokemon {
	name: string,
	types: Array<{
		type: {
			name: string,
		},
	}>,
	abilities: Array<{
		ability: {
			name: string,
		},
	}>,
	stats: Array<{
		base_stat: number,
		stat: {
			name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed',
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

export interface GenericAbility {
	name: string,
	effect_entries: Array<{
		short_effect: string,
		language: {
			name: string,
		}
	}>,
	[key: string]: any,
}

export interface GenericAbilities {
	results: Array<{
		name: string,
	}>,
	[key: string]: any,
}

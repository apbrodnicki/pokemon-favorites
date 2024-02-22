export interface GenericPokemon {
	name: string,
	types: [{
		type: {
			name: string,
		},
	}],
	abilities: [{
		ability: {
			name: string,
		},
	}],
	stats: [{
		base_stat: number,
		stat: {
			name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed',
		},
	}],
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
	effect_entries: [{
		short_effect: string,
		language: {
			name: string,
		}
	}],
	flavor_text_entries: [{
		flavor_text: string,
		language: {
			name: string,
		}
	}]
	[key: string]: any,
}

export interface GenericAbilities {
	results: [{
		name: string,
	}],
	[key: string]: any,
}

export interface GenericType {
	name: string,
	damage_relations: {
		double_damage_from: [{
			name: string
		}],
		double_damage_to: [{
			name: string
		}],
		half_damage_from: [{
			name: string
		}],
		half_damage_to: [{
			name: string
		}],
		no_damage_from: [{
			name: string
		}],
		no_damage_to: [{
			name: string
		}],
	},
	[key: string]: any,
}

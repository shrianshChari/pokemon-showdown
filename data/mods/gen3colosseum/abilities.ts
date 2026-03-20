const MULTIHIT_STATUS_CONTACT_GLITCH_TEXT = "In Gen 3 games besides Pokemon Emerald, if the final hit of a multihit move (except for Triple Kick) that makes contact triggers an ability that inflicts status, then there is a 1% chance that the defender is afflicted by the same status."

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	effectspore: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact'] && !source.status) {
				const r = this.random(100);
				let status = '';
				if (r < 10) {
					status = 'slp';
				} else if (r < 20) {
					status = 'par';
				} else if (r < 30) {
					status = 'psn';
				}
				if (status) {
					const statusesAttacker = source.setStatus(status, target);
					if (statusesAttacker && move.multihit && move.id !== 'triplekick' &&
						this.randomChance(1, 100)) {
						if (status === 'slp' || move.lastHit) {
							target.trySetStatus(status);
							this.hint(MULTIHIT_STATUS_CONTACT_GLITCH_TEXT);
						}
					}
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					const statusesAttacker = source.trySetStatus('brn', target);
					if (move.multihit && move.lastHit && statusesAttacker &&
						move.id !== 'triplekick' && this.randomChance(1, 100)) {
						target.trySetStatus('brn');
						this.hint(MULTIHIT_STATUS_CONTACT_GLITCH_TEXT);
					}
				}
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					const statusesAttacker = source.trySetStatus('psn', target);
					if (move.multihit && move.lastHit && statusesAttacker &&
						move.id !== 'triplekick' && this.randomChance(1, 100)) {
						target.trySetStatus('psn');
						this.hint(MULTIHIT_STATUS_CONTACT_GLITCH_TEXT);
					}
				}
			}
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					const statusesAttacker = source.trySetStatus('par', target);
					if (move.multihit && move.lastHit && statusesAttacker &&
						move.id !== 'triplekick' && this.randomChance(1, 100)) {
						target.trySetStatus('par');
						this.hint(MULTIHIT_STATUS_CONTACT_GLITCH_TEXT);
					}
				}
			}
		},
	},
};

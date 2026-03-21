function attemptStatuses(battle: Battle, target: Pokemon, source: Pokemon, move: ActiveMove, status: string) {
	const attackerStatused = source.trySetStatus(status, target);
	if (move.multihit && attackerStatused && move.id !== 'triplekick' &&
		(move.lastHit || status === 'slp') && battle.randomChance(1, 100)) {
		const defenderStatused = target.trySetStatus(status, target, move);
		if (defenderStatused) {
			battle.hint("In Pokemon Colosseum and XD: Gale of Darkness, if the final hit of a multihit move (except for Triple Kick) that makes contact triggers an ability that inflicts status, then there is a 1% chance that the defender is afflicted by the same status.");
		}
	}
}

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	effectspore: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact'] && !source.status) {
				const r = this.random(300);
				let status = null;
				if (r < 10) {
					status = 'slp';
				} else if (r < 20) {
					status = 'par';
				} else if (r < 30) {
					status = 'psn';
				}
				if (status) {
					attemptStatuses(this, target, source, move, status);
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					attemptStatuses(this, target, source, move, 'brn');
				}
			}
		},
	},
	poisonpoint: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					attemptStatuses(this, target, source, move, 'psn');
				}
			}
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				if (this.randomChance(1, 3)) {
					attemptStatuses(this, target, source, move, 'par');
				}
			}
		},
	},
};

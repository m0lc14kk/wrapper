import { Entity, Player, ScoreboardIdentity, world } from "@minecraft/server";

export class ScoreboardObjectiveWrapper {
    constructor(name) {
        this.objectiveName = name;
        this.objective = world.scoreboard.getObjective(name);

        if (!this.objective) throw new Error("This objective doesn't exist!");
    };
    
    /**
     * @param {ScoreboardIdentity | Entity | Player | string} participant Target.
     * @returns {number} Returns a score of target. If it's 0, it may not be defined.
     */
    getParticipantValue(participant) {
        try {
            return this.objective.getScore(participant) ?? 0;
        } catch {
            return 0;
        };
    };

    /**
     * @param {ScoreboardIdentity | Entity | Player | string} participant Target to set value.
     * @param {number | undefined} number Value to set.
     * @returns {void} This function doesn't return anything.
     */
    setParticipantsValue(participant, number) {
        return this.objective.setScore(participant, number);
    };

    /**
     * @param {ScoreboardIdentity | Entity | Player | string} participant Target to add value.
     * @param {number | undefined} number Value to add.
     * @returns {void} This function doesn't return anything.
     */
    addParticipantsValue(participant, number) {
        this.setParticipantsValue(participant, number + this.getParticipantValue(participant));
    };

    /**
     * @param {ScoreboardIdentity | Entity | Player | string} participant Target to remove from objective.
     * @returns {boolean} Return true if participant was removed. Function returns false if participant from param didn't exist.
     */
    removeParticipant(participant) {
        return this.objective.removeParticipant(participant);
    };

    /**
     * @returns {ScoreboardIdentity[]} An array of participants.
     */
    getParticipants() {
        return this.objective.getParticipants();
    };

    /**
     * @returns {void} 
     */
    removeAllParticipants() {
        for (const participant of this.getParticipants()) {
            this.objective.removeParticipant(participant);
        };
    };
};
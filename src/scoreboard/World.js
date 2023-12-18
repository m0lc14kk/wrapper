import { ScoreboardObjective, world } from "@minecraft/server";

export class DisplaySettings {
    /**
     * @param {"sidebar" | "list" | "belowname"} displaySlot Slot, where objective gonna be showed.
     * @param {"ascending" | "descending"} sortOrder Sort order also accepts 0 (ascending) and 1 (descending).
     * @throws Constructor throws an error, if one of params doesn't match the built ones.
     */
    constructor(displaySlot, sortOrder) {
        if (displaySlot != "sidebar" && displaySlot != "list" && displaySlot != "belowname") throw new Error("This display slot doesn't exist!");
        this.displaySlot = displaySlot;

        if (sortOrder != 0 && sortOrder != 1 && sortOrder != "ascending" && sortOrder != "descending") throw new Error("This type of sort order doesn't exist!");
        this.sortOrder = typeof sortOrder == 'number' && (sortOrder == 0 || sortOrder == 1) ? sortOrder : (sortOrder == "ascending" ? 0 : 1); 
    };
};

export const worldScoreboard = {
    /**
     * @param {string} name 
     * @param {string} displayName 
     * @returns {boolean} Returns true if scoreboard was succesfully added.
     * @throws If there's no name param, function throws an error.
     */
    addObjective: function(name, displayName) {
        if (!name) throw new Error("Name of objective is required!");
        if (world.scoreboard.getObjective(name)) return false;
        world.scoreboard.addObjective(name, displayName ?? name);
        return true;
    },

    /**
     * @param {ScoreboardObjective | string} objective Objective to remove. 
     * @returns {boolean} Returns true if scoreboard was succesfully removed. 
     * @throws If there's no name param, function throws an error.
     */
    removeObjective: function(objective) {
        if (!objective) throw new Error("Objective is required!");
        if (!(objective instanceof ScoreboardObjective) || !world.scoreboard.getObjective(objective)) return false;
        world.scoreboard.removeObjective(objective);
        return true;
    },

    /**
     * @param {ScoreboardObjective | string} objective 
     * @param {DisplaySettings} displaySettings 
     */
    displayObjective: function(objective, displaySettings) {
        if (!objective) throw new Error("You must add objective to display it.");
        if (!displaySettings) throw new Error("You must add display settings to display objective.");
        if (objective instanceof String && !world.scoreboard.getObjective(objective)) throw new Error("This objective doesn't exist.");
        world.scoreboard.setObjectiveAtDisplaySlot(displaySettings.displaySlot, {
            objective: objective instanceof String ? world.scoreboard.getObjective(objective) : objective,
            sortOrder: displaySettings.sortOrder
        });
    },

    /**
     * @param {"sidebar" | "list" | "belowname"} displaySlot 
     * @returns {ScoreboardObjective | false} Returns ScoreboardObjective if there was an objective display on this slot.
     * @throws If display slot doesn't exist, function throws an error.
     */
    removeDisplayObjective(displaySlot) {
        if (displaySlot != "sidebar" && displaySlot != "list" && displaySlot != "belowname") throw new Error("This display slot doesn't exist!");
        return world.scoreboard.clearObjectiveAtDisplaySlot(displaySlot) ?? false;
    }
};
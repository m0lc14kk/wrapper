import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

export class PlayerForm {
    /**
     * @param {Player} player 
     * @throws Constructor throws an error, if player param isn't a player.
     */
    constructor(player) {   
        if (!player instanceof Player) throw new Error("Entity must be a player!");
        this.formTarget = player;
    };

    /**
     * Function to show form, in most cases used to add GUI to chat commands.
     * @param {ActionFormData | ModalFormData | MessageFormData} form Form to show player.
     * @returns {void} Function doesn't return anything.
     */
    async forceShow(form) {
        while (true) {
            const action = form.show(player);
            if (action?.cancelationReason !== 'UserBusy') return action;
        };
    };
};
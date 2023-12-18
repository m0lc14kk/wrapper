import { Container, ItemStack } from "@minecraft/server";

export class ContainerWrapper {
    /**
     * @param {Container} container Container. (Inventory)
     * @throws Constructor throws an error, if param isn't an container. 
     */
    constructor(container) {
        if (!container instanceof Container) throw new Error("Param must be a container!");
        this.container = container;
    };

    /**
     * @param {string} typeId ID of a item to count.
     * @returns {number} Number of found items in container.
     */
    getItemAmount(typeId) {
        let amount = 0;

        for (let i = 0; i < this.container.size; i++) {
            if (this.container.getItem(i)?.typeId == typeId) amount += this.container.getItem(i).amount;
        };

        return amount;
    };

    /**
     * @param {ItemStack} itemStack Item, which is going to be added to a container.
     * @returns {ItemStack | true} Returns true if entire item was added to an inventory. ItemStack is the rest of not added items.
     */
    addItem(itemStack) {
        return this.container.addItem(itemStack) ?? true;
    };
};
import { Entity } from "@minecraft/server";

export class EntityWrapper {
    /**
     * @param {Entity} entity 
     */
    constructor(entity) {
        if (!entity instanceof Entity) throw new Error("This is not an entity!");
        this.entity = entity;
        this.nameTag = this.entity.nameTag;
        this.typeId = this.entity.typeId;
        this.currentHealth = this.entity.getComponent("health").currentValue;
    };

    /**
     * 
     * @param {"default" | "min" | "max" | number} health 
     */
    setHealth(health) {
        const healthComponent = this.entity.getComponent("health");
        switch (health) {
            case "default":
                return healthComponent.resetToDefaultValue();
            case "min":
                return healthComponent.resetToMinValue();
            case "max":
                return healthComponent.resetToMaxValue();
            default:
                if (typeof health != 'number') throw new Error("Health must be a number or one of custom values.");
                return healthComponent.setCurrentValue(health);
        };
    };
};
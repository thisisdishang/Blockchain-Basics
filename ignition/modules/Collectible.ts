import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("CollectibleModule", (m) => {

    const collectible = m.contract("Collectible",);
    console.log("collectible", collectible)
    return { collectible };
});

export default LockModule;

import { applySnapshot, getSnapshot, onSnapshot } from "mobx-state-tree";
import { RootModel } from ".";

export const setupRootStore = () => {
    const rootTree = RootModel.create({
        employer: {
            id: "1",
            name: "Jonh",
            location: "Phnom Penh, PP",
            employees: [],
        },
    });
    onSnapshot(rootTree, (snapshot) => console.log("snapshot: ", snapshot));
    
    // const currentRootTree = getSnapshot(rootTree);
    // applySnapshot(rootTree, {
    //     ...currentRootTree,
    //     employer: { ...currentRootTree.employer, location: "Beong Trbek, PP" },
    // });

    return { rootTree };
};

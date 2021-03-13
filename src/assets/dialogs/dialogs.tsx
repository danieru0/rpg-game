interface IDialogs {
    [key: number]: {
        title: string;
        texts: string[];
    }
};

const dialogs: IDialogs = {
    0: {
        title: "Survivor",
        texts: ["Hey you!", "Our village has been attacked, you shouldn't go there!", "Ohh, you think you're strong enough? Then please help us!"]
    },
    1: {
        title: "Villager",
        texts: ["Oh, you finally woke up", "I've found you lying under a tree while escaping the monsters", "You were fighting with the guy who attacked the village?", "Hmm, i don't know what could have happend to your gear", "But i think you should be able to reach a nearby village", "Just follow this road, but be careful, there is alot of monsters out there"]
    }
}

export default dialogs;
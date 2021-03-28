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
        title: "Stranger",
        texts: ["Oh, you've finally woke up", "I've found you lying under a tree while escaping the monsters.", "You were fighting with the guy who attacked the village?", "Hmm, i don't know what could have happend to your equipment.", "But i think you should be able to reach a nearby village.", "Just follow this road, but be careful, there is alot of monsters out there."]
    },
    2: {
        title: "Villager",
        texts: ["Who are you?", "Well, if you need the equipment, turn right, there is a guy who can sell you some stuff.", "If you need some healing, next to the red small house you will find a healer.", "Now, if you want go further, there is no other option than going through a dungeon.", "You should be able to find it on your own."]
    }
}

export default dialogs;
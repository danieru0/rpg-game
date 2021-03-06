interface IDialogs {
    [key: number]: {
        title: string;
        texts: string[];
    }
};

const dialogs: IDialogs = {
    0: {
        title: "Random NPC #1",
        texts: ["Hey you!", "Our village has been attacked, you shouldn't go there!", "Ohh, you think you're strong enough? Then please help us!"]
    }
}

export default dialogs;
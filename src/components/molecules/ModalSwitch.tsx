import React from 'react';

import ModalExit from './ModalExit';
import ModalShop from './ModalShop';
import ModalHeal from './ModalHeal';

interface IModalSwitchProps {
    type: string | null;
    value: string[];
}

const ModalSwitch = ({type, value}: IModalSwitchProps) => {
    switch(type) {
        case "modal-exit":
            return <ModalExit map={value[0]} />;
        case 'modal-shop':
            return <ModalShop npc={value[0] as unknown as number} />
        case 'modal-heal':
            return <ModalHeal />
        default: return null;
    }
};

export default ModalSwitch;
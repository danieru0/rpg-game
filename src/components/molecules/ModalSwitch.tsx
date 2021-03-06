import React from 'react';

import ModalExit from './ModalExit';
import ModalShop from './ModalShop';
import ModalHeal from './ModalHeal';
import ModalDeath from './ModalDeath';
import ModalDialog from './ModalDialog';

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
        case 'modal-death':
            return <ModalDeath />
        case 'modal-dialog':
            return <ModalDialog triggerId={value[1] as unknown as number} dialogId={value[0] as unknown as number} />
        default: return null;
    }
};

export default ModalSwitch;
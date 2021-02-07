import React from 'react';

import ModalExit from './ModalExit';

interface IModalSwitchProps {
    type: string | null;
    value: string[];
}

const ModalSwitch = ({type, value}: IModalSwitchProps) => {
    switch(type) {
        case "modal-exit":
            return <ModalExit map={value[0]} />;
        default: return null;
    }
};

export default ModalSwitch;
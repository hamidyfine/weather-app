import { forwardRef } from 'react';
import * as Icons from '@tabler/icons-react';

type TIcon = keyof typeof Icons;

interface IProps extends Icons.TablerIconsProps {
    className?: string;
    color?: string;
    icon: keyof typeof Icons;
}

const Icon = forwardRef(({className, color, icon, size, stroke}: IProps, ref) => {
    // TODO: check this any type
    const IconComponent: any = Icons[icon];

    if (!IconComponent) return null;

    return (
        <IconComponent
            ref={ref}
            className={className}
            color={color}
            size={size}
            stroke={stroke}
        />
    );
});

export type {
    TIcon,
};

export default Icon;

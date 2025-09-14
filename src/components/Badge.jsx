import { Badge as Bd } from '@chakra-ui/react';

const Badge = (props) => {
    return <Bd w={"14px"}
        right={0}
        bottom={props.bottom}
        h={"14px"}
        rounded={"50%"}
        pos={"absolute"}
        border={"1px solid #fff"}
        outline={"2px solid var(--primary)"}
        bgColor={props.status === 1 ? "#0f0" : props.status === 0 ? "#ff0" : "#555"}
    />
}

export default Badge
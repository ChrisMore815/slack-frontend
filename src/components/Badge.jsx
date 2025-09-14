import { Badge as Bd } from '@chakra-ui/react';

const Badge = (props) => {
    return <Bd
        right={0}
        w={"12px"}
        h={"12px"}
        rounded={"50%"}
        pos={"absolute"}
        bottom={props.bottom}
        border={"1px solid #fff"}
        outline={"2px solid var(--primary)"}
        bgColor={props.status === 1 ? "#0f0" : props.status === 0 ? "#ff0" : "#555"}
    />
}

export default Badge
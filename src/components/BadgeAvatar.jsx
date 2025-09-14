import { Box, Image } from "@chakra-ui/react";
import { serverUrl } from "../constants/serverUrl";
import Badge from './Badge';

const BadgeAvatar = (props) => {
    return <Box pos={"relative"} w={"40px"} h={"40px"} onClick={props.onChange}>
        <Image rounded={8} src={`${serverUrl}/avatar/${props.src}`} />
        <Badge status={props.status} bottom={0} />
    </Box>
}

export default BadgeAvatar;